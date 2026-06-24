-- Aqobah ERP — Phase 2.3: CRM customers & partners
-- Shared customer/partner directory: individuals (NIK) and corporations (NPWP).
-- Partners are customers flagged is_partner with a commission_rate; they also refer
-- deals (deals.partner_id, 2.4). Records are shared — every staffer reads them;
-- sales/management/admin write. Per-record activity feed via entity_type='customer'.

create table if not exists public.customers (
  id              uuid primary key default gen_random_uuid(),
  customer_type   text not null default 'individual' check (customer_type in ('individual', 'corporation')),
  name            text not null,
  nik             text,
  npwp            text,
  phone           text,
  email           text,
  address         text,
  city            text,
  is_partner      boolean not null default false,
  commission_rate numeric(5,2),   -- percent (e.g. 2.50); only meaningful when is_partner
  owner_id        uuid references auth.users(id) on delete set null,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists customers_type_idx on public.customers (customer_type);
create index if not exists customers_partner_idx on public.customers (is_partner) where is_partner;
create index if not exists customers_owner_idx on public.customers (owner_id);

alter table public.customers enable row level security;

drop trigger if exists customers_updated_at on public.customers;
create trigger customers_updated_at before update on public.customers
  for each row execute function public.update_updated_at();

drop trigger if exists audit_customers on public.customers;
create trigger audit_customers after insert or update or delete on public.customers
  for each row execute function private.log_audit();

drop trigger if exists activity_customers on public.customers;
create trigger activity_customers after insert or update or delete on public.customers
  for each row execute function private.log_activity();

-- RLS: all staff read; admin/management/sales write.
drop policy if exists "Customers read" on public.customers;
create policy "Customers read" on public.customers for select to authenticated using (true);
drop policy if exists "Customers write" on public.customers;
create policy "Customers write" on public.customers for all to authenticated
  using (private.has_any_role(array['admin', 'management', 'sales']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management', 'sales']::public.app_role[]));

-- Extend the activity-feed trigger (013) to resolve customer changes to the
-- customer's feed (entity_type='customer'). Body/diff logic is unchanged.
create or replace function private.log_activity()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  v_row     jsonb;
  v_etype   text;
  v_eid     uuid;
  v_name    text;
  v_verb    text;
  v_changes jsonb;
begin
  if tg_op = 'DELETE' then
    v_row := to_jsonb(old);
  else
    v_row := to_jsonb(new);
  end if;

  case tg_table_name
    when 'products' then
      v_etype := 'product';         v_eid := (v_row->>'id')::uuid;         v_name := 'paket';
    when 'product_room_pricing' then
      v_etype := 'product';         v_eid := (v_row->>'product_id')::uuid; v_name := 'harga kamar ' || coalesce(v_row->>'room_type', '');
    when 'product_components' then
      v_etype := 'product';         v_eid := (v_row->>'product_id')::uuid; v_name := 'komponen HPP';
    when 'product_inventory_bom' then
      v_etype := 'product';         v_eid := (v_row->>'product_id')::uuid; v_name := 'item BOM';
    when 'product_requests' then
      v_etype := 'product_request'; v_eid := (v_row->>'id')::uuid;         v_name := 'permintaan';
    when 'customers' then
      v_etype := 'customer';        v_eid := (v_row->>'id')::uuid;         v_name := 'pelanggan';
    else
      return null;
  end case;

  v_verb := case tg_op when 'INSERT' then 'menambahkan' when 'UPDATE' then 'memperbarui' else 'menghapus' end;

  if tg_op = 'UPDATE' then
    select jsonb_object_agg(o.key, jsonb_build_object('old', o.value, 'new', n.value))
      into v_changes
    from jsonb_each(to_jsonb(old)) o
    join jsonb_each(to_jsonb(new)) n on n.key = o.key
    where o.value is distinct from n.value
      and o.key not in ('id', 'created_at', 'updated_at', 'product_id', 'currency',
                        'sort_order', 'requested_by', 'requested_by_email', 'reference_code');
    if v_changes is null then
      return null;
    end if;
  end if;

  insert into public.activity_events (entity_type, entity_id, event_type, body, metadata)
  values (
    v_etype, v_eid, 'system', v_verb || ' ' || v_name,
    jsonb_build_object('action', tg_op, 'source_table', tg_table_name, 'changes', coalesce(v_changes, '{}'::jsonb))
  );

  return null;
end $$;

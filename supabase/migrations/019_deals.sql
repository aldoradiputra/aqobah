-- Aqobah ERP — Phase 2.4: CRM deals + pipeline kanban
-- Deals flow through a pipeline's configurable stages. Visibility is owner +
-- team-lead (private.can_access_deal, 017). A validation trigger keeps stage_id
-- within its pipeline. Stage moves surface on the deal's activity feed with stage
-- *names* (resolved inside private.log_activity).

create table if not exists public.deals (
  id                  uuid primary key default gen_random_uuid(),
  pipeline_id         uuid not null references public.crm_pipelines(id) on delete restrict,
  stage_id            uuid not null references public.crm_pipeline_stages(id) on delete restrict,
  customer_id         uuid references public.customers(id) on delete set null,
  partner_id          uuid references public.customers(id) on delete set null,
  title               text not null,
  estimated_value     numeric(14,2),
  expected_pax        int,
  product_id          uuid references public.products(id) on delete set null,
  forecast_close_date date,
  owner_id            uuid references auth.users(id) on delete set null,
  lost_reason         text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists deals_pipeline_stage_idx on public.deals (pipeline_id, stage_id);
create index if not exists deals_stage_idx on public.deals (stage_id);
create index if not exists deals_owner_idx on public.deals (owner_id);
create index if not exists deals_customer_idx on public.deals (customer_id);
create index if not exists deals_partner_idx on public.deals (partner_id);
create index if not exists deals_product_idx on public.deals (product_id);

alter table public.deals enable row level security;

-- Keep a deal's stage within its pipeline.
create or replace function private.assert_deal_stage()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if not exists (
    select 1 from public.crm_pipeline_stages s
    where s.id = new.stage_id and s.pipeline_id = new.pipeline_id
  ) then
    raise exception 'Stage % does not belong to pipeline %', new.stage_id, new.pipeline_id;
  end if;
  return new;
end $$;

drop trigger if exists deals_assert_stage on public.deals;
create trigger deals_assert_stage before insert or update of stage_id, pipeline_id on public.deals
  for each row execute function private.assert_deal_stage();

drop trigger if exists deals_updated_at on public.deals;
create trigger deals_updated_at before update on public.deals
  for each row execute function public.update_updated_at();

drop trigger if exists audit_deals on public.deals;
create trigger audit_deals after insert or update or delete on public.deals
  for each row execute function private.log_audit();

drop trigger if exists activity_deals on public.deals;
create trigger activity_deals after insert or update or delete on public.deals
  for each row execute function private.log_activity();

-- RLS — per-action; SELECT/UPDATE/DELETE scoped by can_access_deal (owner + lead +
-- admin/management); INSERT limited to sales/management/admin owning the new row.
drop policy if exists "Deals read" on public.deals;
create policy "Deals read" on public.deals for select to authenticated
  using (private.can_access_deal(pipeline_id, owner_id));

drop policy if exists "Deals insert" on public.deals;
create policy "Deals insert" on public.deals for insert to authenticated
  with check (
    private.has_any_role(array['admin', 'management', 'sales']::public.app_role[])
    and owner_id = (select auth.uid())
  );

drop policy if exists "Deals update" on public.deals;
create policy "Deals update" on public.deals for update to authenticated
  using (private.can_access_deal(pipeline_id, owner_id))
  with check (private.can_access_deal(pipeline_id, owner_id));

drop policy if exists "Deals delete" on public.deals;
create policy "Deals delete" on public.deals for delete to authenticated
  using (private.can_access_deal(pipeline_id, owner_id));

-- Extend the activity-feed trigger (013/018): add the deals case and resolve a
-- stage_id change to human stage names ("Tahap: Penawaran → Negosiasi").
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
    when 'deals' then
      v_etype := 'deal';            v_eid := (v_row->>'id')::uuid;         v_name := 'deal';
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

    if tg_table_name = 'deals' and v_changes ? 'stage_id' then
      v_changes := jsonb_set(v_changes, '{stage_id}', jsonb_build_object(
        'old', (select to_jsonb(name) from public.crm_pipeline_stages where id = (v_changes #>> '{stage_id,old}')::uuid),
        'new', (select to_jsonb(name) from public.crm_pipeline_stages where id = (v_changes #>> '{stage_id,new}')::uuid)
      ));
    end if;
  end if;

  insert into public.activity_events (entity_type, entity_id, event_type, body, metadata)
  values (
    v_etype, v_eid, 'system', v_verb || ' ' || v_name,
    jsonb_build_object('action', tg_op, 'source_table', tg_table_name, 'changes', coalesce(v_changes, '{}'::jsonb))
  );

  return null;
end $$;

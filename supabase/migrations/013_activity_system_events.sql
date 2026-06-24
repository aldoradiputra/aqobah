-- Aqobah ERP — Activity feed system events (auto-logged record changes)
-- A generic AFTER trigger that writes a human-facing entry into
-- public.activity_events whenever a tracked record is created, updated, or
-- deleted — so the per-record feed shows *what* changed, *who*, and *when*,
-- interleaved with comments. Mirrors private.log_audit() (005) but is feed-facing
-- (staff-readable) and resolves each change to the product / request it belongs to.
--
-- The existing activity_events_set_actor BEFORE-INSERT trigger (010) stamps the
-- actor; auth.uid() resolves to the acting user even inside this definer function.
-- The function (owned by postgres) bypasses activity_events RLS, so it may insert
-- event_type='system' rows that clients are not allowed to insert directly.

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

  -- Resolve (entity_type, entity_id, friendly object name) per source table.
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
    else
      return null;
  end case;

  v_verb := case tg_op when 'INSERT' then 'menambahkan' when 'UPDATE' then 'memperbarui' else 'menghapus' end;

  -- For updates, capture the changed fields (old -> new), skipping noise columns.
  if tg_op = 'UPDATE' then
    select jsonb_object_agg(o.key, jsonb_build_object('old', o.value, 'new', n.value))
      into v_changes
    from jsonb_each(to_jsonb(old)) o
    join jsonb_each(to_jsonb(new)) n on n.key = o.key
    where o.value is distinct from n.value
      and o.key not in ('id', 'created_at', 'updated_at', 'product_id', 'currency',
                        'sort_order', 'requested_by', 'requested_by_email', 'reference_code');
    if v_changes is null then
      return null;  -- only noise columns changed (e.g. updated_at) — skip
    end if;
  end if;

  insert into public.activity_events (entity_type, entity_id, event_type, body, metadata)
  values (
    v_etype, v_eid, 'system', v_verb || ' ' || v_name,
    jsonb_build_object('action', tg_op, 'source_table', tg_table_name, 'changes', coalesce(v_changes, '{}'::jsonb))
  );

  return null;
end $$;

-- Attach to the tracked tables.
drop trigger if exists activity_products on public.products;
create trigger activity_products
  after insert or update or delete on public.products
  for each row execute function private.log_activity();

drop trigger if exists activity_product_room_pricing on public.product_room_pricing;
create trigger activity_product_room_pricing
  after insert or update or delete on public.product_room_pricing
  for each row execute function private.log_activity();

drop trigger if exists activity_product_components on public.product_components;
create trigger activity_product_components
  after insert or update or delete on public.product_components
  for each row execute function private.log_activity();

drop trigger if exists activity_product_inventory_bom on public.product_inventory_bom;
create trigger activity_product_inventory_bom
  after insert or update or delete on public.product_inventory_bom
  for each row execute function private.log_activity();

drop trigger if exists activity_product_requests on public.product_requests;
create trigger activity_product_requests
  after insert or update or delete on public.product_requests
  for each row execute function private.log_activity();

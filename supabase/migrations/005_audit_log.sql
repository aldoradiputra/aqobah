-- Aqobah ERP — Audit log (cross-cutting "who did what, when")
-- A generic AFTER trigger records every INSERT/UPDATE/DELETE on audited tables
-- into public.audit_log. The trigger function lives in the non-exposed `private`
-- schema (SECURITY DEFINER, search_path pinned) and is attached to products and
-- profiles here; attach it to future tables as they are added.

create table if not exists public.audit_log (
  id          bigint generated always as identity primary key,
  actor_id    uuid,        -- auth.uid() at the time of the change (null = system)
  actor_email text,        -- denormalized so history survives profile deletion
  action      text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  entity_type text not null,   -- table name
  entity_id   text,            -- affected row id (text for generality)
  old_data    jsonb,
  new_data    jsonb,
  created_at  timestamptz not null default now()
);

alter table public.audit_log enable row level security;

create index if not exists audit_log_entity_idx on public.audit_log (entity_type, entity_id);
create index if not exists audit_log_created_idx on public.audit_log (created_at desc);

-- Only admins/management may read the audit trail. There is intentionally no
-- write policy: the trigger function (owned by postgres) bypasses RLS, while
-- end users can never insert/update/delete audit rows.
drop policy if exists "Audit read elevated" on public.audit_log;
create policy "Audit read elevated" on public.audit_log
  for select to authenticated
  using (private.has_any_role(array['admin', 'management']::public.app_role[]));

-- Generic audit trigger function.
create or replace function private.log_audit()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_email text;
begin
  select email into v_email from public.profiles where id = v_actor;

  if (tg_op = 'DELETE') then
    insert into public.audit_log (actor_id, actor_email, action, entity_type, entity_id, old_data, new_data)
    values (v_actor, v_email, tg_op, tg_table_name, (old).id::text, to_jsonb(old), null);
    return old;
  elsif (tg_op = 'UPDATE') then
    insert into public.audit_log (actor_id, actor_email, action, entity_type, entity_id, old_data, new_data)
    values (v_actor, v_email, tg_op, tg_table_name, (new).id::text, to_jsonb(old), to_jsonb(new));
    return new;
  else
    insert into public.audit_log (actor_id, actor_email, action, entity_type, entity_id, old_data, new_data)
    values (v_actor, v_email, tg_op, tg_table_name, (new).id::text, null, to_jsonb(new));
    return new;
  end if;
end $$;

-- Attach to current tables.
drop trigger if exists audit_products on public.products;
create trigger audit_products
  after insert or update or delete on public.products
  for each row execute function private.log_audit();

drop trigger if exists audit_profiles on public.profiles;
create trigger audit_profiles
  after insert or update or delete on public.profiles
  for each row execute function private.log_audit();

-- Aqobah ERP — Activity feed (per-record comments / communication feed)
-- Polymorphic activity_events keyed by (entity_type, entity_id). Any signed-in
-- staff can read a record's feed and post comments; the actor is stamped
-- server-side (trigger) so it can't be spoofed. System events (event_type
-- 'system') are reserved for app/trigger use and cannot be inserted by clients.

create table if not exists public.activity_events (
  id          uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id   uuid not null,
  actor_id    uuid,
  actor_email text,
  event_type  text not null default 'comment' check (event_type in ('comment', 'note', 'system')),
  body        text not null,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists activity_events_entity_idx
  on public.activity_events (entity_type, entity_id, created_at desc);

alter table public.activity_events enable row level security;

-- Stamp the actor server-side (security definer; clients cannot spoof identity).
create or replace function private.set_activity_actor()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  new.actor_id := (select auth.uid());
  select email into new.actor_email from public.profiles where id = new.actor_id;
  return new;
end $$;

drop trigger if exists activity_events_set_actor on public.activity_events;
create trigger activity_events_set_actor
  before insert on public.activity_events
  for each row execute function private.set_activity_actor();

drop policy if exists "Activity read" on public.activity_events;
create policy "Activity read" on public.activity_events
  for select to authenticated using (true);

drop policy if exists "Activity insert" on public.activity_events;
create policy "Activity insert" on public.activity_events
  for insert to authenticated
  with check (event_type in ('comment', 'note'));

drop policy if exists "Activity delete own" on public.activity_events;
create policy "Activity delete own" on public.activity_events
  for delete to authenticated
  using (actor_id = (select auth.uid()) or private.has_role('admin'));

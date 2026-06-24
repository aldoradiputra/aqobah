-- Aqobah ERP — Phase 1.5: sales -> ops product requests
-- Sales (or any staff) raise a request (custom product / estimation); ops work it
-- through a status workflow and can assign / link the resulting product.
-- Discussion happens via the activity feed (entity_type = 'product_request').

create table if not exists public.product_requests (
  id                 uuid primary key default gen_random_uuid(),
  type               text not null default 'estimation' check (type in ('custom_product', 'estimation')),
  title              text not null,
  details            text,
  status             text not null default 'open' check (status in ('open', 'in_progress', 'done', 'rejected')),
  requested_by       uuid,
  requested_by_email text,
  assigned_to        uuid references auth.users(id) on delete set null,
  linked_product_id  uuid references public.products(id) on delete set null,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists product_requests_status_idx on public.product_requests (status, created_at desc);
create index if not exists product_requests_assigned_idx on public.product_requests (assigned_to);
create index if not exists product_requests_linked_idx on public.product_requests (linked_product_id);

alter table public.product_requests enable row level security;

drop trigger if exists product_requests_updated_at on public.product_requests;
create trigger product_requests_updated_at
  before update on public.product_requests
  for each row execute function public.update_updated_at();

-- Stamp the requester server-side on insert (cannot be spoofed).
create or replace function private.set_request_requester()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  new.requested_by := (select auth.uid());
  select email into new.requested_by_email from public.profiles where id = new.requested_by;
  return new;
end $$;

drop trigger if exists product_requests_set_requester on public.product_requests;
create trigger product_requests_set_requester
  before insert on public.product_requests
  for each row execute function private.set_request_requester();

drop policy if exists "Requests read" on public.product_requests;
create policy "Requests read" on public.product_requests
  for select to authenticated using (true);

drop policy if exists "Requests insert" on public.product_requests;
create policy "Requests insert" on public.product_requests
  for insert to authenticated with check (status = 'open');

-- Ops/management/admin work the inbox; the requester may edit their own request.
drop policy if exists "Requests update" on public.product_requests;
create policy "Requests update" on public.product_requests
  for update to authenticated
  using (
    private.has_any_role(array['admin', 'management', 'operational']::public.app_role[])
    or requested_by = (select auth.uid())
  )
  with check (
    private.has_any_role(array['admin', 'management', 'operational']::public.app_role[])
    or requested_by = (select auth.uid())
  );

drop policy if exists "Requests delete" on public.product_requests;
create policy "Requests delete" on public.product_requests
  for delete to authenticated
  using (requested_by = (select auth.uid()) or private.has_role('admin'));

drop trigger if exists audit_product_requests on public.product_requests;
create trigger audit_product_requests
  after insert or update or delete on public.product_requests
  for each row execute function private.log_audit();

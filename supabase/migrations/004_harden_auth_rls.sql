-- Aqobah ERP — Harden auth helpers & RLS (advisor cleanup for migration 003)
--
-- Clears Supabase linters introduced by 003:
--  * 0028 / 0029 (SECURITY DEFINER functions callable via the REST API): move the
--    RLS role helpers into a non-exposed `private` schema, and revoke direct
--    EXECUTE on the signup trigger function (the trigger still fires).
--  * 0003 (auth_rls_initplan): wrap auth.uid() in (select ...) so it is evaluated
--    once per query instead of once per row.
--  * 0006 (multiple_permissive_policies): split write policies by action and scope
--    the public product read to the anon role only.

-- ---------------------------------------------------------------------------
-- Private schema for RLS helpers (not exposed to PostgREST → not in the API)
-- ---------------------------------------------------------------------------
create schema if not exists private;
grant usage on schema private to authenticated;

create or replace function private.current_app_role()
returns public.app_role
language sql stable security definer set search_path = ''
as $$ select role from public.profiles where id = (select auth.uid()) $$;

create or replace function private.has_role(check_role public.app_role)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = check_role and is_active
  )
$$;

create or replace function private.has_any_role(check_roles public.app_role[])
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = any (check_roles) and is_active
  )
$$;

revoke all on function private.current_app_role() from public;
revoke all on function private.has_role(public.app_role) from public;
revoke all on function private.has_any_role(public.app_role[]) from public;
grant execute on function private.current_app_role() to authenticated;
grant execute on function private.has_role(public.app_role) to authenticated;
grant execute on function private.has_any_role(public.app_role[]) to authenticated;

-- Signup handler stays in public (the auth trigger context) but is no longer
-- directly callable; the trigger fires regardless of EXECUTE grants.
revoke all on function public.handle_new_user() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Rebuild profiles policies (single SELECT policy; writes split by action)
-- ---------------------------------------------------------------------------
drop policy if exists "Profiles read own or elevated" on public.profiles;
drop policy if exists "Profiles admin manage" on public.profiles;

create policy "Profiles read own or elevated" on public.profiles
  for select to authenticated
  using (
    id = (select auth.uid())
    or private.has_any_role(array['admin', 'management']::public.app_role[])
  );

create policy "Profiles admin insert" on public.profiles
  for insert to authenticated
  with check (private.has_role('admin'));
create policy "Profiles admin update" on public.profiles
  for update to authenticated
  using (private.has_role('admin'))
  with check (private.has_role('admin'));
create policy "Profiles admin delete" on public.profiles
  for delete to authenticated
  using (private.has_role('admin'));

-- ---------------------------------------------------------------------------
-- Rebuild products policies (anon reads published; staff read all; writes split)
-- ---------------------------------------------------------------------------
drop policy if exists "Public read published products" on public.products;
drop policy if exists "Products authenticated read all" on public.products;
drop policy if exists "Products config roles write" on public.products;

create policy "Public read published products" on public.products
  for select to anon using (is_published = true);

create policy "Products authenticated read all" on public.products
  for select to authenticated using (true);

create policy "Products config insert" on public.products
  for insert to authenticated
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
create policy "Products config update" on public.products
  for update to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
create policy "Products config delete" on public.products
  for delete to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- Drop the now-unused public (API-exposed) helper functions
-- ---------------------------------------------------------------------------
drop function if exists public.current_app_role();
drop function if exists public.has_role(public.app_role);
drop function if exists public.has_any_role(public.app_role[]);

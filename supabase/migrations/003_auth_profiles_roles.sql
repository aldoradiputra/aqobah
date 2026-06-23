-- Aqobah ERP — Auth: profiles, roles, role-based RLS
-- Adds the Supabase Auth role model: an app_role enum, a profiles table (1-1 with
-- auth.users), SECURITY DEFINER role helpers (search_path pinned, advisor
-- 0011-clean to avoid RLS recursion), a signup trigger (first user becomes admin),
-- and role-aware RLS. The website's anonymous "Public read published products"
-- policy is intentionally preserved.

-- 1) Role enum -------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum
      ('admin', 'management', 'sales', 'operational', 'warehouse', 'finance');
  end if;
end $$;

-- 2) Profiles table --------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text,
  full_name     text,
  role          public.app_role not null default 'sales',
  business_unit text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Reuse the hardened updated_at trigger function from migration 002.
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

-- 3) Role helpers (SECURITY DEFINER, search_path pinned) -------------------
create or replace function public.current_app_role()
returns public.app_role
language sql stable security definer set search_path = ''
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.has_role(check_role public.app_role)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = check_role and is_active
  )
$$;

create or replace function public.has_any_role(check_roles public.app_role[])
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = any (check_roles) and is_active
  )
$$;

-- 4) Auto-create a profile on signup; the first user becomes admin ---------
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  assigned_role public.app_role;
begin
  if (select count(*) from public.profiles) = 0 then
    assigned_role := 'admin';
  else
    assigned_role := 'sales';
  end if;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1)
    ),
    assigned_role
  )
  on conflict (id) do nothing;

  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5) Profiles RLS ----------------------------------------------------------
-- Read your own profile; admins/management can read everyone.
drop policy if exists "Profiles read own or elevated" on public.profiles;
create policy "Profiles read own or elevated" on public.profiles
  for select to authenticated
  using (
    id = auth.uid()
    or public.has_any_role(array['admin', 'management']::public.app_role[])
  );

-- Only admins can write profiles (incl. role changes). The signup trigger
-- inserts via SECURITY DEFINER, so it bypasses this policy.
drop policy if exists "Profiles admin manage" on public.profiles;
create policy "Profiles admin manage" on public.profiles
  for all to authenticated
  using (public.has_role('admin'))
  with check (public.has_role('admin'));

-- 6) Products RLS: role-aware writes; keep public + add authenticated read --
drop policy if exists "Authenticated manage products" on public.products;

-- All signed-in staff can read every product (published or not).
drop policy if exists "Products authenticated read all" on public.products;
create policy "Products authenticated read all" on public.products
  for select to authenticated using (true);

-- Product configuration is done by operational (and management/admin).
drop policy if exists "Products config roles write" on public.products;
create policy "Products config roles write" on public.products
  for all to authenticated
  using (public.has_any_role(array['admin', 'management', 'operational']::public.app_role[]))
  with check (public.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

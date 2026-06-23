-- Aqobah ERP — Phase 1.1: business units + product configuration fields
-- Adds a business_units reference table and the first product-configuration
-- columns (kode produk, departure/return dates), and backfills codes for the
-- existing catalog. The website reads only existing columns, so this is additive.

-- Business units reference -------------------------------------------------
create table if not exists public.business_units (
  id         uuid primary key default gen_random_uuid(),
  code       text not null unique,   -- UMR, HAJ, HAL, B2B, STORE
  name       text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

alter table public.business_units enable row level security;

drop policy if exists "Business units read" on public.business_units;
create policy "Business units read" on public.business_units
  for select to authenticated using (true);

drop policy if exists "Business units insert" on public.business_units;
create policy "Business units insert" on public.business_units
  for insert to authenticated
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop policy if exists "Business units update" on public.business_units;
create policy "Business units update" on public.business_units
  for update to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop policy if exists "Business units delete" on public.business_units;
create policy "Business units delete" on public.business_units
  for delete to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop trigger if exists audit_business_units on public.business_units;
create trigger audit_business_units
  after insert or update or delete on public.business_units
  for each row execute function private.log_audit();

insert into public.business_units (code, name, sort_order) values
  ('UMR', 'Umrah', 1),
  ('HAJ', 'Haji Khusus', 2),
  ('HAL', 'Wisata Halal', 3),
  ('B2B', 'B2B', 4),
  ('STORE', 'Aqobah Store', 5)
on conflict (code) do nothing;

-- Product configuration columns --------------------------------------------
alter table public.products
  add column if not exists product_code   text,
  add column if not exists departure_date date,
  add column if not exists return_date    date;

create unique index if not exists products_product_code_key on public.products (product_code);

-- Backfill kode produk for the existing catalog (UMR201, HAJ201, …).
with numbered as (
  select id,
    case unit
      when 'Umrah'        then 'UMR'
      when 'Haji Khusus'  then 'HAJ'
      when 'Wisata Halal' then 'HAL'
      when 'B2B'          then 'B2B'
      else 'PRD'
    end as prefix,
    row_number() over (partition by unit order by sort_order, created_at) as rn
  from public.products
  where product_code is null
)
update public.products p
set product_code = n.prefix || lpad((200 + n.rn)::text, 3, '0')
from numbered n
where p.id = n.id;

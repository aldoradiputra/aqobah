-- Aqobah ERP — Phase 1.3: komponen keberangkatan (HPP cost sheet)
-- component_types is the reference taxonomy; product_components are the per-product
-- cost lines (qty x unit_cost) that roll up to the product's HPP.

create table if not exists public.component_types (
  id         uuid primary key default gen_random_uuid(),
  code       text not null unique,
  name       text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

alter table public.component_types enable row level security;

drop policy if exists "Component types read" on public.component_types;
create policy "Component types read" on public.component_types
  for select to authenticated using (true);
drop policy if exists "Component types insert" on public.component_types;
create policy "Component types insert" on public.component_types
  for insert to authenticated
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
drop policy if exists "Component types update" on public.component_types;
create policy "Component types update" on public.component_types
  for update to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
drop policy if exists "Component types delete" on public.component_types;
create policy "Component types delete" on public.component_types
  for delete to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop trigger if exists audit_component_types on public.component_types;
create trigger audit_component_types
  after insert or update or delete on public.component_types
  for each row execute function private.log_audit();

insert into public.component_types (code, name, sort_order) values
  ('tiket_pesawat', 'Tiket Pesawat', 1),
  ('hotel', 'Hotel', 2),
  ('visa', 'Visa', 3),
  ('konsumsi', 'Konsumsi', 4),
  ('handling', 'Handling', 5),
  ('fee_komisi', 'Fee & Komisi', 6),
  ('mutawif', 'Mutawif', 7),
  ('tour_leader', 'Tour Leader', 8),
  ('kereta_cepat', 'Kereta Cepat', 9),
  ('manasik', 'Manasik', 10),
  ('vaksin', 'Vaksin', 11),
  ('id_card', 'ID Card', 12),
  ('spanduk', 'Spanduk', 13),
  ('name_tag', 'Name Tag', 14),
  ('asuransi', 'Asuransi', 15),
  ('system_token', 'System Input Token', 16),
  ('inventory', 'Inventory', 17),
  ('dokumen', 'Dokumen', 18),
  ('staff_bonus', 'Staff Bonus', 19),
  ('bus', 'Bus', 20),
  ('thaif', 'Thaif', 21),
  ('nusuk', 'Nusuk', 22),
  ('tasreh', 'Tasreh', 23),
  ('photo_doc', 'Photo Documentation', 24),
  ('penalty', 'Penalty', 25)
on conflict (code) do nothing;

create table if not exists public.product_components (
  id                uuid primary key default gen_random_uuid(),
  product_id        uuid not null references public.products(id) on delete cascade,
  component_type_id uuid references public.component_types(id),
  note              text,
  qty               numeric(12, 2) not null default 1,
  unit_cost         numeric(14, 2) not null default 0,
  currency          text not null default 'IDR',
  sort_order        int  not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists product_components_product_idx on public.product_components (product_id);
create index if not exists product_components_component_type_idx on public.product_components (component_type_id);

alter table public.product_components enable row level security;

drop trigger if exists product_components_updated_at on public.product_components;
create trigger product_components_updated_at
  before update on public.product_components
  for each row execute function public.update_updated_at();

drop policy if exists "Product components read" on public.product_components;
create policy "Product components read" on public.product_components
  for select to authenticated using (true);
drop policy if exists "Product components insert" on public.product_components;
create policy "Product components insert" on public.product_components
  for insert to authenticated
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
drop policy if exists "Product components update" on public.product_components;
create policy "Product components update" on public.product_components
  for update to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
drop policy if exists "Product components delete" on public.product_components;
create policy "Product components delete" on public.product_components
  for delete to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop trigger if exists audit_product_components on public.product_components;
create trigger audit_product_components
  after insert or update or delete on public.product_components
  for each row execute function private.log_audit();

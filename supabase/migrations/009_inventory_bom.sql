-- Aqobah ERP — Phase 1.4: inventory items (minimal) + product inventory BOM
-- inventory_items is the master list (expanded with stock/categories in Phase 5).
-- product_inventory_bom is the per-product, per-gender bill of materials a jemaah
-- receives (e.g. female excludes ihram).

create table if not exists public.inventory_items (
  id             uuid primary key default gen_random_uuid(),
  sku            text unique,
  name           text not null,
  category       text not null default 'product_consumable'
                   check (category in ('product_consumable', 'store_retail', 'office_supply', 'asset')),
  unit           text not null default 'pcs',
  gender_variant text not null default 'unisex'
                   check (gender_variant in ('male', 'female', 'unisex')),
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

alter table public.inventory_items enable row level security;

drop trigger if exists inventory_items_updated_at on public.inventory_items;
create trigger inventory_items_updated_at
  before update on public.inventory_items
  for each row execute function public.update_updated_at();

drop policy if exists "Inventory items read" on public.inventory_items;
create policy "Inventory items read" on public.inventory_items
  for select to authenticated using (true);
drop policy if exists "Inventory items insert" on public.inventory_items;
create policy "Inventory items insert" on public.inventory_items
  for insert to authenticated
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
drop policy if exists "Inventory items update" on public.inventory_items;
create policy "Inventory items update" on public.inventory_items
  for update to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
drop policy if exists "Inventory items delete" on public.inventory_items;
create policy "Inventory items delete" on public.inventory_items
  for delete to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop trigger if exists audit_inventory_items on public.inventory_items;
create trigger audit_inventory_items
  after insert or update or delete on public.inventory_items
  for each row execute function private.log_audit();

insert into public.inventory_items (sku, name, category, unit, gender_variant) values
  ('INV-KOPER',    'Koper',           'product_consumable', 'pcs', 'unisex'),
  ('INV-KABIN',    'Koper Kabin',     'product_consumable', 'pcs', 'unisex'),
  ('INV-BUKUDOA',  'Buku Doa',        'product_consumable', 'pcs', 'unisex'),
  ('INV-BATIK',    'Seragam Batik',   'product_consumable', 'pcs', 'unisex'),
  ('INV-SYAL',     'Syal',            'product_consumable', 'pcs', 'unisex'),
  ('INV-TASPASPOR','Tas Paspor',      'product_consumable', 'pcs', 'unisex'),
  ('INV-IHRAM',    'Kain Ihram',      'product_consumable', 'set', 'male'),
  ('INV-MUKENA',   'Mukena',          'product_consumable', 'pcs', 'female')
on conflict (sku) do nothing;

create table if not exists public.product_inventory_bom (
  id                uuid primary key default gen_random_uuid(),
  product_id        uuid not null references public.products(id) on delete cascade,
  inventory_item_id uuid not null references public.inventory_items(id) on delete cascade,
  qty_per_pax       numeric(10, 2) not null default 1,
  gender            text not null default 'all' check (gender in ('male', 'female', 'all')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (product_id, inventory_item_id, gender)
);

create index if not exists product_inventory_bom_product_idx on public.product_inventory_bom (product_id);
create index if not exists product_inventory_bom_item_idx on public.product_inventory_bom (inventory_item_id);

alter table public.product_inventory_bom enable row level security;

drop trigger if exists product_inventory_bom_updated_at on public.product_inventory_bom;
create trigger product_inventory_bom_updated_at
  before update on public.product_inventory_bom
  for each row execute function public.update_updated_at();

drop policy if exists "Product BOM read" on public.product_inventory_bom;
create policy "Product BOM read" on public.product_inventory_bom
  for select to authenticated using (true);
drop policy if exists "Product BOM insert" on public.product_inventory_bom;
create policy "Product BOM insert" on public.product_inventory_bom
  for insert to authenticated
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
drop policy if exists "Product BOM update" on public.product_inventory_bom;
create policy "Product BOM update" on public.product_inventory_bom
  for update to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));
drop policy if exists "Product BOM delete" on public.product_inventory_bom;
create policy "Product BOM delete" on public.product_inventory_bom
  for delete to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop trigger if exists audit_product_inventory_bom on public.product_inventory_bom;
create trigger audit_product_inventory_bom
  after insert or update or delete on public.product_inventory_bom
  for each row execute function private.log_audit();

-- Aqobah ERP — Phase 1.2: room-type pricing (quad / triple / double)
-- One price row per (product, room_type). Read by any signed-in staff; written
-- by config roles. Audited like every other table.

create table if not exists public.product_room_pricing (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  room_type  text not null check (room_type in ('quad', 'triple', 'double')),
  price      numeric(14, 2),
  currency   text not null default 'IDR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, room_type)
);

create index if not exists product_room_pricing_product_idx on public.product_room_pricing (product_id);

alter table public.product_room_pricing enable row level security;

drop trigger if exists product_room_pricing_updated_at on public.product_room_pricing;
create trigger product_room_pricing_updated_at
  before update on public.product_room_pricing
  for each row execute function public.update_updated_at();

drop policy if exists "Room pricing read" on public.product_room_pricing;
create policy "Room pricing read" on public.product_room_pricing
  for select to authenticated using (true);

drop policy if exists "Room pricing insert" on public.product_room_pricing;
create policy "Room pricing insert" on public.product_room_pricing
  for insert to authenticated
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop policy if exists "Room pricing update" on public.product_room_pricing;
create policy "Room pricing update" on public.product_room_pricing
  for update to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop policy if exists "Room pricing delete" on public.product_room_pricing;
create policy "Room pricing delete" on public.product_room_pricing
  for delete to authenticated
  using (private.has_any_role(array['admin', 'management', 'operational']::public.app_role[]));

drop trigger if exists audit_product_room_pricing on public.product_room_pricing;
create trigger audit_product_room_pricing
  after insert or update or delete on public.product_room_pricing
  for each row execute function private.log_audit();

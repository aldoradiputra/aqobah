-- Aqobah ERP — Phase 2.1: CRM pipelines & configurable stages
-- The CRM is multi-pipeline across two channels (direct: Umrah/Hajj/Wisata Halal;
-- indirect: Partner Recruitment/Enablement). Each pipeline owns an ordered, fully
-- editable set of stages with terminal won/lost markers. These are reference/config
-- tables: readable by all staff, editable by admin/management. Deals (2.4) reference
-- a pipeline + stage; teams (2.2) map members to pipelines.

create table if not exists public.crm_pipelines (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  channel     text not null check (channel in ('direct', 'indirect')),
  sort_order  int  not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (channel, name)
);

create table if not exists public.crm_pipeline_stages (
  id          uuid primary key default gen_random_uuid(),
  pipeline_id uuid not null references public.crm_pipelines(id) on delete cascade,
  name        text not null,
  sort_order  int  not null default 0,
  is_won      boolean not null default false,
  is_lost     boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (pipeline_id, name)
);
create index if not exists crm_pipeline_stages_pipeline_idx
  on public.crm_pipeline_stages (pipeline_id, sort_order);

alter table public.crm_pipelines enable row level security;
alter table public.crm_pipeline_stages enable row level security;

-- updated_at + audit triggers (reuse the shared helpers).
drop trigger if exists crm_pipelines_updated_at on public.crm_pipelines;
create trigger crm_pipelines_updated_at before update on public.crm_pipelines
  for each row execute function public.update_updated_at();
drop trigger if exists crm_pipeline_stages_updated_at on public.crm_pipeline_stages;
create trigger crm_pipeline_stages_updated_at before update on public.crm_pipeline_stages
  for each row execute function public.update_updated_at();

drop trigger if exists audit_crm_pipelines on public.crm_pipelines;
create trigger audit_crm_pipelines after insert or update or delete on public.crm_pipelines
  for each row execute function private.log_audit();
drop trigger if exists audit_crm_pipeline_stages on public.crm_pipeline_stages;
create trigger audit_crm_pipeline_stages after insert or update or delete on public.crm_pipeline_stages
  for each row execute function private.log_audit();

-- RLS: all staff read; admin/management write.
drop policy if exists "Pipelines read" on public.crm_pipelines;
create policy "Pipelines read" on public.crm_pipelines for select to authenticated using (true);
drop policy if exists "Pipelines write" on public.crm_pipelines;
create policy "Pipelines write" on public.crm_pipelines for all to authenticated
  using (private.has_any_role(array['admin', 'management']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management']::public.app_role[]));

drop policy if exists "Pipeline stages read" on public.crm_pipeline_stages;
create policy "Pipeline stages read" on public.crm_pipeline_stages for select to authenticated using (true);
drop policy if exists "Pipeline stages write" on public.crm_pipeline_stages;
create policy "Pipeline stages write" on public.crm_pipeline_stages for all to authenticated
  using (private.has_any_role(array['admin', 'management']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management']::public.app_role[]));

-- ── Seed the five pipelines + their default stages (idempotent) ──────────────
insert into public.crm_pipelines (name, channel, sort_order) values
  ('Umrah',               'direct',   1),
  ('Hajj',                'direct',   2),
  ('Wisata Halal',        'direct',   3),
  ('Partner Recruitment', 'indirect', 4),
  ('Partner Enablement',  'indirect', 5)
on conflict (channel, name) do nothing;

-- Direct pipelines share a sell-to-jamaah funnel.
insert into public.crm_pipeline_stages (pipeline_id, name, sort_order, is_won, is_lost)
select p.id, s.name, s.sort_order, s.is_won, s.is_lost
from public.crm_pipelines p
cross join (values
  ('Prospek',   1, false, false),
  ('Dihubungi', 2, false, false),
  ('Penawaran', 3, false, false),
  ('Negosiasi', 4, false, false),
  ('Menang',    5, true,  false),
  ('Kalah',     6, false, true)
) as s(name, sort_order, is_won, is_lost)
where p.name in ('Umrah', 'Hajj', 'Wisata Halal') and p.channel = 'direct'
on conflict (pipeline_id, name) do nothing;

-- Partner Recruitment: sign & onboard new partners.
insert into public.crm_pipeline_stages (pipeline_id, name, sort_order, is_won, is_lost)
select p.id, s.name, s.sort_order, s.is_won, s.is_lost
from public.crm_pipelines p
cross join (values
  ('Teridentifikasi', 1, false, false),
  ('Pendekatan',      2, false, false),
  ('Negosiasi',       3, false, false),
  ('Tanda Tangan',    4, true,  false),
  ('Batal',           5, false, true)
) as s(name, sort_order, is_won, is_lost)
where p.name = 'Partner Recruitment' and p.channel = 'indirect'
on conflict (pipeline_id, name) do nothing;

-- Partner Enablement: farm deals from existing partners.
insert into public.crm_pipeline_stages (pipeline_id, name, sort_order, is_won, is_lost)
select p.id, s.name, s.sort_order, s.is_won, s.is_lost
from public.crm_pipelines p
cross join (values
  ('Prospek dari Partner', 1, false, false),
  ('Penawaran',            2, false, false),
  ('Negosiasi',            3, false, false),
  ('Menang',               4, true,  false),
  ('Kalah',                5, false, true)
) as s(name, sort_order, is_won, is_lost)
where p.name = 'Partner Enablement' and p.channel = 'indirect'
on conflict (pipeline_id, name) do nothing;

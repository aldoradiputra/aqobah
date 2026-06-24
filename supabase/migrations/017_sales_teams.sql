-- Aqobah ERP — Phase 2.2: CRM sales teams, membership & deal-access helpers
-- Sales teams map members to the pipelines they work. A salesperson can belong to
-- several teams (so they see several pipelines). Seniority is per-team
-- (member | lead) and independent of the global app_role. Team leads can see all
-- deals in their team's pipeline(s) — enforced later by deal RLS (2.4) via the
-- can_access_deal() helper defined here.
--
-- Config/reference tables: readable by all staff, writable by admin/management
-- (mirrors crm_pipelines in 016). Each table carries a surrogate id so the shared
-- private.log_audit() trigger (005, keys on (new).id) applies cleanly.

create table if not exists public.sales_teams (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Team ↔ pipeline (M2M): which pipelines a team works.
create table if not exists public.sales_team_pipelines (
  id          uuid primary key default gen_random_uuid(),
  team_id     uuid not null references public.sales_teams(id) on delete cascade,
  pipeline_id uuid not null references public.crm_pipelines(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (team_id, pipeline_id)
);
create index if not exists sales_team_pipelines_team_idx on public.sales_team_pipelines (team_id);
create index if not exists sales_team_pipelines_pipeline_idx on public.sales_team_pipelines (pipeline_id);

-- User ↔ team (M2M) with per-team seniority.
create table if not exists public.sales_team_members (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.sales_teams(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  seniority  text not null default 'member' check (seniority in ('member', 'lead')),
  created_at timestamptz not null default now(),
  unique (team_id, user_id)
);
create index if not exists sales_team_members_team_idx on public.sales_team_members (team_id);
create index if not exists sales_team_members_user_idx on public.sales_team_members (user_id);

alter table public.sales_teams          enable row level security;
alter table public.sales_team_pipelines enable row level security;
alter table public.sales_team_members   enable row level security;

-- updated_at + audit triggers (reuse the shared helpers).
drop trigger if exists sales_teams_updated_at on public.sales_teams;
create trigger sales_teams_updated_at before update on public.sales_teams
  for each row execute function public.update_updated_at();

drop trigger if exists audit_sales_teams on public.sales_teams;
create trigger audit_sales_teams after insert or update or delete on public.sales_teams
  for each row execute function private.log_audit();
drop trigger if exists audit_sales_team_pipelines on public.sales_team_pipelines;
create trigger audit_sales_team_pipelines after insert or update or delete on public.sales_team_pipelines
  for each row execute function private.log_audit();
drop trigger if exists audit_sales_team_members on public.sales_team_members;
create trigger audit_sales_team_members after insert or update or delete on public.sales_team_members
  for each row execute function private.log_audit();

-- ── RLS: all staff read; admin/management write (same shape as 016) ──────────
drop policy if exists "Sales teams read" on public.sales_teams;
create policy "Sales teams read" on public.sales_teams for select to authenticated using (true);
drop policy if exists "Sales teams write" on public.sales_teams;
create policy "Sales teams write" on public.sales_teams for all to authenticated
  using (private.has_any_role(array['admin', 'management']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management']::public.app_role[]));

drop policy if exists "Sales team pipelines read" on public.sales_team_pipelines;
create policy "Sales team pipelines read" on public.sales_team_pipelines for select to authenticated using (true);
drop policy if exists "Sales team pipelines write" on public.sales_team_pipelines;
create policy "Sales team pipelines write" on public.sales_team_pipelines for all to authenticated
  using (private.has_any_role(array['admin', 'management']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management']::public.app_role[]));

drop policy if exists "Sales team members read" on public.sales_team_members;
create policy "Sales team members read" on public.sales_team_members for select to authenticated using (true);
drop policy if exists "Sales team members write" on public.sales_team_members;
create policy "Sales team members write" on public.sales_team_members for all to authenticated
  using (private.has_any_role(array['admin', 'management']::public.app_role[]))
  with check (private.has_any_role(array['admin', 'management']::public.app_role[]));

-- ── Access helpers (definer, search_path pinned; like private.has_role) ──────
-- True when the user is a `lead` on some team attached to the given pipeline.
create or replace function private.is_team_lead_for_pipeline(p_pipeline uuid, p_uid uuid)
returns boolean
language sql security definer set search_path = '' stable
as $$
  select exists (
    select 1
    from public.sales_team_members m
    join public.sales_team_pipelines tp on tp.team_id = m.team_id
    where m.user_id = p_uid
      and m.seniority = 'lead'
      and tp.pipeline_id = p_pipeline
  );
$$;

-- Deal visibility rule, consumed by deal RLS in 2.4: admins/management see all;
-- owners see their own; team leads see their team's pipeline(s).
create or replace function private.can_access_deal(p_pipeline uuid, p_owner uuid)
returns boolean
language sql security definer set search_path = '' stable
as $$
  select
    private.has_any_role(array['admin', 'management']::public.app_role[])
    or p_owner = (select auth.uid())
    or private.is_team_lead_for_pipeline(p_pipeline, (select auth.uid()));
$$;

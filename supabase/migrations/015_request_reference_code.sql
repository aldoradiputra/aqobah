-- Aqobah ERP — Request auto reference code
-- Every product request gets a human-facing code REQ-YYYY-NNNN assigned
-- automatically on insert. Requests originate from paper forms; the code is the
-- handle staff quote on the phone/WhatsApp and (once CRM lands) the link key.
-- NNNN is a per-year sequence that resets each calendar year:
--   REQ-2026-0001, REQ-2026-0002, … then REQ-2027-0001.

alter table public.product_requests
  add column if not exists reference_code text unique;

-- Per-year counter, advanced atomically inside the insert trigger (the upsert
-- row-locks the year, so concurrent inserts get distinct sequence numbers).
-- Lives in the private schema (not exposed via the API; no RLS needed).
create table if not exists private.request_counters (
  year int primary key,
  last int  not null default 0
);

-- Extend the existing requester-stamp trigger (011) to also mint the code.
create or replace function private.set_request_requester()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  v_year int := extract(year from now())::int;
  v_seq  int;
begin
  new.requested_by := (select auth.uid());
  select email into new.requested_by_email from public.profiles where id = new.requested_by;

  if new.reference_code is null then
    insert into private.request_counters (year, last)
    values (v_year, 1)
    on conflict (year) do update set last = request_counters.last + 1
    returning last into v_seq;

    new.reference_code := 'REQ-' || v_year || '-' || lpad(v_seq::text, 4, '0');
  end if;

  return new;
end $$;

-- Backfill existing rows in creation order, numbered per year.
with ordered as (
  select id,
         extract(year from created_at)::int as yr,
         row_number() over (
           partition by extract(year from created_at) order by created_at, id
         ) as seq
  from public.product_requests
  where reference_code is null
)
update public.product_requests p
set reference_code = 'REQ-' || o.yr || '-' || lpad(o.seq::text, 4, '0')
from ordered o
where p.id = o.id;

-- Seed the counter so new inserts continue after the highest backfilled number.
insert into private.request_counters (year, last)
select extract(year from created_at)::int, count(*)::int
from public.product_requests
group by extract(year from created_at)
on conflict (year) do update set last = greatest(request_counters.last, excluded.last);

# Aqobah ERP

Internal operations console for Aqobah (Umrah/Hajj travel + Aqobah Store).
Rebuilt as a proper SPA per the roadmap — replaces the single-file
`../erp/index.html` prototype.

## Stack
- **Vite + React + TypeScript** (build step, modular files)
- **@supabase/supabase-js** for data + (soon) auth — replaces the hand-rolled REST wrapper
- **TanStack Query** for data fetching/caching
- **React Router** for routing
- Brand design tokens ported from `../project/tokens/*` into `src/styles/tokens.css`

## Develop
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build
```

## Environment
Supabase URL + publishable key are baked in as defaults (`src/lib/supabase.ts`).
Override via `.env` (see `.env.example`) to point at a different project/branch.

## Deployment
Ships as its own Vercel project (target: `erp.aqobah.com`), separate from the
static marketing site. `vercel.json` rewrites all paths to `index.html` for
client-side routing.

## Status (Phase 0 — Foundation)
- [x] Vite + React + TS scaffold, design tokens, ERP shell, UI primitives
- [x] Supabase SDK + TanStack Query + routing
- [x] Products page reading live Supabase data (reference feature)
- [x] Auth (email/password) + `profiles` + role-based RLS
- [x] Audit log (generic triggers + admin Audit Trail page)
- [x] DataView (list ⇄ kanban) + search/filter/sort bar
- [ ] Activity feed (per-record comments + timeline) — with Phase 1 detail views

## Status (Phase 1 — Product configuration)
- [x] Business units + kode produk + departure/return dates; editable products (CRUD)
- [x] Product detail page + room-type pricing (quad/triple/double)
- [ ] Components/HPP, inventory BOM, sales→ops requests, activity feed

See `../.claude` plan / roadmap for the full phase breakdown.

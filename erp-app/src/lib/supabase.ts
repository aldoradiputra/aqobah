import { createClient } from '@supabase/supabase-js'

// Defaults point at the live Aqobah Supabase project. The key is the publishable
// (anon) key — safe to ship to the browser; row-level security guards the data.
// Override via VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY to target a branch.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://asztgumnilpjdxpizkzn.supabase.co'
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'sb_publishable_eSriyphjQxKP3rNxNwmpOg_w5K1R_1j'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

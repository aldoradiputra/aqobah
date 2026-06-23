// Mirrors the `products` table (supabase/migrations/001_create_products.sql).
// Kept backward-compatible with the live marketing website — add columns, never
// rename/drop the ones it reads.
export interface Product {
  id: string
  name: string
  unit: 'Umrah' | 'Haji Khusus' | 'Wisata Halal' | 'B2B' | string
  duration: string | null
  departure: string | null
  hotel_stars: number | null
  facilities: string[] | null
  price_display: string | null
  image_key: string | null
  badge_label: string | null
  badge_variant: string | null
  rating: number | null
  sold: number | null
  cap: number | null
  tone: string | null
  is_published: boolean
  sort_order: number | null
  product_code: string | null
  departure_date: string | null
  return_date: string | null
  created_at: string
  updated_at: string
}

// Business unit reference (supabase/migrations/006_*).
export interface BusinessUnit {
  id: string
  code: string
  name: string
  sort_order: number
  created_at: string
}

// Auth / access model (supabase/migrations/003_auth_profiles_roles.sql).
export type AppRole =
  | 'admin'
  | 'management'
  | 'sales'
  | 'operational'
  | 'warehouse'
  | 'finance'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: AppRole
  business_unit: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

// Audit log (supabase/migrations/005_audit_log.sql).
export interface AuditEntry {
  id: number
  actor_id: string | null
  actor_email: string | null
  action: 'INSERT' | 'UPDATE' | 'DELETE' | string
  entity_type: string
  entity_id: string | null
  old_data: Record<string, unknown> | null
  new_data: Record<string, unknown> | null
  created_at: string
}

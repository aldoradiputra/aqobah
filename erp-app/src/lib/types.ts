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
  created_at: string
  updated_at: string
}

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

// Room-type pricing (supabase/migrations/007_*). `price` may arrive as a string
// from Postgres numeric, so coerce with Number() before use.
export type RoomType = 'quad' | 'triple' | 'double'

export interface RoomPricing {
  id: string
  product_id: string
  room_type: RoomType
  price: number | string | null
  currency: string
  created_at: string
  updated_at: string
}

// Komponen keberangkatan / HPP (supabase/migrations/008_*).
export interface ComponentType {
  id: string
  code: string
  name: string
  sort_order: number
  created_at: string
}

export interface ProductComponent {
  id: string
  product_id: string
  component_type_id: string | null
  note: string | null
  qty: number | string
  unit_cost: number | string
  currency: string
  sort_order: number
  created_at: string
  updated_at: string
}

// Inventory items + per-product BOM (supabase/migrations/009_*).
export type InventoryCategory = 'product_consumable' | 'store_retail' | 'office_supply' | 'asset'
export type GenderVariant = 'male' | 'female' | 'unisex'

export interface InventoryItem {
  id: string
  sku: string | null
  name: string
  category: InventoryCategory | string
  unit: string
  gender_variant: GenderVariant | string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type BomGender = 'male' | 'female' | 'all'

export interface ProductBomEntry {
  id: string
  product_id: string
  inventory_item_id: string
  qty_per_pax: number | string
  gender: BomGender | string
  created_at: string
  updated_at: string
}

// Activity feed (supabase/migrations/010_activity_events.sql).
export interface ActivityAttachment {
  path: string
  name: string
  size: number
  type: string
}

export interface ActivityEvent {
  id: string
  entity_type: string
  entity_id: string
  actor_id: string | null
  actor_email: string | null
  event_type: 'comment' | 'note' | 'system' | string
  body: string
  metadata: {
    action?: 'INSERT' | 'UPDATE' | 'DELETE' | string
    source_table?: string
    changes?: Record<string, { old: unknown; new: unknown }>
    attachments?: ActivityAttachment[]
  }
  created_at: string
}

// Sales → ops product requests (supabase/migrations/011_*).
export type RequestType = 'custom_product' | 'estimation'
export type RequestStatus = 'open' | 'in_progress' | 'done' | 'rejected'

export interface ProductRequest {
  id: string
  type: RequestType | string
  title: string
  details: string | null
  status: RequestStatus | string
  requested_by: string | null
  requested_by_email: string | null
  assigned_to: string | null
  linked_product_id: string | null
  reference_code: string | null
  created_at: string
  updated_at: string
}

// CRM pipelines & configurable stages (supabase/migrations/016_crm_pipelines.sql).
export type PipelineChannel = 'direct' | 'indirect'

export interface CrmPipeline {
  id: string
  name: string
  channel: PipelineChannel | string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CrmPipelineStage {
  id: string
  pipeline_id: string
  name: string
  sort_order: number
  is_won: boolean
  is_lost: boolean
  created_at: string
  updated_at: string
}

// CRM sales teams & membership (supabase/migrations/017_sales_teams.sql).
export type TeamSeniority = 'member' | 'lead'

export interface SalesTeam {
  id: string
  name: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SalesTeamPipeline {
  id: string
  team_id: string
  pipeline_id: string
  created_at: string
}

export interface SalesTeamMember {
  id: string
  team_id: string
  user_id: string
  seniority: TeamSeniority | string
  created_at: string
}

// CRM customers & partners (supabase/migrations/018_customers.sql).
export type CustomerType = 'individual' | 'corporation'

export interface Customer {
  id: string
  customer_type: CustomerType | string
  name: string
  nik: string | null
  npwp: string | null
  phone: string | null
  email: string | null
  address: string | null
  city: string | null
  is_partner: boolean
  commission_rate: number | null
  owner_id: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

// CRM deals (supabase/migrations/019_deals.sql).
export interface Deal {
  id: string
  pipeline_id: string
  stage_id: string
  customer_id: string | null
  partner_id: string | null
  title: string
  estimated_value: number | null
  expected_pax: number | null
  product_id: string | null
  forecast_close_date: string | null
  owner_id: string | null
  lost_reason: string | null
  created_at: string
  updated_at: string
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

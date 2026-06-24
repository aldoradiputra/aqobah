import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from './supabase'
import type {
  Product,
  AuditEntry,
  BusinessUnit,
  RoomPricing,
  ComponentType,
  ProductComponent,
  InventoryItem,
  ProductBomEntry,
  ActivityEvent,
  ActivityAttachment,
  ProductRequest,
  CrmPipeline,
  CrmPipelineStage,
} from './types'

// Single source of truth for the products query — reused by the Products page
// and the Dashboard KPIs.
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true })
      if (error) throw error
      return (data ?? []) as Product[]
    },
  })
}

// Audit trail — readable only by admin/management (RLS). Reused by the Audit page.
export function useAuditLog(limit = 100) {
  return useQuery({
    queryKey: ['audit_log', limit],
    queryFn: async (): Promise<AuditEntry[]> => {
      const { data, error } = await supabase
        .from('audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return (data ?? []) as AuditEntry[]
    },
  })
}

// Business units (reference) — used by product-configuration selects.
export function useBusinessUnits() {
  return useQuery({
    queryKey: ['business_units'],
    queryFn: async (): Promise<BusinessUnit[]> => {
      const { data, error } = await supabase.from('business_units').select('*').order('sort_order')
      if (error) throw error
      return (data ?? []) as BusinessUnit[]
    },
  })
}

// Create/update a product (RLS allows admin/management/operational to write).
export function useSaveProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { id?: string } & Record<string, unknown>) => {
      const { id, ...fields } = input
      const res = id
        ? await supabase.from('products').update(fields).eq('id', id)
        : await supabase.from('products').insert(fields)
      if (res.error) throw res.error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      qc.invalidateQueries({ queryKey: ['product'] })
      qc.invalidateQueries({ queryKey: ['activity'] })
    },
  })
}

export function useDeleteProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      qc.invalidateQueries({ queryKey: ['product'] })
      qc.invalidateQueries({ queryKey: ['activity'] })
    },
  })
}

// Single product (detail page).
export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    enabled: !!id,
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id!).maybeSingle()
      if (error) throw error
      return (data as Product | null) ?? null
    },
  })
}

// Room-type pricing for a product.
export function useRoomPricing(productId: string | undefined) {
  return useQuery({
    queryKey: ['room_pricing', productId],
    enabled: !!productId,
    queryFn: async (): Promise<RoomPricing[]> => {
      const { data, error } = await supabase
        .from('product_room_pricing')
        .select('*')
        .eq('product_id', productId!)
      if (error) throw error
      return (data ?? []) as RoomPricing[]
    },
  })
}

export function useSaveRoomPricing(productId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (rows: { room_type: string; price: number | null }[]) => {
      const payload = rows.map((r) => ({
        product_id: productId,
        room_type: r.room_type,
        price: r.price,
        currency: 'IDR',
      }))
      const { error } = await supabase
        .from('product_room_pricing')
        .upsert(payload, { onConflict: 'product_id,room_type' })
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['room_pricing', productId] })
      qc.invalidateQueries({ queryKey: ['activity'] })
    },
  })
}

// Component reference taxonomy (komponen keberangkatan).
export function useComponentTypes() {
  return useQuery({
    queryKey: ['component_types'],
    queryFn: async (): Promise<ComponentType[]> => {
      const { data, error } = await supabase.from('component_types').select('*').order('sort_order')
      if (error) throw error
      return (data ?? []) as ComponentType[]
    },
  })
}

// Per-product cost lines (HPP).
export function useProductComponents(productId: string | undefined) {
  return useQuery({
    queryKey: ['product_components', productId],
    enabled: !!productId,
    queryFn: async (): Promise<ProductComponent[]> => {
      const { data, error } = await supabase
        .from('product_components')
        .select('*')
        .eq('product_id', productId!)
        .order('sort_order')
        .order('created_at')
      if (error) throw error
      return (data ?? []) as ProductComponent[]
    },
  })
}

export function useSaveComponent(productId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      id?: string
      component_type_id: string | null
      note: string | null
      qty: number
      unit_cost: number
    }) => {
      const { id, ...fields } = input
      const res = id
        ? await supabase.from('product_components').update(fields).eq('id', id)
        : await supabase.from('product_components').insert({ ...fields, product_id: productId })
      if (res.error) throw res.error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['product_components', productId] })
      qc.invalidateQueries({ queryKey: ['activity'] })
    },
  })
}

export function useDeleteComponent(productId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('product_components').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['product_components', productId] })
      qc.invalidateQueries({ queryKey: ['activity'] })
    },
  })
}

// Inventory items master (read for selects).
export function useInventoryItems() {
  return useQuery({
    queryKey: ['inventory_items'],
    queryFn: async (): Promise<InventoryItem[]> => {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .eq('is_active', true)
        .order('name')
      if (error) throw error
      return (data ?? []) as InventoryItem[]
    },
  })
}

// Per-product inventory BOM (items each jemaah receives, by gender).
export function useProductBom(productId: string | undefined) {
  return useQuery({
    queryKey: ['product_bom', productId],
    enabled: !!productId,
    queryFn: async (): Promise<ProductBomEntry[]> => {
      const { data, error } = await supabase
        .from('product_inventory_bom')
        .select('*')
        .eq('product_id', productId!)
      if (error) throw error
      return (data ?? []) as ProductBomEntry[]
    },
  })
}

export function useSaveBom(productId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { id?: string; inventory_item_id: string; qty_per_pax: number; gender: string }) => {
      const { id, ...fields } = input
      const res = id
        ? await supabase.from('product_inventory_bom').update(fields).eq('id', id)
        : await supabase.from('product_inventory_bom').insert({ ...fields, product_id: productId })
      if (res.error) throw res.error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['product_bom', productId] })
      qc.invalidateQueries({ queryKey: ['activity'] })
    },
  })
}

export function useDeleteBom(productId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('product_inventory_bom').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['product_bom', productId] })
      qc.invalidateQueries({ queryKey: ['activity'] })
    },
  })
}

// Activity feed (per-record comments). Reusable across any entity type.
export function useActivityEvents(entityType: string, entityId: string | undefined) {
  return useQuery({
    queryKey: ['activity', entityType, entityId],
    enabled: !!entityId,
    queryFn: async (): Promise<ActivityEvent[]> => {
      const { data, error } = await supabase
        .from('activity_events')
        .select('*')
        .eq('entity_type', entityType)
        .eq('entity_id', entityId!)
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []) as ActivityEvent[]
    },
  })
}

export function usePostComment(entityType: string, entityId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { body: string; attachments?: ActivityAttachment[] }) => {
      const { body, attachments } = input
      const { error } = await supabase.from('activity_events').insert({
        entity_type: entityType,
        entity_id: entityId,
        event_type: 'comment',
        body,
        metadata: attachments && attachments.length ? { attachments } : {},
      })
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['activity', entityType, entityId] }),
  })
}

export function useDeleteActivity(entityType: string, entityId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('activity_events').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['activity', entityType, entityId] }),
  })
}

// ── Sales → ops product requests ────────────────────────────────────────────
export function useProductRequests() {
  return useQuery({
    queryKey: ['product_requests'],
    queryFn: async (): Promise<ProductRequest[]> => {
      const { data, error } = await supabase
        .from('product_requests')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []) as ProductRequest[]
    },
  })
}

export function useProductRequest(id: string | undefined) {
  return useQuery({
    queryKey: ['product_request', id],
    enabled: !!id,
    queryFn: async (): Promise<ProductRequest | null> => {
      const { data, error } = await supabase.from('product_requests').select('*').eq('id', id!).maybeSingle()
      if (error) throw error
      return (data as ProductRequest | null) ?? null
    },
  })
}

export function useCreateRequest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { type: string; title: string; details: string | null }) => {
      const { error } = await supabase.from('product_requests').insert(input)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['product_requests'] })
      qc.invalidateQueries({ queryKey: ['activity'] })
    },
  })
}

export function useUpdateRequest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { id: string } & Record<string, unknown>) => {
      const { id, ...fields } = input
      const { error } = await supabase.from('product_requests').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['product_requests'] })
      qc.invalidateQueries({ queryKey: ['product_request'] })
      qc.invalidateQueries({ queryKey: ['activity'] })
    },
  })
}

// ── CRM pipelines & stages (config; supabase/migrations/016) ────────────────
export function useCrmPipelines() {
  return useQuery({
    queryKey: ['crm_pipelines'],
    queryFn: async (): Promise<CrmPipeline[]> => {
      const { data, error } = await supabase.from('crm_pipelines').select('*').order('sort_order')
      if (error) throw error
      return (data ?? []) as CrmPipeline[]
    },
  })
}

// All stages across pipelines, grouped client-side by the settings page.
export function useAllPipelineStages() {
  return useQuery({
    queryKey: ['pipeline_stages'],
    queryFn: async (): Promise<CrmPipelineStage[]> => {
      const { data, error } = await supabase
        .from('crm_pipeline_stages')
        .select('*')
        .order('pipeline_id')
        .order('sort_order')
      if (error) throw error
      return (data ?? []) as CrmPipelineStage[]
    },
  })
}

// Stages for one pipeline (used by the deal kanban in 2.4).
export function usePipelineStages(pipelineId: string | undefined) {
  return useQuery({
    queryKey: ['pipeline_stages', pipelineId],
    enabled: !!pipelineId,
    queryFn: async (): Promise<CrmPipelineStage[]> => {
      const { data, error } = await supabase
        .from('crm_pipeline_stages')
        .select('*')
        .eq('pipeline_id', pipelineId!)
        .order('sort_order')
      if (error) throw error
      return (data ?? []) as CrmPipelineStage[]
    },
  })
}

export function useSavePipeline() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { id?: string } & Record<string, unknown>) => {
      const { id, ...fields } = input
      const res = id
        ? await supabase.from('crm_pipelines').update(fields).eq('id', id)
        : await supabase.from('crm_pipelines').insert(fields)
      if (res.error) throw res.error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['crm_pipelines'] }),
  })
}

export function useSaveStage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { id?: string } & Record<string, unknown>) => {
      const { id, ...fields } = input
      const res = id
        ? await supabase.from('crm_pipeline_stages').update(fields).eq('id', id)
        : await supabase.from('crm_pipeline_stages').insert(fields)
      if (res.error) throw res.error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pipeline_stages'] }),
  })
}

export function useDeleteStage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('crm_pipeline_stages').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pipeline_stages'] }),
  })
}

// Persist a new stage ordering (sort_order = position) for a pipeline.
export function useReorderStages() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (rows: { id: string; sort_order: number }[]) => {
      for (const r of rows) {
        const { error } = await supabase
          .from('crm_pipeline_stages')
          .update({ sort_order: r.sort_order })
          .eq('id', r.id)
        if (error) throw error
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pipeline_stages'] }),
  })
}

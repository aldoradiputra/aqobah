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
    onSuccess: () => qc.invalidateQueries({ queryKey: ['room_pricing', productId] }),
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
    onSuccess: () => qc.invalidateQueries({ queryKey: ['product_components', productId] }),
  })
}

export function useDeleteComponent(productId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('product_components').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['product_components', productId] }),
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
    onSuccess: () => qc.invalidateQueries({ queryKey: ['product_bom', productId] }),
  })
}

export function useDeleteBom(productId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('product_inventory_bom').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['product_bom', productId] }),
  })
}

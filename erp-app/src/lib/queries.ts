import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from './supabase'
import type { Product, AuditEntry, BusinessUnit } from './types'

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
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}

export function useDeleteProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}

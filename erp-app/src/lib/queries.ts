import { useQuery } from '@tanstack/react-query'
import { supabase } from './supabase'
import type { Product, AuditEntry } from './types'

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

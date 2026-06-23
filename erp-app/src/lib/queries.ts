import { useQuery } from '@tanstack/react-query'
import { supabase } from './supabase'
import type { Product } from './types'

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

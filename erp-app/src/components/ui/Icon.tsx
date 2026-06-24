import type { CSSProperties } from 'react'
import {
  LayoutDashboard, Users, ShoppingCart, Package, ClipboardCheck, Wallet, UserCog,
  Search, Bell, LogOut, CircleAlert, Plus, TrendingUp, Building2, Boxes, Truck,
  FileText, Settings, ChevronRight, ChevronDown, Loader2, Star, List, LayoutGrid, Inbox,
  type LucideIcon,
} from 'lucide-react'

// Curated icon registry (explicit imports keep the bundle tree-shakeable).
// Extend this as new modules need more glyphs.
const REGISTRY: Record<string, LucideIcon> = {
  LayoutDashboard, Users, ShoppingCart, Package, ClipboardCheck, Wallet, UserCog,
  Search, Bell, LogOut, CircleAlert, Plus, TrendingUp, Building2, Boxes, Truck,
  FileText, Settings, ChevronRight, ChevronDown, Loader2, Star, List, LayoutGrid, Inbox,
}

export function Icon({
  name,
  size = 18,
  color,
  strokeWidth = 1.8,
  style,
}: {
  name: string
  size?: number
  color?: string
  strokeWidth?: number
  style?: CSSProperties
}) {
  const Cmp = REGISTRY[name]
  if (!Cmp) return null
  return <Cmp size={size} color={color} strokeWidth={strokeWidth} style={{ flexShrink: 0, ...style }} />
}

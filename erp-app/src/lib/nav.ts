// Navigation + per-module metadata, shared by the shell and placeholder pages.
export interface NavItem {
  key: string
  label: string
  icon: string
  to: string
}

export const ERP_NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', to: '/' },
  { key: 'crm', label: 'CRM', icon: 'Users', to: '/crm' },
  { key: 'sales', label: 'Sales Order', icon: 'ShoppingCart', to: '/sales' },
  { key: 'products', label: 'Produk', icon: 'Package', to: '/products' },
  { key: 'ops', label: 'Operasional', icon: 'ClipboardCheck', to: '/ops' },
  { key: 'finance', label: 'Keuangan', icon: 'Wallet', to: '/finance' },
  { key: 'hr', label: 'SDM / HR', icon: 'UserCog', to: '/hr' },
]

export const MODULE_META: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Ringkasan operasional · semua unit bisnis' },
  crm: { title: 'CRM', subtitle: 'Pipeline jamaah & klien korporat' },
  sales: { title: 'Sales Order', subtitle: 'Pesanan paket & pembayaran' },
  products: { title: 'Produk', subtitle: 'Manajemen paket & kuota' },
  ops: { title: 'Operasional', subtitle: 'Dokumen, manasik & vendor' },
  finance: { title: 'Keuangan', subtitle: 'Akuntansi & arus kas' },
  hr: { title: 'SDM / HR', subtitle: 'Karyawan & tim lapangan' },
}

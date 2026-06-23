import { useProducts } from '../lib/queries'
import { DataTable, Pill, Progress, Panel } from '../components/ui'
import type { Column, PillTone } from '../components/ui'
import type { Product } from '../lib/types'

const UNIT_TONE: Record<string, PillTone> = {
  Umrah: 'blue',
  'Haji Khusus': 'seal',
  'Wisata Halal': 'gold',
  B2B: 'neutral',
}

const columns: Column<Product>[] = [
  { key: 'name', label: 'Paket', render: (r) => <span style={{ fontWeight: 600 }}>{r.name}</span> },
  { key: 'unit', label: 'Unit', render: (r) => <Pill tone={UNIT_TONE[r.unit] ?? 'neutral'}>{r.unit}</Pill> },
  { key: 'duration', label: 'Durasi', render: (r) => r.duration ?? '—' },
  { key: 'price_display', label: 'Harga', render: (r) => r.price_display ?? '—' },
  {
    key: 'cap',
    label: 'Kuota',
    render: (r) => (
      <div style={{ minWidth: 140 }}>
        <div style={{ fontSize: 12, marginBottom: 4, color: 'var(--text-secondary)' }}>
          {r.sold ?? 0}/{r.cap ?? 0}
        </div>
        <Progress value={r.sold ?? 0} max={r.cap ?? 0} />
      </div>
    ),
  },
  {
    key: 'is_published',
    label: 'Status',
    render: (r) => (r.is_published ? <Pill tone="green">Terbit</Pill> : <Pill tone="neutral">Draft</Pill>),
  },
]

export function ProductsPage() {
  const { data: products = [], isLoading, isError, error } = useProducts()

  return (
    <Panel
      title="Katalog Produk"
      noPad
      action={<span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{products.length} paket</span>}
    >
      {isLoading && <div style={{ padding: 24, color: 'var(--text-muted)', fontSize: 14 }}>Memuat produk…</div>}
      {isError && (
        <div style={{ padding: 24, color: 'var(--danger-500)', fontSize: 14 }}>
          Gagal memuat: {(error as Error)?.message}
        </div>
      )}
      {!isLoading && !isError && <DataTable columns={columns} rows={products} />}
    </Panel>
  )
}

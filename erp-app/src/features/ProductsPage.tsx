import { useMemo, useState } from 'react'
import { useProducts } from '../lib/queries'
import { DataTable, Pill, Progress, Panel } from '../components/ui'
import type { Column, PillTone } from '../components/ui'
import { FilterBar, KanbanBoard } from '../components/data-view'
import type { SelectFilter } from '../components/data-view'
import type { Product } from '../lib/types'

const UNITS = ['Umrah', 'Haji Khusus', 'Wisata Halal', 'B2B']
const UNIT_TONE: Record<string, PillTone> = {
  Umrah: 'blue',
  'Haji Khusus': 'seal',
  'Wisata Halal': 'gold',
  B2B: 'neutral',
}
const UNIT_ACCENT: Record<string, string> = {
  Umrah: 'var(--blue-500)',
  'Haji Khusus': 'var(--maroon-500)',
  'Wisata Halal': 'var(--gold-400)',
  B2B: 'var(--indigo-500)',
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
  const [search, setSearch] = useState('')
  const [unit, setUnit] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('default')
  const [view, setView] = useState<'list' | 'kanban'>('list')

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (unit !== 'all' && p.unit !== unit) return false
      if (status === 'published' && !p.is_published) return false
      if (status === 'draft' && p.is_published) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'sold') list = [...list].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))
    return list
  }, [products, unit, status, search, sort])

  const filters: SelectFilter[] = [
    {
      key: 'unit',
      label: 'Unit',
      value: unit,
      onChange: setUnit,
      options: [{ value: 'all', label: 'Semua' }, ...UNITS.map((u) => ({ value: u, label: u }))],
    },
    {
      key: 'status',
      label: 'Status',
      value: status,
      onChange: setStatus,
      options: [
        { value: 'all', label: 'Semua' },
        { value: 'published', label: 'Terbit' },
        { value: 'draft', label: 'Draft' },
      ],
    },
  ]
  const sortFilter: SelectFilter = {
    key: 'sort',
    label: 'Urutkan',
    value: sort,
    onChange: setSort,
    options: [
      { value: 'default', label: 'Default' },
      { value: 'name', label: 'Nama' },
      { value: 'sold', label: 'Terjual' },
    ],
  }

  return (
    <Panel
      title="Katalog Produk"
      noPad
      action={
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {filtered.length} / {products.length} paket
        </span>
      }
    >
      <div style={{ padding: '16px 20px 0' }}>
        <FilterBar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Cari paket…"
          filters={filters}
          sort={sortFilter}
          view={view}
          onView={setView}
        />
        {isLoading && <div style={{ color: 'var(--text-muted)', fontSize: 14, paddingBottom: 20 }}>Memuat produk…</div>}
        {isError && (
          <div style={{ color: 'var(--danger-500)', fontSize: 14, paddingBottom: 20 }}>
            Gagal memuat: {(error as Error)?.message}
          </div>
        )}
        {!isLoading && !isError && filtered.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: 14, paddingBottom: 20 }}>Tidak ada paket cocok.</div>
        )}
      </div>

      {!isLoading && !isError && view === 'kanban' && filtered.length > 0 && (
        <div style={{ padding: '0 20px 20px' }}>
          <KanbanBoard
            items={filtered}
            groupBy={(p) => p.unit}
            groups={UNITS.map((u) => ({ key: u, label: u, accent: UNIT_ACCENT[u] }))}
            renderCard={(p) => (
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  {p.price_display ?? '—'}
                </div>
                <Progress value={p.sold ?? 0} max={p.cap ?? 0} />
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  {p.sold ?? 0}/{p.cap ?? 0} kursi
                </div>
              </div>
            )}
          />
        </div>
      )}

      {!isLoading && !isError && view === 'list' && filtered.length > 0 && (
        <DataTable columns={columns} rows={filtered} />
      )}
    </Panel>
  )
}

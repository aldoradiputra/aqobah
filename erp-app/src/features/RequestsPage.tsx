import { useMemo, useState, type CSSProperties, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useProductRequests, useCreateRequest } from '../lib/queries'
import { DataTable, Pill, Panel } from '../components/ui'
import type { Column, PillTone } from '../components/ui'
import { FilterBar } from '../components/data-view'
import type { SelectFilter } from '../components/data-view'
import type { ProductRequest } from '../lib/types'

const TYPE_LABEL: Record<string, string> = { custom_product: 'Produk Custom', estimation: 'Estimasi' }
const STATUS_LABEL: Record<string, string> = { open: 'Terbuka', in_progress: 'Diproses', done: 'Selesai', rejected: 'Ditolak' }
const STATUS_TONE: Record<string, PillTone> = { open: 'blue', in_progress: 'amber', done: 'green', rejected: 'red' }

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const columns: Column<ProductRequest>[] = [
  {
    key: 'title',
    label: 'Judul',
    render: (r) => (
      <Link to={`/requests/${r.id}`} style={{ fontWeight: 600, color: 'var(--text-link)', textDecoration: 'none' }}>
        {r.title}
      </Link>
    ),
  },
  { key: 'type', label: 'Tipe', render: (r) => <Pill tone="neutral">{TYPE_LABEL[r.type] ?? r.type}</Pill> },
  { key: 'status', label: 'Status', render: (r) => <Pill tone={STATUS_TONE[r.status] ?? 'neutral'}>{STATUS_LABEL[r.status] ?? r.status}</Pill> },
  { key: 'requested_by_email', label: 'Peminta', render: (r) => r.requested_by_email ?? '—' },
  { key: 'created_at', label: 'Dibuat', render: (r) => fmtDate(r.created_at) },
]

export function RequestsPage() {
  const { data: requests = [], isLoading, isError, error } = useProductRequests()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [type, setType] = useState('all')
  const [creating, setCreating] = useState(false)

  const filtered = useMemo(
    () =>
      requests.filter((r) => {
        if (status !== 'all' && r.status !== status) return false
        if (type !== 'all' && r.type !== type) return false
        if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false
        return true
      }),
    [requests, status, type, search],
  )

  const filters: SelectFilter[] = [
    {
      key: 'status',
      label: 'Status',
      value: status,
      onChange: setStatus,
      options: [{ value: 'all', label: 'Semua' }, ...Object.entries(STATUS_LABEL).map(([v, l]) => ({ value: v, label: l }))],
    },
    {
      key: 'type',
      label: 'Tipe',
      value: type,
      onChange: setType,
      options: [{ value: 'all', label: 'Semua' }, ...Object.entries(TYPE_LABEL).map(([v, l]) => ({ value: v, label: l }))],
    },
  ]

  return (
    <Panel
      title="Permintaan Produk"
      noPad
      action={<span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} / {requests.length}</span>}
    >
      <div style={{ padding: '16px 20px 0' }}>
        <FilterBar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Cari judul…"
          filters={filters}
          right={
            <button className="btn-primary" onClick={() => setCreating(true)}>
              + Permintaan Baru
            </button>
          }
        />
        {isLoading && <div style={{ color: 'var(--text-muted)', fontSize: 14, paddingBottom: 20 }}>Memuat…</div>}
        {isError && (
          <div style={{ color: 'var(--danger-500)', fontSize: 14, paddingBottom: 20 }}>Gagal memuat: {(error as Error)?.message}</div>
        )}
        {!isLoading && !isError && filtered.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: 14, paddingBottom: 20 }}>Belum ada permintaan.</div>
        )}
      </div>
      {!isLoading && !isError && filtered.length > 0 && <DataTable columns={columns} rows={filtered} />}

      {creating && <RequestModal onClose={() => setCreating(false)} />}
    </Panel>
  )
}

function RequestModal({ onClose }: { onClose: () => void }) {
  const create = useCreateRequest()
  const [type, setType] = useState('estimation')
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await create.mutateAsync({ type, title: title.trim(), details: details.trim() || null })
      onClose()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 14 }}>Permintaan Baru</h2>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={lbl}>
            Tipe
            <select style={inp} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="estimation">Estimasi</option>
              <option value="custom_product">Produk Custom</option>
            </select>
          </label>
          <label style={lbl}>
            Judul
            <input style={inp} value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="mis. Umroh plus Aqsa 14 hari" />
          </label>
          <label style={lbl}>
            Detail
            <textarea
              style={{ ...inp, minHeight: 90, resize: 'vertical' }}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Kebutuhan, estimasi pax, tanggal, dll."
            />
          </label>
          {error && <div style={{ color: 'var(--danger-500)', fontSize: 13 }}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
            <button type="button" className="btn-ghost" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary" disabled={create.isPending || !title.trim()}>
              {create.isPending ? 'Menyimpan…' : 'Kirim Permintaan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const overlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15,29,43,0.5)',
  display: 'grid',
  placeItems: 'center',
  padding: 20,
  zIndex: 50,
}
const sheet: CSSProperties = {
  width: '100%',
  maxWidth: 480,
  background: 'var(--surface-card)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-xl)',
  padding: 22,
}
const lbl: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }
const inp: CSSProperties = {
  padding: '9px 11px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-default)',
  fontFamily: 'var(--font-ui)',
  fontSize: 14,
  color: 'var(--text-primary)',
  outline: 'none',
  background: 'var(--surface-card)',
}

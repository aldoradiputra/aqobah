import { useState, type CSSProperties, type FormEvent } from 'react'
import { useActivityEvents, usePostComment, useDeleteActivity } from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import { Panel, Icon } from '../ui'
import type { ActivityEvent } from '../../lib/types'

function initialsOf(s: string | null): string {
  if (!s) return 'AQ'
  return (
    s
      .split(/[\s@._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((x) => x[0]?.toUpperCase() ?? '')
      .join('') || 'AQ'
  )
}

function fmt(ts: string): string {
  return new Date(ts).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
}

// ── System-event change formatting ──────────────────────────────────────────
// Friendly labels per (source_table, column); presentation lives here so the DB
// trigger (013) can stay generic.
const FIELD_LABELS: Record<string, Record<string, string>> = {
  products: {
    name: 'Nama', product_code: 'Kode', departure_date: 'Keberangkatan', return_date: 'Kepulangan',
    price_display: 'Harga tampilan', hotel_stars: 'Bintang hotel', cap: 'Kuota', sold: 'Terjual',
    is_published: 'Status', unit: 'Unit', duration: 'Durasi', facilities: 'Fasilitas', rating: 'Rating',
  },
  product_room_pricing: { price: 'Harga' },
  product_components: { qty: 'Qty', unit_cost: 'Biaya satuan', note: 'Catatan', component_type_id: 'Jenis komponen' },
  product_inventory_bom: { qty_per_pax: 'Qty/pax', gender: 'Gender', inventory_item_id: 'Item' },
  product_requests: { status: 'Status', assigned_to: 'Ditugaskan', title: 'Judul', details: 'Detail', type: 'Tipe' },
}
const MONEY_FIELDS = new Set(['price', 'unit_cost'])
const DATE_FIELDS = new Set(['departure_date', 'return_date'])
const UUID_FIELDS = new Set(['component_type_id', 'inventory_item_id', 'assigned_to'])
const ENUM_MAPS: Record<string, Record<string, string>> = {
  status: { open: 'Terbuka', in_progress: 'Diproses', done: 'Selesai', rejected: 'Ditolak' },
  gender: { male: 'Pria', female: 'Wanita', all: 'Semua', unisex: 'Unisex' },
  type: { custom_product: 'Produk Custom', estimation: 'Estimasi' },
}

function fmtValue(field: string, v: unknown): string {
  if (v === null || v === undefined || v === '') return '—'
  if (field === 'is_published') return v ? 'Terbit' : 'Draft'
  if (typeof v === 'boolean') return v ? 'Ya' : 'Tidak'
  if (MONEY_FIELDS.has(field)) return 'Rp' + Number(v).toLocaleString('id-ID')
  if (DATE_FIELDS.has(field)) return new Date(String(v)).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  if (ENUM_MAPS[field]) return ENUM_MAPS[field][String(v)] ?? String(v)
  return String(v)
}

function ChangeList({ src, changes }: { src: string; changes: Record<string, { old: unknown; new: unknown }> }) {
  const labels = FIELD_LABELS[src] ?? {}
  const entries = Object.entries(changes)
  if (entries.length === 0) return null
  return (
    <ul style={{ margin: '5px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {entries.map(([field, ch]) => {
        const label = labels[field] ?? field
        return (
          <li key={field} style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {UUID_FIELDS.has(field) ? (
              <>{label} diperbarui</>
            ) : (
              <>
                {label}:{' '}
                <span style={{ textDecoration: 'line-through' }}>{fmtValue(field, ch.old)}</span>
                {' → '}
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{fmtValue(field, ch.new)}</span>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function SystemEvent({ ev }: { ev: ActivityEvent }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <div
        style={{
          width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: 'var(--surface-sunken)', color: 'var(--text-muted)', flexShrink: 0,
        }}
      >
        <Icon name="Settings" size={13} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 600 }}>{ev.actor_email ?? 'Sistem'}</span> {ev.body}
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{fmt(ev.created_at)}</span>
        </div>
        {ev.metadata?.changes && <ChangeList src={ev.metadata.source_table ?? ''} changes={ev.metadata.changes} />}
      </div>
    </div>
  )
}

// Reusable per-record activity feed. Drop it on any record:
//   <ActivityFeed entityType="product" entityId={id} />
export function ActivityFeed({ entityType, entityId }: { entityType: string; entityId: string }) {
  const { user, role } = useSession()
  const { data: events = [], isLoading } = useActivityEvents(entityType, entityId)
  const post = usePostComment(entityType, entityId)
  const del = useDeleteActivity(entityType, entityId)
  const [text, setText] = useState('')

  async function submit(e: FormEvent) {
    e.preventDefault()
    const body = text.trim()
    if (!body) return
    try {
      await post.mutateAsync(body)
      setText('')
    } catch (err) {
      alert((err as Error).message)
    }
  }

  return (
    <Panel title="Aktivitas & Komentar">
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: events.length ? 18 : 4 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tulis komentar…"
          style={inputStyle}
        />
        <button type="submit" className="btn-primary" disabled={post.isPending || !text.trim()}>
          Kirim
        </button>
      </form>

      {isLoading && <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Memuat…</div>}
      {!isLoading && events.length === 0 && (
        <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Belum ada aktivitas. Mulai diskusi.</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {events.map((ev) => {
          if (ev.event_type === 'system') return <SystemEvent key={ev.id} ev={ev} />
          const canDelete = ev.actor_id === user?.id || role === 'admin'
          return (
            <div key={ev.id} style={{ display: 'flex', gap: 10 }}>
              <div
                className="avatar"
                style={{ width: 30, height: 30, background: 'var(--surface-sunken)', color: 'var(--text-secondary)', fontSize: 11 }}
              >
                {initialsOf(ev.actor_email)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{ev.actor_email ?? 'Sistem'}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{fmt(ev.created_at)}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {ev.body}
                </div>
                {canDelete && (
                  <button
                    onClick={() => del.mutateAsync(ev.id)}
                    style={{ fontSize: 11, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 2 }}
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

const inputStyle: CSSProperties = {
  flex: 1,
  padding: '9px 12px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-default)',
  fontFamily: 'var(--font-ui)',
  fontSize: 14,
  color: 'var(--text-primary)',
  outline: 'none',
}

import { useState, useEffect, useRef, type CSSProperties, type FormEvent, type ChangeEvent } from 'react'
import { useActivityEvents, usePostComment, useDeleteActivity } from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import { Panel, Icon } from '../ui'
import type { ActivityEvent, ActivityAttachment } from '../../lib/types'
import {
  uploadActivityAttachments,
  signedAttachmentUrl,
  isImageAttachment,
  formatBytes,
  MAX_ATTACHMENT_BYTES,
} from '../../lib/storage'

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
  customers: {
    name: 'Nama', customer_type: 'Tipe', nik: 'NIK', npwp: 'NPWP', phone: 'Telepon', email: 'Email',
    address: 'Alamat', city: 'Kota', is_partner: 'Mitra', commission_rate: 'Komisi (%)', owner_id: 'Pemilik', notes: 'Catatan',
  },
}
const MONEY_FIELDS = new Set(['price', 'unit_cost'])
const DATE_FIELDS = new Set(['departure_date', 'return_date'])
const UUID_FIELDS = new Set(['component_type_id', 'inventory_item_id', 'assigned_to', 'owner_id'])
const ENUM_MAPS: Record<string, Record<string, string>> = {
  status: { open: 'Terbuka', in_progress: 'Diproses', done: 'Selesai', rejected: 'Ditolak' },
  gender: { male: 'Pria', female: 'Wanita', all: 'Semua', unisex: 'Unisex' },
  type: { custom_product: 'Produk Custom', estimation: 'Estimasi' },
  customer_type: { individual: 'Individu', corporation: 'Korporasi' },
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

// ── Attachment rendering ────────────────────────────────────────────────────
// Files live in a private bucket; every view fetches a fresh 60 s signed URL.
function AttachmentThumb({ att }: { att: ActivityAttachment }) {
  const [url, setUrl] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let alive = true
    signedAttachmentUrl(att.path)
      .then((u) => alive && setUrl(u))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [att.path])

  if (failed) return <AttachmentChip att={att} />
  return (
    <button
      type="button"
      onClick={() => url && window.open(url, '_blank', 'noopener')}
      title={att.name}
      style={{
        padding: 0, width: 96, height: 96, overflow: 'hidden', cursor: url ? 'pointer' : 'default',
        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--surface-sunken)',
      }}
    >
      {url ? (
        <img src={url} alt={att.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <span style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: 'var(--text-muted)', fontSize: 11 }}>…</span>
      )}
    </button>
  )
}

function AttachmentChip({ att }: { att: ActivityAttachment }) {
  const [loading, setLoading] = useState(false)
  async function open() {
    setLoading(true)
    try {
      const u = await signedAttachmentUrl(att.path)
      window.open(u, '_blank', 'noopener')
    } catch (e) {
      alert((e as Error).message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <button
      type="button"
      onClick={open}
      disabled={loading}
      title={att.name}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 9px', maxWidth: 240,
        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--surface-sunken)',
        cursor: 'pointer', fontSize: 12, color: 'var(--text-secondary)',
      }}
    >
      <Icon name="Paperclip" size={13} />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{att.name}</span>
      <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{formatBytes(att.size)}</span>
    </button>
  )
}

function AttachmentList({ attachments }: { attachments: ActivityAttachment[] }) {
  if (!attachments.length) return null
  const images = attachments.filter(isImageAttachment)
  const files = attachments.filter((a) => !isImageAttachment(a))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
      {images.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {images.map((a) => (
            <AttachmentThumb key={a.path} att={a} />
          ))}
        </div>
      )}
      {files.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {files.map((a) => (
            <AttachmentChip key={a.path} att={a} />
          ))}
        </div>
      )}
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
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const busy = uploading || post.isPending

  function onPickFiles(e: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? [])
    const tooBig = picked.find((f) => f.size > MAX_ATTACHMENT_BYTES)
    if (tooBig) alert(`"${tooBig.name}" melebihi batas 10 MB.`)
    const ok = picked.filter((f) => f.size <= MAX_ATTACHMENT_BYTES)
    if (ok.length) setFiles((prev) => [...prev, ...ok])
    e.target.value = '' // allow re-picking the same file
  }

  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    const body = text.trim()
    if (!body && files.length === 0) return
    setUploading(true)
    try {
      const attachments = files.length ? await uploadActivityAttachments(entityType, entityId, files) : []
      await post.mutateAsync({ body, attachments })
      setText('')
      setFiles([])
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Panel title="Aktivitas & Komentar">
      <form onSubmit={submit} style={{ marginBottom: events.length ? 18 : 4 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tulis komentar…"
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
            title="Lampirkan berkas"
            style={iconBtnStyle}
          >
            <Icon name="Paperclip" size={16} />
          </button>
          <button type="submit" className="btn-primary" disabled={busy || (!text.trim() && files.length === 0)}>
            {uploading ? 'Mengunggah…' : 'Kirim'}
          </button>
        </div>
        <input ref={fileInputRef} type="file" multiple onChange={onPickFiles} style={{ display: 'none' }} />
        {files.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {files.map((f, i) => (
              <span key={i} style={pendingChipStyle}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>{f.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>{formatBytes(f.size)}</span>
                <button type="button" onClick={() => removeFile(i)} aria-label="Hapus lampiran" style={removeBtnStyle}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </form>

      {isLoading && <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Memuat…</div>}
      {!isLoading && events.length === 0 && (
        <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Belum ada aktivitas. Mulai diskusi.</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {events.map((ev) => {
          if (ev.event_type === 'system') return <SystemEvent key={ev.id} ev={ev} />
          const canDelete = ev.actor_id === user?.id || role === 'admin'
          const attachments = ev.metadata?.attachments ?? []
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
                {ev.body && (
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {ev.body}
                  </div>
                )}
                {attachments.length > 0 && <AttachmentList attachments={attachments} />}
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

const iconBtnStyle: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: 38,
  padding: 0,
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-default)',
  background: 'var(--surface-sunken)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  flexShrink: 0,
}

const pendingChipStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 8px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-default)',
  background: 'var(--surface-sunken)',
  fontSize: 12,
  color: 'var(--text-secondary)',
}

const removeBtnStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-muted)',
  fontSize: 15,
  lineHeight: 1,
  padding: 0,
}

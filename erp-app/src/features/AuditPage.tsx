import { useAuditLog } from '../lib/queries'
import { DataTable, Pill, Panel } from '../components/ui'
import type { Column, PillTone } from '../components/ui'
import type { AuditEntry } from '../lib/types'

const ACTION_TONE: Record<string, PillTone> = { INSERT: 'green', UPDATE: 'blue', DELETE: 'red' }
const ACTION_LABEL: Record<string, string> = { INSERT: 'Dibuat', UPDATE: 'Diubah', DELETE: 'Dihapus' }
const ENTITY_LABEL: Record<string, string> = {
  products: 'Produk',
  profiles: 'Pengguna',
  audit_log: 'Audit',
}

// Summarize which fields changed on an UPDATE (ignoring the bookkeeping column).
function changedFields(e: AuditEntry): string {
  if (e.action !== 'UPDATE') return '—'
  const oldD = (e.old_data ?? {}) as Record<string, unknown>
  const newD = (e.new_data ?? {}) as Record<string, unknown>
  const keys = new Set([...Object.keys(oldD), ...Object.keys(newD)])
  const changed: string[] = []
  keys.forEach((k) => {
    if (k === 'updated_at') return
    if (JSON.stringify(oldD[k]) !== JSON.stringify(newD[k])) changed.push(k)
  })
  return changed.length ? changed.join(', ') : '—'
}

function fmt(ts: string): string {
  return new Date(ts).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
}

const columns: Column<AuditEntry>[] = [
  { key: 'created_at', label: 'Waktu', render: (r) => <span style={{ whiteSpace: 'nowrap' }}>{fmt(r.created_at)}</span> },
  {
    key: 'actor_email',
    label: 'Aktor',
    render: (r) => r.actor_email ?? <span style={{ color: 'var(--text-muted)' }}>Sistem</span>,
  },
  {
    key: 'action',
    label: 'Aksi',
    render: (r) => <Pill tone={ACTION_TONE[r.action] ?? 'neutral'}>{ACTION_LABEL[r.action] ?? r.action}</Pill>,
  },
  { key: 'entity_type', label: 'Entitas', render: (r) => ENTITY_LABEL[r.entity_type] ?? r.entity_type },
  {
    key: 'changed',
    label: 'Perubahan',
    wrap: true,
    render: (r) => <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{changedFields(r)}</span>,
  },
]

export function AuditPage() {
  const { data: entries = [], isLoading, isError, error } = useAuditLog(150)

  return (
    <Panel
      title="Audit Trail"
      noPad
      action={<span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{entries.length} entri terbaru</span>}
    >
      {isLoading && <div style={{ padding: 24, color: 'var(--text-muted)', fontSize: 14 }}>Memuat…</div>}
      {isError && (
        <div style={{ padding: 24, color: 'var(--danger-500)', fontSize: 14 }}>
          Gagal memuat: {(error as Error)?.message}
        </div>
      )}
      {!isLoading && !isError && entries.length === 0 && (
        <div style={{ padding: 24, color: 'var(--text-muted)', fontSize: 14 }}>Belum ada aktivitas tercatat.</div>
      )}
      {!isLoading && !isError && entries.length > 0 && <DataTable columns={columns} rows={entries} />}
    </Panel>
  )
}

import { Link, useParams } from 'react-router-dom'
import { useProductRequest, useUpdateRequest } from '../lib/queries'
import { useSession } from '../auth/SessionProvider'
import { Panel, Pill, Icon } from '../components/ui'
import type { PillTone } from '../components/ui'
import { ActivityFeed } from '../components/activity/ActivityFeed'

const CONFIG_ROLES = ['admin', 'management', 'operational']
const TYPE_LABEL: Record<string, string> = { custom_product: 'Produk Custom', estimation: 'Estimasi' }
const STATUS_LABEL: Record<string, string> = { open: 'Terbuka', in_progress: 'Diproses', done: 'Selesai', rejected: 'Ditolak' }
const STATUS_TONE: Record<string, PillTone> = { open: 'blue', in_progress: 'amber', done: 'green', rejected: 'red' }
const STATUSES = ['open', 'in_progress', 'done', 'rejected']

function fmt(ts: string): string {
  return new Date(ts).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
}

export function RequestDetailPage() {
  const { id } = useParams()
  const { data: req, isLoading, isError } = useProductRequest(id)
  const { user, role } = useSession()
  const update = useUpdateRequest()
  const canHandle = role != null && CONFIG_ROLES.includes(role)

  if (isLoading) return <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Memuat…</div>
  if (isError || !req) return <div style={{ color: 'var(--danger-500)', fontSize: 14 }}>Permintaan tidak ditemukan.</div>

  const assignedToMe = req.assigned_to === user?.id

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 820 }}>
      <Link
        to="/requests"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-link)', textDecoration: 'none' }}
      >
        <Icon name="ChevronRight" size={14} style={{ transform: 'rotate(180deg)' }} /> Kembali ke daftar
      </Link>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem' }}>{req.title}</h1>
          <Pill tone={STATUS_TONE[req.status] ?? 'neutral'}>{STATUS_LABEL[req.status] ?? req.status}</Pill>
          <Pill tone="neutral">{TYPE_LABEL[req.type] ?? req.type}</Pill>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
          Diminta oleh {req.requested_by_email ?? '—'} · {fmt(req.created_at)}
        </div>
      </div>

      <Panel title="Detail Permintaan">
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
          {req.details || <span style={{ color: 'var(--text-muted)' }}>Tidak ada detail.</span>}
        </div>
        {canHandle && (
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Ubah status</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => update.mutate({ id: req.id, status: s })}
                  disabled={update.isPending}
                  className={s === req.status ? 'btn-primary' : 'btn-ghost'}
                  style={{ padding: '6px 12px' }}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <button
                className="btn-ghost"
                disabled={update.isPending || assignedToMe}
                onClick={() => update.mutate({ id: req.id, assigned_to: user?.id })}
              >
                {assignedToMe ? 'Ditugaskan ke Anda' : 'Tugaskan ke saya'}
              </button>
              {req.assigned_to && !assignedToMe && (
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sudah ditugaskan ke staf lain.</span>
              )}
            </div>
          </div>
        )}
      </Panel>

      <ActivityFeed entityType="product_request" entityId={req.id} />
    </div>
  )
}

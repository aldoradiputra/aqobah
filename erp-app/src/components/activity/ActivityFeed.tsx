import { useState, type CSSProperties, type FormEvent } from 'react'
import { useActivityEvents, usePostComment, useDeleteActivity } from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import { Panel } from '../ui'

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

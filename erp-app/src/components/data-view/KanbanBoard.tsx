import type { ReactNode } from 'react'

export interface KanbanGroup {
  key: string
  label: string
  accent?: string
}

// Generic read-only kanban: groups items into columns by a key. Drag-and-drop
// (dnd-kit) will be layered on in the CRM phase where reordering matters.
export function KanbanBoard<T>({
  items,
  groupBy,
  groups,
  renderCard,
}: {
  items: T[]
  groupBy: (item: T) => string
  groups: KanbanGroup[]
  renderCard: (item: T) => ReactNode
}) {
  return (
    <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, alignItems: 'flex-start' }}>
      {groups.map((g) => {
        const groupItems = items.filter((it) => groupBy(it) === g.key)
        return (
          <div
            key={g.key}
            style={{
              flex: '0 0 280px',
              width: 280,
              background: 'var(--surface-sunken)',
              borderRadius: 'var(--radius-lg)',
              padding: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px 12px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: g.accent ?? 'var(--brand-primary)' }} />
              <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{g.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                {groupItems.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {groupItems.map((it, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 12,
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  {renderCard(it)}
                </div>
              ))}
              {groupItems.length === 0 && (
                <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: '8px 6px' }}>—</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

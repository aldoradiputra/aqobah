import { type CSSProperties, type ReactNode } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core'

export interface KanbanGroup {
  key: string
  label: string
  accent?: string
}

interface BoardProps<T> {
  items: T[]
  groupBy: (item: T) => string
  groups: KanbanGroup[]
  renderCard: (item: T) => ReactNode
  // When provided, cards become draggable between columns; onMove fires with the
  // dragged item's id and the destination group key. Omit for a read-only board.
  onMove?: (itemId: string, toGroupKey: string) => void
  getId?: (item: T) => string
}

// Generic kanban: groups items into columns by a key. Read-only by default;
// pass `onMove` to enable dnd-kit drag-and-drop between columns.
export function KanbanBoard<T>(props: BoardProps<T>) {
  return props.onMove ? <DndBoard {...props} /> : <ReadOnlyBoard {...props} />
}

function ColumnShell({
  group,
  count,
  children,
  setRef,
  highlight,
}: {
  group: KanbanGroup
  count: number
  children: ReactNode
  setRef?: (el: HTMLElement | null) => void
  highlight?: boolean
}) {
  return (
    <div
      ref={setRef}
      style={{
        flex: '0 0 280px',
        width: 280,
        background: 'var(--surface-sunken)',
        borderRadius: 'var(--radius-lg)',
        padding: 12,
        outline: highlight ? '2px dashed var(--brand-primary)' : '2px solid transparent',
        transition: 'outline-color 120ms',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px 12px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: group.accent ?? 'var(--brand-primary)' }} />
        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{group.label}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{count}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 8 }}>{children}</div>
    </div>
  )
}

function ReadOnlyBoard<T>({ items, groupBy, groups, renderCard }: BoardProps<T>) {
  return (
    <div style={rowStyle}>
      {groups.map((g) => {
        const gi = items.filter((it) => groupBy(it) === g.key)
        return (
          <ColumnShell key={g.key} group={g} count={gi.length}>
            {gi.map((it, i) => (
              <div key={i} style={cardStyle}>
                {renderCard(it)}
              </div>
            ))}
            {gi.length === 0 && <Empty />}
          </ColumnShell>
        )
      })}
    </div>
  )
}

function DndBoard<T>({ items, groupBy, groups, renderCard, onMove, getId }: BoardProps<T>) {
  const idOf = getId ?? ((it: T) => String((it as { id?: unknown }).id ?? ''))
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function onDragEnd(e: DragEndEvent) {
    const itemId = String(e.active.id)
    const to = e.over ? String(e.over.id) : undefined
    if (!to) return
    const item = items.find((it) => idOf(it) === itemId)
    if (item && groupBy(item) !== to) onMove!(itemId, to)
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div style={rowStyle}>
        {groups.map((g) => {
          const gi = items.filter((it) => groupBy(it) === g.key)
          return (
            <DroppableColumn key={g.key} group={g} count={gi.length}>
              {gi.map((it) => (
                <DraggableCard key={idOf(it)} id={idOf(it)}>
                  {renderCard(it)}
                </DraggableCard>
              ))}
              {gi.length === 0 && <Empty />}
            </DroppableColumn>
          )
        })}
      </div>
    </DndContext>
  )
}

function DroppableColumn({ group, count, children }: { group: KanbanGroup; count: number; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: group.key })
  return (
    <ColumnShell group={group} count={count} setRef={setNodeRef} highlight={isOver}>
      {children}
    </ColumnShell>
  )
}

function DraggableCard({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...cardStyle,
        cursor: 'grab',
        touchAction: 'none',
        opacity: isDragging ? 0.4 : 1,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
    >
      {children}
    </div>
  )
}

function Empty() {
  return <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: '8px 6px' }}>—</div>
}

const rowStyle: CSSProperties = { display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, alignItems: 'flex-start' }
const cardStyle: CSSProperties = {
  background: 'var(--surface-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-md)',
  padding: 12,
  boxShadow: 'var(--shadow-xs)',
}

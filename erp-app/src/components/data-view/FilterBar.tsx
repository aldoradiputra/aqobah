import type { CSSProperties, ReactNode } from 'react'
import { Icon } from '../ui/Icon'

// A reusable select-style filter (also used for the sort control).
export interface SelectFilter {
  key: string
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}

const selectStyle: CSSProperties = {
  appearance: 'none',
  background: 'var(--surface-card)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-sm)',
  padding: '7px 28px 7px 11px',
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  color: 'var(--text-secondary)',
  cursor: 'pointer',
}

function FilterSelect({ f }: { f: SelectFilter }) {
  return (
    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select value={f.value} onChange={(e) => f.onChange(e.target.value)} style={selectStyle} aria-label={f.label}>
        {f.options.map((o) => (
          <option key={o.value} value={o.value}>
            {f.label}: {o.label}
          </option>
        ))}
      </select>
      <span style={{ position: 'absolute', right: 8, pointerEvents: 'none', display: 'flex' }}>
        <Icon name="ChevronDown" size={14} color="var(--text-muted)" />
      </span>
    </label>
  )
}

// Generic toolbar: search + filter/sort selects + an optional list/kanban toggle.
// Reused by every data model (Products now, CRM/Sales/etc. later).
export function FilterBar({
  search,
  onSearch,
  searchPlaceholder = 'Cari…',
  filters = [],
  sort,
  view,
  onView,
  right,
}: {
  search: string
  onSearch: (v: string) => void
  searchPlaceholder?: string
  filters?: SelectFilter[]
  sort?: SelectFilter
  view?: 'list' | 'kanban'
  onView?: (v: 'list' | 'kanban') => void
  right?: ReactNode
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
      <div className="search-bar" style={{ width: 260 }}>
        <Icon name="Search" size={15} color="var(--text-muted)" />
        <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder={searchPlaceholder} />
      </div>
      {filters.map((f) => (
        <FilterSelect key={f.key} f={f} />
      ))}
      {sort && <FilterSelect f={sort} />}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        {right}
        {view && onView && (
          <div
            style={{
              display: 'inline-flex',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
            }}
          >
            {(['list', 'kanban'] as const).map((v) => (
              <button
                key={v}
                onClick={() => onView(v)}
                title={v === 'list' ? 'Tampilan daftar' : 'Tampilan kanban'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 32,
                  border: 'none',
                  cursor: 'pointer',
                  background: view === v ? 'var(--surface-sunken)' : 'var(--surface-card)',
                }}
              >
                <Icon
                  name={v === 'list' ? 'List' : 'LayoutGrid'}
                  size={16}
                  color={view === v ? 'var(--brand-primary)' : 'var(--text-muted)'}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

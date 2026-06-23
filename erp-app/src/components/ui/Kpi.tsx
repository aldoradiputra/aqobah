import { Icon } from './Icon'

export function Kpi({
  icon,
  label,
  value,
  delta,
  deltaUp = true,
  accent = 'var(--brand-primary)',
}: {
  icon: string
  label: string
  value: string
  delta?: string
  deltaUp?: boolean
  accent?: string
}) {
  return (
    <div className="kpi-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-sm)',
            flexShrink: 0,
            background: `color-mix(in srgb, ${accent} 12%, white)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={icon} size={19} color={accent} />
        </span>
        {delta && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              color: deltaUp ? 'var(--success-500)' : 'var(--danger-500)',
            }}
          >
            {deltaUp ? '▲' : '▼'} {delta}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.65rem',
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          fontVariantNumeric: 'tabular-nums',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 5 }}>{label}</div>
    </div>
  )
}

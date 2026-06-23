export function Progress({ value, max, color }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  const fill =
    pct > 85 ? 'var(--danger-500)' : pct > 60 ? 'var(--warning-500)' : 'var(--success-500)'
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: pct + '%', background: color ?? fill }} />
    </div>
  )
}

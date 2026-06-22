import React from 'react';

/**
 * Aqobah StatBlock — headline metric with label (trust / track-record stats).
 */
export function StatBlock({
  value,
  label,
  icon = null,
  onDark = false,
  align = 'left',
  style = {},
}) {
  const centered = align === 'center';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '4px',
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      ...style,
    }}>
      {icon && (
        <span style={{ color: 'var(--gold-300)', marginBottom: '6px', display: 'flex' }}>{icon}</span>
      )}
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'var(--text-3xl)', lineHeight: 1,
        color: onDark ? '#fff' : 'var(--brand-deep)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', fontWeight: 500,
        letterSpacing: '0.02em',
        color: onDark ? 'rgba(255,255,255,0.78)' : 'var(--text-secondary)',
      }}>
        {label}
      </span>
    </div>
  );
}

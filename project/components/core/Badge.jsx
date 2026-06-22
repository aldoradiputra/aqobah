import React from 'react';

/**
 * Aqobah Badge — compact status / category / trust marker.
 */
export function Badge({
  children,
  variant = 'neutral',  // neutral | brand | accent | seal | success | warning | danger
  soft = true,
  icon = null,
  style = {},
}) {
  const palettes = {
    neutral: { solid: ['var(--neutral-700)', '#fff'], soft: ['var(--neutral-100)', 'var(--neutral-700)'] },
    brand:   { solid: ['var(--brand-primary)', '#fff'], soft: ['var(--surface-brand-soft)', 'var(--blue-700)'] },
    accent:  { solid: ['var(--brand-accent)', 'var(--text-on-accent)'], soft: ['var(--gold-50)', 'var(--gold-600)'] },
    seal:    { solid: ['var(--brand-seal)', '#fff'], soft: ['var(--maroon-100)', 'var(--maroon-600)'] },
    success: { solid: ['var(--success-500)', '#fff'], soft: ['var(--success-50)', 'var(--success-500)'] },
    warning: { solid: ['var(--warning-500)', '#fff'], soft: ['var(--warning-50)', 'var(--warning-500)'] },
    danger:  { solid: ['var(--danger-500)', '#fff'], soft: ['var(--danger-50)', 'var(--danger-500)'] },
  };
  const p = palettes[variant] || palettes.neutral;
  const [bg, fg] = soft ? p.soft : p.solid;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        letterSpacing: '0.03em',
        padding: '4px 11px',
        borderRadius: 'var(--radius-pill)',
        background: bg,
        color: fg,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

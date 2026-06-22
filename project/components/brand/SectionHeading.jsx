import React from 'react';

/**
 * Aqobah SectionHeading — eyebrow + display title with gold rule.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',     // left | center
  onDark = false,
  style = {},
}) {
  const centered = align === 'center';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '12px',
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      maxWidth: centered ? '720px' : 'none',
      marginInline: centered ? 'auto' : 0,
      ...style,
    }}>
      {eyebrow && (
        <span style={{
          fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', fontWeight: 600,
          letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
          color: onDark ? 'var(--gold-300)' : 'var(--brand-primary)',
          display: 'inline-flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ width: '22px', height: '2px', background: 'var(--gold-300)', display: 'inline-block', borderRadius: '2px' }} />
          {eyebrow}
        </span>
      )}
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)',
        color: onDark ? '#fff' : 'var(--text-primary)', margin: 0,
        textWrap: 'balance',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)',
          lineHeight: 'var(--leading-relaxed)',
          color: onDark ? 'rgba(255,255,255,0.82)' : 'var(--text-secondary)',
          margin: 0, maxWidth: '58ch', textWrap: 'pretty',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

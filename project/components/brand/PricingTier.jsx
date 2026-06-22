import React from 'react';

/**
 * Aqobah PricingTier — room-occupancy price tile (Quad / Triple / Double).
 * Mirrors the brochure layout: big IDR figure, USD subline, occupancy label.
 */
export function PricingTier({
  price,            // "270" (juta) — rendered big
  unit = 'Jt',
  usd,              // "USD 15.500"
  occupancy,        // "QUAD" | "TRIPLE" | "DOUBLE"
  featured = false,
  style = {},
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      boxShadow: featured ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      border: featured ? '2px solid var(--gold-300)' : '1px solid var(--border-subtle)',
      background: 'var(--surface-card)',
      transform: featured ? 'translateY(-6px)' : 'none',
      ...style,
    }}>
      <div style={{ padding: '22px 18px 18px', textAlign: 'center', background: 'var(--surface-card)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.6rem', lineHeight: 1, color: 'var(--indigo-700)', fontVariantNumeric: 'tabular-nums' }}>{price}</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '1rem', color: 'var(--indigo-700)' }}>{unit}'an</span>
        </div>
        {usd && <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--brand-primary)', marginTop: '6px' }}>{usd}</div>}
      </div>
      <div style={{
        padding: '11px', textAlign: 'center',
        background: featured ? 'var(--gold-300)' : 'var(--brand-primary)',
        color: featured ? 'var(--indigo-800)' : '#fff',
        fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 'var(--text-sm)',
        letterSpacing: '0.1em',
      }}>{occupancy}</div>
    </div>
  );
}

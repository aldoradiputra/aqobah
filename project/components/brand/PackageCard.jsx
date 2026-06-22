import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { Button } from '../core/Button.jsx';

/**
 * Aqobah PackageCard — umrah/hajj package offer with image, price, facilities.
 */
export function PackageCard({
  title,
  image,
  badge = null,           // { label, variant }
  duration,
  departure,
  hotelStars = null,
  facilities = [],
  priceLabel = 'Mulai dari',
  price,
  rating = null,
  onSelect,
  style = {},
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      <div style={{ position: 'relative', height: '180px', background: 'var(--surface-sunken)' }}>
        {image && <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        {badge && (
          <span style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <Badge variant={badge.variant || 'seal'} soft={false}>{badge.label}</Badge>
          </span>
        )}
        {rating && (
          <span style={{
            position: 'absolute', bottom: '12px', right: '12px',
            background: 'rgba(15,29,43,0.78)', color: '#fff', backdropFilter: 'blur(4px)',
            fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', fontWeight: 600,
            padding: '4px 10px', borderRadius: 'var(--radius-pill)',
            display: 'inline-flex', alignItems: 'center', gap: '4px',
          }}>★ {rating}</span>
        )}
      </div>

      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', margin: 0, color: 'var(--text-primary)' }}>
            {title}
          </h3>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            {duration && <span>{duration}</span>}
            {departure && <span>· {departure}</span>}
            {hotelStars && <span>· Hotel {hotelStars}★</span>}
          </div>
        </div>

        {facilities.length > 0 && (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {facilities.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--success-500)', flex: 'none' }}>✓</span>{f}
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{priceLabel}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--brand-seal)' }}>{price}</span>
          </div>
          <Button variant="primary" size="sm" onClick={onSelect}>Pilih Paket</Button>
        </div>
      </div>
    </div>
  );
}

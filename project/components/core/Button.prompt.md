Pill-shaped action button in IBM Plex Sans — use `primary` for the main CTA, `accent` (gold) for premium/booking moments, `seal` (maroon) for trust/official actions.

```jsx
<Button variant="primary" size="lg" onClick={book}>Daftar Sekarang</Button>
<Button variant="accent" iconRight={<ArrowRight size={18} />}>Lihat Paket</Button>
<Button variant="secondary">Hubungi Kami</Button>
```

Variants: `primary` (blue + glow), `secondary` (outline), `ghost` (text), `accent` (Kaaba gold), `seal` (maroon). Sizes `sm | md | lg`. Supports `iconLeft` / `iconRight`, `fullWidth`, `disabled`.

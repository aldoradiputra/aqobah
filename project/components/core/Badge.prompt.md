Small pill marker for status, category, or trust signals (accreditation, seats left). Use `seal` (maroon) for official/regulatory marks, `accent` (gold) for premium tags.

```jsx
<Badge variant="seal">PIHK 610</Badge>
<Badge variant="accent" soft={false}>VIP</Badge>
<Badge variant="success">Tersedia</Badge>
```

`soft` (default true) gives a tonal fill; set `soft={false}` for a solid fill. Supports a leading `icon`.

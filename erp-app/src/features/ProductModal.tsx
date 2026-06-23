import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { useSaveProduct } from '../lib/queries'
import type { Product, BusinessUnit } from '../lib/types'

const PRODUCT_UNITS_FALLBACK = ['Umrah', 'Haji Khusus', 'Wisata Halal', 'B2B']

interface FormState {
  name: string
  unit: string
  product_code: string
  departure_date: string
  return_date: string
  duration: string
  price_display: string
  hotel_stars: string
  sold: string
  cap: string
  is_published: boolean
  facilities: string
}

function toForm(p: Product | null): FormState {
  return {
    name: p?.name ?? '',
    unit: p?.unit ?? 'Umrah',
    product_code: p?.product_code ?? '',
    departure_date: p?.departure_date ?? '',
    return_date: p?.return_date ?? '',
    duration: p?.duration ?? '',
    price_display: p?.price_display ?? '',
    hotel_stars: p?.hotel_stars != null ? String(p.hotel_stars) : '',
    sold: p?.sold != null ? String(p.sold) : '0',
    cap: p?.cap != null ? String(p.cap) : '',
    is_published: p?.is_published ?? true,
    facilities: (p?.facilities ?? []).join('\n'),
  }
}

export function ProductModal({
  product,
  businessUnits,
  onClose,
}: {
  product: Product | null
  businessUnits: BusinessUnit[]
  onClose: () => void
}) {
  const isEdit = !!product
  const [form, setForm] = useState<FormState>(() => toForm(product))
  const [error, setError] = useState<string | null>(null)
  const save = useSaveProduct()

  useEffect(() => {
    setForm(toForm(product))
  }, [product])

  // Products only span the four travel units (not the Store unit).
  const unitOptions = businessUnits.filter((b) => b.code !== 'STORE').map((b) => b.name)
  const units = unitOptions.length ? unitOptions : PRODUCT_UNITS_FALLBACK

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const payload: Record<string, unknown> = {
      name: form.name.trim(),
      unit: form.unit,
      product_code: form.product_code.trim() || null,
      departure_date: form.departure_date || null,
      return_date: form.return_date || null,
      duration: form.duration.trim() || null,
      price_display: form.price_display.trim() || null,
      hotel_stars: form.hotel_stars ? Number(form.hotel_stars) : null,
      sold: form.sold ? Number(form.sold) : 0,
      cap: form.cap ? Number(form.cap) : null,
      is_published: form.is_published,
      facilities: form.facilities
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    }
    try {
      await save.mutateAsync(isEdit ? { id: product!.id, ...payload } : payload)
      onClose()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>{isEdit ? 'Edit Paket' : 'Paket Baru'}</h2>
          <button type="button" onClick={onClose} style={closeBtn} aria-label="Tutup">
            ✕
          </button>
        </div>
        <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="Nama paket" full>
            <input style={inp} value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </Field>
          <Field label="Unit bisnis">
            <select style={inp} value={form.unit} onChange={(e) => set('unit', e.target.value)}>
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Kode produk">
            <input style={inp} value={form.product_code} onChange={(e) => set('product_code', e.target.value)} placeholder="UMR201" />
          </Field>
          <Field label="Tanggal berangkat">
            <input type="date" style={inp} value={form.departure_date} onChange={(e) => set('departure_date', e.target.value)} />
          </Field>
          <Field label="Tanggal pulang">
            <input type="date" style={inp} value={form.return_date} onChange={(e) => set('return_date', e.target.value)} />
          </Field>
          <Field label="Durasi">
            <input style={inp} value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="12 Hari" />
          </Field>
          <Field label="Harga (tampilan)">
            <input style={inp} value={form.price_display} onChange={(e) => set('price_display', e.target.value)} placeholder="Rp 28.900.000" />
          </Field>
          <Field label="Bintang hotel">
            <input type="number" min="1" max="5" style={inp} value={form.hotel_stars} onChange={(e) => set('hotel_stars', e.target.value)} />
          </Field>
          <Field label="Kuota (cap)">
            <input type="number" min="0" style={inp} value={form.cap} onChange={(e) => set('cap', e.target.value)} />
          </Field>
          <Field label="Terjual">
            <input type="number" min="0" style={inp} value={form.sold} onChange={(e) => set('sold', e.target.value)} />
          </Field>
          <Field label="Fasilitas (satu per baris)" full>
            <textarea
              style={{ ...inp, minHeight: 76, resize: 'vertical' }}
              value={form.facilities}
              onChange={(e) => set('facilities', e.target.value)}
            />
          </Field>
          <label style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
            <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} />
            Terbitkan ke website
          </label>
          {error && <div style={{ gridColumn: '1 / -1', color: 'var(--danger-500)', fontSize: 13 }}>{error}</div>}
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
            <button type="button" onClick={onClose} className="btn-ghost">
              Batal
            </button>
            <button type="submit" className="btn-primary" disabled={save.isPending}>
              {save.isPending ? 'Menyimpan…' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const overlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15,29,43,0.5)',
  display: 'grid',
  placeItems: 'center',
  padding: 20,
  zIndex: 50,
}
const sheet: CSSProperties = {
  width: '100%',
  maxWidth: 620,
  maxHeight: '90vh',
  overflowY: 'auto',
  background: 'var(--surface-card)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-xl)',
  padding: 24,
}
const inp: CSSProperties = {
  width: '100%',
  padding: '9px 11px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-default)',
  fontFamily: 'var(--font-ui)',
  fontSize: 14,
  color: 'var(--text-primary)',
  outline: 'none',
  background: 'var(--surface-card)',
}
const closeBtn: CSSProperties = {
  background: 'var(--surface-sunken)',
  border: 'none',
  width: 30,
  height: 30,
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: 14,
  color: 'var(--text-secondary)',
}

function Field({ label, children, full }: { label: string; children: ReactNode; full?: boolean }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 5, gridColumn: full ? '1 / -1' : undefined }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
      {children}
    </label>
  )
}

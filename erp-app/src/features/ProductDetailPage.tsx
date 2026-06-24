import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProduct, useRoomPricing, useSaveRoomPricing, useBusinessUnits } from '../lib/queries'
import { useSession } from '../auth/SessionProvider'
import { Panel, Pill, Progress, Icon } from '../components/ui'
import type { PillTone } from '../components/ui'
import { ProductModal } from './ProductModal'
import { ProductComponentsSection } from './ProductComponentsSection'
import { ProductBomSection } from './ProductBomSection'
import type { RoomType } from '../lib/types'

const CONFIG_ROLES = ['admin', 'management', 'operational']
const UNIT_TONE: Record<string, PillTone> = {
  Umrah: 'blue',
  'Haji Khusus': 'seal',
  'Wisata Halal': 'gold',
  B2B: 'neutral',
}
const ROOM_TYPES: { key: RoomType; label: string }[] = [
  { key: 'quad', label: 'Quad · 4 orang' },
  { key: 'triple', label: 'Triple · 3 orang' },
  { key: 'double', label: 'Double · 2 orang' },
]

function fmtDate(d: string | null): string {
  return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ width: 150, flexShrink: 0, fontSize: 13, color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{children}</div>
    </div>
  )
}

export function ProductDetailPage() {
  const { id } = useParams()
  const { data: product, isLoading, isError } = useProduct(id)
  const { data: pricing = [] } = useRoomPricing(id)
  const { data: businessUnits = [] } = useBusinessUnits()
  const { role } = useSession()
  const canConfigure = role != null && CONFIG_ROLES.includes(role)
  const save = useSaveRoomPricing(id ?? '')
  const [editing, setEditing] = useState(false)
  const [prices, setPrices] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const map: Record<string, string> = {}
    for (const rt of ROOM_TYPES) {
      const row = pricing.find((p) => p.room_type === rt.key)
      map[rt.key] = row?.price != null ? String(Number(row.price)) : ''
    }
    setPrices(map)
  }, [pricing])

  async function onSavePricing() {
    setSaved(false)
    try {
      await save.mutateAsync(
        ROOM_TYPES.map((rt) => ({ room_type: rt.key, price: prices[rt.key] ? Number(prices[rt.key]) : null })),
      )
      setSaved(true)
    } catch (e) {
      alert((e as Error).message)
    }
  }

  if (isLoading) return <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Memuat…</div>
  if (isError || !product) return <div style={{ color: 'var(--danger-500)', fontSize: 14 }}>Paket tidak ditemukan.</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 860 }}>
      <Link
        to="/products"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-link)', textDecoration: 'none' }}
      >
        <Icon name="ChevronRight" size={14} style={{ transform: 'rotate(180deg)' }} /> Kembali ke katalog
      </Link>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>{product.name}</h1>
            {product.product_code && <Pill tone="blue">{product.product_code}</Pill>}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{product.unit}</div>
        </div>
        {canConfigure && (
          <button className="btn-ghost" onClick={() => setEditing(true)}>
            Edit paket
          </button>
        )}
      </div>

      <Panel title="Ringkasan">
        <InfoRow label="Unit bisnis">
          <Pill tone={UNIT_TONE[product.unit] ?? 'neutral'}>{product.unit}</Pill>
        </InfoRow>
        <InfoRow label="Kode produk">{product.product_code ?? '—'}</InfoRow>
        <InfoRow label="Keberangkatan">{fmtDate(product.departure_date)}</InfoRow>
        <InfoRow label="Kepulangan">{fmtDate(product.return_date)}</InfoRow>
        <InfoRow label="Durasi">{product.duration ?? '—'}</InfoRow>
        <InfoRow label="Harga tampilan">{product.price_display ?? '—'}</InfoRow>
        <InfoRow label="Hotel">{product.hotel_stars ? `${product.hotel_stars} bintang` : '—'}</InfoRow>
        <InfoRow label="Kuota">
          <div style={{ minWidth: 160 }}>
            <div style={{ fontSize: 12, marginBottom: 4, color: 'var(--text-secondary)' }}>
              {product.sold ?? 0}/{product.cap ?? 0} kursi
            </div>
            <Progress value={product.sold ?? 0} max={product.cap ?? 0} />
          </div>
        </InfoRow>
        <InfoRow label="Status">
          {product.is_published ? <Pill tone="green">Terbit</Pill> : <Pill tone="neutral">Draft</Pill>}
        </InfoRow>
      </Panel>

      <Panel
        title="Harga per Tipe Kamar"
        action={
          canConfigure ? (
            <button className="btn-primary" onClick={onSavePricing} disabled={save.isPending}>
              {save.isPending ? 'Menyimpan…' : 'Simpan harga'}
            </button>
          ) : undefined
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ROOM_TYPES.map((rt) => (
            <div key={rt.key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 160, fontSize: 13, fontWeight: 600 }}>{rt.label}</div>
              {canConfigure ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Rp</span>
                  <input
                    type="number"
                    min="0"
                    value={prices[rt.key] ?? ''}
                    onChange={(e) => {
                      const v = e.target.value
                      setPrices((p) => ({ ...p, [rt.key]: v }))
                      setSaved(false)
                    }}
                    placeholder="0"
                    style={{
                      flex: 1,
                      maxWidth: 240,
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-default)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
              ) : (
                <div style={{ fontSize: 14 }}>
                  {prices[rt.key] ? 'Rp ' + Number(prices[rt.key]).toLocaleString('id-ID') : '—'}
                </div>
              )}
            </div>
          ))}
          {saved && <div style={{ fontSize: 12, color: 'var(--success-500)' }}>Harga kamar tersimpan.</div>}
        </div>
      </Panel>

      <ProductComponentsSection productId={product.id} canConfigure={canConfigure} />

      <ProductBomSection productId={product.id} canConfigure={canConfigure} />

      <Panel title="Aktivitas">
        <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Umpan-balik aktivitas (komentar &amp; lini masa per record) akan ditambahkan pada langkah berikutnya.
        </div>
      </Panel>

      {editing && <ProductModal product={product} businessUnits={businessUnits} onClose={() => setEditing(false)} />}
    </div>
  )
}

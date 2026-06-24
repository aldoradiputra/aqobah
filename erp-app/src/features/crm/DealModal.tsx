import { useState, type CSSProperties, type FormEvent } from 'react'
import { useSaveDeal, usePipelineStages, useCustomers, useProducts } from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import type { Deal } from '../../lib/types'

// Create / edit a deal. The pipeline is fixed (the board's, or the deal's); the
// stage is chosen from that pipeline's stages. New deals are owned by the creator
// (RLS requires owner_id = auth.uid() on insert).
export function DealModal({ deal, pipelineId, onClose }: { deal?: Deal | null; pipelineId: string; onClose: () => void }) {
  const { user } = useSession()
  const save = useSaveDeal()
  const pid = deal?.pipeline_id ?? pipelineId
  const { data: stages = [] } = usePipelineStages(pid)
  const { data: customers = [] } = useCustomers()
  const { data: products = [] } = useProducts()

  const [stageId, setStageId] = useState(deal?.stage_id ?? '')
  const [title, setTitle] = useState(deal?.title ?? '')
  const [customerId, setCustomerId] = useState(deal?.customer_id ?? '')
  const [partnerId, setPartnerId] = useState(deal?.partner_id ?? '')
  const [productId, setProductId] = useState(deal?.product_id ?? '')
  const [value, setValue] = useState(deal?.estimated_value != null ? String(deal.estimated_value) : '')
  const [pax, setPax] = useState(deal?.expected_pax != null ? String(deal.expected_pax) : '')
  const [forecast, setForecast] = useState(deal?.forecast_close_date ?? '')
  const [error, setError] = useState<string | null>(null)

  const effectiveStage = stageId || stages[0]?.id || ''
  const partners = customers.filter((c) => c.is_partner)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!effectiveStage) {
      setError('Pipeline ini belum punya tahapan. Tambahkan di Pengaturan.')
      return
    }
    const payload: Record<string, unknown> = {
      pipeline_id: pid,
      stage_id: effectiveStage,
      title: title.trim(),
      customer_id: customerId || null,
      partner_id: partnerId || null,
      product_id: productId || null,
      estimated_value: value.trim() ? Number(value) : null,
      expected_pax: pax.trim() ? Number(pax) : null,
      forecast_close_date: forecast || null,
    }
    if (!deal) payload.owner_id = user?.id ?? null
    try {
      await save.mutateAsync(deal ? { id: deal.id, ...payload } : payload)
      onClose()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 14 }}>{deal ? 'Ubah Deal' : 'Deal Baru'}</h2>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={lbl}>
            Judul
            <input style={inp} value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="mis. Umrah Ramadhan — Kel. Budi (4 pax)" />
          </label>
          <label style={lbl}>
            Tahap
            <select style={inp} value={effectiveStage} onChange={(e) => setStageId(e.target.value)}>
              {stages.length === 0 && <option value="">(belum ada tahapan)</option>}
              {stages.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </label>
          <label style={lbl}>
            Pelanggan
            <select style={inp} value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
              <option value="">—</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label style={lbl}>
            Mitra perujuk (opsional)
            <select style={inp} value={partnerId} onChange={(e) => setPartnerId(e.target.value)}>
              <option value="">—</option>
              {partners.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label style={lbl}>
            Paket (opsional)
            <select style={inp} value={productId} onChange={(e) => setProductId(e.target.value)}>
              <option value="">—</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <label style={{ ...lbl, flex: 1 }}>
              Nilai estimasi (Rp)
              <input style={inp} value={value} onChange={(e) => setValue(e.target.value)} inputMode="numeric" placeholder="mis. 140000000" />
            </label>
            <label style={{ ...lbl, flex: 1 }}>
              Estimasi pax
              <input style={inp} value={pax} onChange={(e) => setPax(e.target.value)} inputMode="numeric" />
            </label>
          </div>
          <label style={lbl}>
            Perkiraan closing
            <input style={inp} type="date" value={forecast} onChange={(e) => setForecast(e.target.value)} />
          </label>
          {error && <div style={{ color: 'var(--danger-500)', fontSize: 13 }}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
            <button type="button" className="btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-primary" disabled={save.isPending || !title.trim()}>
              {save.isPending ? 'Menyimpan…' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const overlay: CSSProperties = {
  position: 'fixed', inset: 0, background: 'rgba(15,29,43,0.5)', display: 'grid',
  placeItems: 'center', padding: 20, zIndex: 50, overflowY: 'auto',
}
const sheet: CSSProperties = {
  width: '100%', maxWidth: 520, background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-xl)', padding: 22,
}
const lbl: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }
const inp: CSSProperties = {
  padding: '9px 11px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)',
  fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text-primary)', outline: 'none', background: 'var(--surface-card)',
}

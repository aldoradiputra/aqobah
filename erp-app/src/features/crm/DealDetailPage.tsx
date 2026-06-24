import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDeal, useCrmPipelines, usePipelineStages, useCustomers, useProducts } from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import { Panel, Pill, Icon } from '../../components/ui'
import type { PillTone } from '../../components/ui'
import { ActivityFeed } from '../../components/activity/ActivityFeed'
import { DealModal } from './DealModal'

const WRITE_ROLES = ['admin', 'management', 'sales']
function rp(n: number | null): string {
  return n != null ? 'Rp' + Number(n).toLocaleString('id-ID') : '—'
}
function fmtDate(d: string | null): string {
  return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'
}

export function DealDetailPage() {
  const { id } = useParams()
  const { data: d, isLoading, isError } = useDeal(id)
  const { role } = useSession()
  const canWrite = role != null && WRITE_ROLES.includes(role)
  const [editing, setEditing] = useState(false)
  const { data: pipelines = [] } = useCrmPipelines()
  const { data: stages = [] } = usePipelineStages(d?.pipeline_id)
  const { data: customers = [] } = useCustomers()
  const { data: products = [] } = useProducts()

  if (isLoading) return <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Memuat…</div>
  if (isError || !d) return <div style={{ color: 'var(--danger-500)', fontSize: 14 }}>Deal tidak ditemukan.</div>

  const stage = stages.find((s) => s.id === d.stage_id)
  const pipeline = pipelines.find((p) => p.id === d.pipeline_id)
  const customer = customers.find((c) => c.id === d.customer_id)
  const partner = customers.find((c) => c.id === d.partner_id)
  const product = products.find((p) => p.id === d.product_id)
  const tone: PillTone = stage?.is_won ? 'green' : stage?.is_lost ? 'red' : 'blue'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1180 }}>
      <Link to="/crm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-link)', textDecoration: 'none' }}>
        <Icon name="ChevronRight" size={14} style={{ transform: 'rotate(180deg)' }} /> Kembali ke pipeline
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem' }}>{d.title}</h1>
        <Pill tone={tone}>{stage?.name ?? '—'}</Pill>
        {pipeline && <Pill tone="neutral">{pipeline.name}</Pill>}
        {canWrite && (
          <button className="btn-ghost" style={{ marginLeft: 'auto', padding: '5px 12px' }} onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
      </div>

      <div className="record-layout">
        <div className="record-layout__main">
          <Panel title="Detail Deal">
            <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 18px', margin: 0, fontSize: 14 }}>
              <Field label="Pelanggan" value={customer?.name ?? null} />
              <Field label="Mitra perujuk" value={partner?.name ?? null} />
              <Field label="Paket" value={product?.name ?? null} />
              <Field label="Nilai estimasi" value={rp(d.estimated_value)} />
              <Field label="Estimasi pax" value={d.expected_pax != null ? String(d.expected_pax) : null} />
              <Field label="Perkiraan closing" value={fmtDate(d.forecast_close_date)} />
              {stage?.is_lost && <Field label="Alasan kalah" value={d.lost_reason} />}
            </dl>
          </Panel>
        </div>
        <aside className="record-layout__aside">
          <ActivityFeed entityType="deal" entityId={d.id} />
        </aside>
      </div>

      {editing && <DealModal deal={d} pipelineId={d.pipeline_id} onClose={() => setEditing(false)} />}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <>
      <dt style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, paddingTop: 2 }}>{label}</dt>
      <dd style={{ margin: 0, color: 'var(--text-secondary)', wordBreak: 'break-word' }}>
        {value || <span style={{ color: 'var(--text-muted)' }}>—</span>}
      </dd>
    </>
  )
}

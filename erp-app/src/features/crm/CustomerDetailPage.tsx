import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCustomer } from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import { Panel, Pill, Icon } from '../../components/ui'
import { ActivityFeed } from '../../components/activity/ActivityFeed'
import { CustomerModal } from './CustomerModal'

const TYPE_LABEL: Record<string, string> = { individual: 'Individu', corporation: 'Korporasi' }
const WRITE_ROLES = ['admin', 'management', 'sales']

export function CustomerDetailPage() {
  const { id } = useParams()
  const { data: c, isLoading, isError } = useCustomer(id)
  const { role } = useSession()
  const canWrite = role != null && WRITE_ROLES.includes(role)
  const [editing, setEditing] = useState(false)

  if (isLoading) return <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Memuat…</div>
  if (isError || !c) return <div style={{ color: 'var(--danger-500)', fontSize: 14 }}>Pelanggan tidak ditemukan.</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1180 }}>
      <Link
        to="/crm/customers"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-link)', textDecoration: 'none' }}
      >
        <Icon name="ChevronRight" size={14} style={{ transform: 'rotate(180deg)' }} /> Kembali ke daftar
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem' }}>{c.name}</h1>
        <Pill tone="neutral">{TYPE_LABEL[c.customer_type] ?? c.customer_type}</Pill>
        {c.is_partner && <Pill tone="gold">Mitra{c.commission_rate != null ? ` · ${c.commission_rate}%` : ''}</Pill>}
        {canWrite && (
          <button className="btn-ghost" style={{ marginLeft: 'auto', padding: '5px 12px' }} onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
      </div>

      <div className="record-layout">
        <div className="record-layout__main">
          <Panel title="Detail Pelanggan">
            <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 18px', margin: 0, fontSize: 14 }}>
              <Field label={c.customer_type === 'corporation' ? 'NPWP' : 'NIK'} value={c.customer_type === 'corporation' ? c.npwp : c.nik} />
              <Field label="Telepon" value={c.phone} />
              <Field label="Email" value={c.email} />
              <Field label="Kota" value={c.city} />
              <Field label="Alamat" value={c.address} />
              {c.is_partner && <Field label="Komisi" value={c.commission_rate != null ? `${c.commission_rate}%` : null} />}
              <Field label="Catatan" value={c.notes} />
            </dl>
          </Panel>
        </div>
        <aside className="record-layout__aside">
          <ActivityFeed entityType="customer" entityId={c.id} />
        </aside>
      </div>

      {editing && <CustomerModal customer={c} onClose={() => setEditing(false)} />}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <>
      <dt style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, paddingTop: 2 }}>{label}</dt>
      <dd style={{ margin: 0, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {value || <span style={{ color: 'var(--text-muted)' }}>—</span>}
      </dd>
    </>
  )
}

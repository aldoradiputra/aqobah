import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCustomers, useDeleteCustomer } from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import { DataTable, Pill, Panel } from '../../components/ui'
import type { Column, PillTone } from '../../components/ui'
import { FilterBar } from '../../components/data-view'
import type { SelectFilter } from '../../components/data-view'
import { CustomerModal } from './CustomerModal'
import type { Customer } from '../../lib/types'

const TYPE_LABEL: Record<string, string> = { individual: 'Individu', corporation: 'Korporasi' }
const TYPE_TONE: Record<string, PillTone> = { individual: 'blue', corporation: 'seal' }
const WRITE_ROLES = ['admin', 'management', 'sales']

export function CustomersPage() {
  const { data: customers = [], isLoading, isError, error } = useCustomers()
  const { role } = useSession()
  const del = useDeleteCustomer()
  const canWrite = role != null && WRITE_ROLES.includes(role)

  const [editing, setEditing] = useState<Customer | 'new' | null>(null)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [partner, setPartner] = useState('all')

  const filtered = useMemo(
    () =>
      customers.filter((c) => {
        if (type !== 'all' && c.customer_type !== type) return false
        if (partner === 'partner' && !c.is_partner) return false
        if (partner === 'non' && c.is_partner) return false
        if (search) {
          const q = search.toLowerCase()
          const hay = [c.name, c.phone, c.email, c.nik, c.npwp, c.city].filter(Boolean).join(' ').toLowerCase()
          if (!hay.includes(q)) return false
        }
        return true
      }),
    [customers, type, partner, search],
  )

  async function handleDelete(c: Customer) {
    if (!window.confirm(`Hapus pelanggan "${c.name}"?`)) return
    try {
      await del.mutateAsync(c.id)
    } catch (e) {
      alert((e as Error).message)
    }
  }

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      label: 'Nama',
      render: (c) => (
        <Link to={`/crm/customers/${c.id}`} style={{ fontWeight: 600, color: 'var(--text-link)', textDecoration: 'none' }}>
          {c.name}
        </Link>
      ),
    },
    { key: 'customer_type', label: 'Tipe', render: (c) => <Pill tone={TYPE_TONE[c.customer_type] ?? 'neutral'}>{TYPE_LABEL[c.customer_type] ?? c.customer_type}</Pill> },
    {
      key: 'is_partner',
      label: 'Mitra',
      render: (c) =>
        c.is_partner ? (
          <Pill tone="gold">Mitra{c.commission_rate != null ? ` · ${c.commission_rate}%` : ''}</Pill>
        ) : (
          <span style={{ color: 'var(--text-muted)' }}>—</span>
        ),
    },
    { key: 'phone', label: 'Kontak', render: (c) => c.phone || c.email || '—' },
    { key: 'city', label: 'Kota', render: (c) => c.city || '—' },
  ]
  if (canWrite) {
    columns.push({
      key: 'actions',
      label: '',
      align: 'right',
      render: (c) => (
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          <button className="btn-ghost" style={{ padding: '5px 10px' }} onClick={() => setEditing(c)}>
            Edit
          </button>
          <button className="btn-ghost" style={{ padding: '5px 10px', color: 'var(--danger-500)' }} onClick={() => handleDelete(c)}>
            Hapus
          </button>
        </div>
      ),
    })
  }

  const filters: SelectFilter[] = [
    {
      key: 'type',
      label: 'Tipe',
      value: type,
      onChange: setType,
      options: [
        { value: 'all', label: 'Semua' },
        { value: 'individual', label: 'Individu' },
        { value: 'corporation', label: 'Korporasi' },
      ],
    },
    {
      key: 'partner',
      label: 'Mitra',
      value: partner,
      onChange: setPartner,
      options: [
        { value: 'all', label: 'Semua' },
        { value: 'partner', label: 'Mitra' },
        { value: 'non', label: 'Non-mitra' },
      ],
    },
  ]

  return (
    <Panel
      title="Pelanggan & Mitra"
      noPad
      action={<span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} / {customers.length}</span>}
    >
      <div style={{ padding: '16px 20px 0' }}>
        <FilterBar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Cari nama / kontak / NIK…"
          filters={filters}
          right={
            canWrite ? (
              <button className="btn-primary" onClick={() => setEditing('new')}>
                + Pelanggan Baru
              </button>
            ) : undefined
          }
        />
        {isLoading && <div style={{ color: 'var(--text-muted)', fontSize: 14, paddingBottom: 20 }}>Memuat…</div>}
        {isError && (
          <div style={{ color: 'var(--danger-500)', fontSize: 14, paddingBottom: 20 }}>Gagal memuat: {(error as Error)?.message}</div>
        )}
        {!isLoading && !isError && filtered.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: 14, paddingBottom: 20 }}>Belum ada pelanggan.</div>
        )}
      </div>
      {!isLoading && !isError && filtered.length > 0 && <DataTable columns={columns} rows={filtered} />}

      {editing !== null && <CustomerModal customer={editing === 'new' ? null : editing} onClose={() => setEditing(null)} />}
    </Panel>
  )
}

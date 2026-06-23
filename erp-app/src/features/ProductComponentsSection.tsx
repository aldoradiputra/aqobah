import { useState, type CSSProperties, type FormEvent } from 'react'
import {
  useComponentTypes,
  useProductComponents,
  useSaveComponent,
  useDeleteComponent,
} from '../lib/queries'
import { Panel, DataTable } from '../components/ui'
import type { Column } from '../components/ui'
import type { ProductComponent, ComponentType } from '../lib/types'

function rupiah(n: number): string {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID')
}

export function ProductComponentsSection({
  productId,
  canConfigure,
}: {
  productId: string
  canConfigure: boolean
}) {
  const { data: types = [] } = useComponentTypes()
  const { data: components = [], isLoading } = useProductComponents(productId)
  const del = useDeleteComponent(productId)
  const [editing, setEditing] = useState<ProductComponent | 'new' | null>(null)

  const typeName = (id: string | null) => types.find((t) => t.id === id)?.name ?? '—'
  const lineTotal = (c: ProductComponent) => Number(c.qty) * Number(c.unit_cost)
  const hpp = components.reduce((sum, c) => sum + lineTotal(c), 0)

  async function handleDelete(c: ProductComponent) {
    if (!window.confirm(`Hapus komponen "${typeName(c.component_type_id)}"?`)) return
    try {
      await del.mutateAsync(c.id)
    } catch (e) {
      alert((e as Error).message)
    }
  }

  const columns: Column<ProductComponent>[] = [
    { key: 'type', label: 'Komponen', render: (c) => <span style={{ fontWeight: 600 }}>{typeName(c.component_type_id)}</span> },
    { key: 'note', label: 'Catatan', wrap: true, render: (c) => <span style={{ color: 'var(--text-secondary)' }}>{c.note ?? '—'}</span> },
    { key: 'qty', label: 'Qty', align: 'right', render: (c) => Number(c.qty).toLocaleString('id-ID') },
    { key: 'unit_cost', label: 'Biaya Satuan', align: 'right', render: (c) => rupiah(Number(c.unit_cost)) },
    { key: 'subtotal', label: 'Subtotal', align: 'right', render: (c) => <span style={{ fontWeight: 600 }}>{rupiah(lineTotal(c))}</span> },
  ]
  if (canConfigure) {
    columns.push({
      key: 'actions',
      label: '',
      align: 'right',
      render: (c) => (
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          <button className="btn-ghost" style={{ padding: '4px 9px' }} onClick={() => setEditing(c)}>
            Edit
          </button>
          <button className="btn-ghost" style={{ padding: '4px 9px', color: 'var(--danger-500)' }} onClick={() => handleDelete(c)}>
            Hapus
          </button>
        </div>
      ),
    })
  }

  return (
    <Panel
      title="Komponen Keberangkatan (HPP)"
      noPad
      action={
        canConfigure ? (
          <button className="btn-primary" onClick={() => setEditing('new')}>
            + Tambah komponen
          </button>
        ) : undefined
      }
    >
      {isLoading && <div style={{ padding: 20, color: 'var(--text-muted)', fontSize: 14 }}>Memuat…</div>}
      {!isLoading && components.length === 0 && (
        <div style={{ padding: 20, color: 'var(--text-muted)', fontSize: 14 }}>Belum ada komponen.</div>
      )}
      {!isLoading && components.length > 0 && <DataTable columns={columns} rows={components} />}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 18px',
          borderTop: '2px solid var(--border-default)',
          background: 'var(--surface-sunken)',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Total HPP
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>{rupiah(hpp)}</span>
      </div>

      {editing !== null && (
        <ComponentModal
          productId={productId}
          component={editing === 'new' ? null : editing}
          types={types}
          onClose={() => setEditing(null)}
        />
      )}
    </Panel>
  )
}

function ComponentModal({
  productId,
  component,
  types,
  onClose,
}: {
  productId: string
  component: ProductComponent | null
  types: ComponentType[]
  onClose: () => void
}) {
  const isEdit = !!component
  const save = useSaveComponent(productId)
  const [typeId, setTypeId] = useState(component?.component_type_id ?? types[0]?.id ?? '')
  const [note, setNote] = useState(component?.note ?? '')
  const [qty, setQty] = useState(component != null ? String(Number(component.qty)) : '1')
  const [unitCost, setUnitCost] = useState(component != null ? String(Number(component.unit_cost)) : '')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await save.mutateAsync({
        id: component?.id,
        component_type_id: typeId || null,
        note: note.trim() || null,
        qty: qty ? Number(qty) : 1,
        unit_cost: unitCost ? Number(unitCost) : 0,
      })
      onClose()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 14 }}>
          {isEdit ? 'Edit Komponen' : 'Tambah Komponen'}
        </h2>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={lbl}>
            Jenis komponen
            <select style={inp} value={typeId} onChange={(e) => setTypeId(e.target.value)}>
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label style={lbl}>
            Catatan
            <input style={inp} value={note} onChange={(e) => setNote(e.target.value)} placeholder="opsional" />
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            <label style={{ ...lbl, flex: 1 }}>
              Qty
              <input type="number" min="0" step="0.01" style={inp} value={qty} onChange={(e) => setQty(e.target.value)} />
            </label>
            <label style={{ ...lbl, flex: 1 }}>
              Biaya satuan (Rp)
              <input type="number" min="0" style={inp} value={unitCost} onChange={(e) => setUnitCost(e.target.value)} placeholder="0" />
            </label>
          </div>
          {error && <div style={{ color: 'var(--danger-500)', fontSize: 13 }}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
            <button type="button" className="btn-ghost" onClick={onClose}>
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
  maxWidth: 460,
  background: 'var(--surface-card)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-xl)',
  padding: 22,
}
const lbl: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }
const inp: CSSProperties = {
  padding: '9px 11px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-default)',
  fontFamily: 'var(--font-ui)',
  fontSize: 14,
  color: 'var(--text-primary)',
  outline: 'none',
  background: 'var(--surface-card)',
}

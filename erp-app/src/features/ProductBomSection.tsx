import { useState, type CSSProperties, type FormEvent } from 'react'
import { useInventoryItems, useProductBom, useSaveBom, useDeleteBom } from '../lib/queries'
import { Panel, DataTable, Pill } from '../components/ui'
import type { Column, PillTone } from '../components/ui'
import type { ProductBomEntry, InventoryItem } from '../lib/types'

const GENDER_LABEL: Record<string, string> = { all: 'Semua', male: 'Pria', female: 'Wanita' }
const GENDER_TONE: Record<string, PillTone> = { all: 'neutral', male: 'blue', female: 'seal' }
const GENDERS = [
  { key: 'all', label: 'Semua jemaah' },
  { key: 'male', label: 'Pria saja' },
  { key: 'female', label: 'Wanita saja' },
]

export function ProductBomSection({ productId, canConfigure }: { productId: string; canConfigure: boolean }) {
  const { data: items = [] } = useInventoryItems()
  const { data: bom = [], isLoading } = useProductBom(productId)
  const del = useDeleteBom(productId)
  const [editing, setEditing] = useState<ProductBomEntry | 'new' | null>(null)

  const itemName = (id: string) => items.find((i) => i.id === id)?.name ?? '—'

  async function handleDelete(b: ProductBomEntry) {
    if (!window.confirm(`Hapus "${itemName(b.inventory_item_id)}" dari paket inventory?`)) return
    try {
      await del.mutateAsync(b.id)
    } catch (e) {
      alert((e as Error).message)
    }
  }

  const columns: Column<ProductBomEntry>[] = [
    { key: 'item', label: 'Item Inventory', render: (b) => <span style={{ fontWeight: 600 }}>{itemName(b.inventory_item_id)}</span> },
    {
      key: 'gender',
      label: 'Berlaku',
      render: (b) => <Pill tone={GENDER_TONE[b.gender] ?? 'neutral'}>{GENDER_LABEL[b.gender] ?? b.gender}</Pill>,
    },
    { key: 'qty_per_pax', label: 'Qty / Jemaah', align: 'right', render: (b) => Number(b.qty_per_pax).toLocaleString('id-ID') },
  ]
  if (canConfigure) {
    columns.push({
      key: 'actions',
      label: '',
      align: 'right',
      render: (b) => (
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          <button className="btn-ghost" style={{ padding: '4px 9px' }} onClick={() => setEditing(b)}>
            Edit
          </button>
          <button className="btn-ghost" style={{ padding: '4px 9px', color: 'var(--danger-500)' }} onClick={() => handleDelete(b)}>
            Hapus
          </button>
        </div>
      ),
    })
  }

  return (
    <Panel
      title="Inventory BOM (per Jemaah)"
      noPad
      action={
        canConfigure ? (
          <button className="btn-primary" onClick={() => setEditing('new')}>
            + Tambah item
          </button>
        ) : undefined
      }
    >
      {isLoading && <div style={{ padding: 20, color: 'var(--text-muted)', fontSize: 14 }}>Memuat…</div>}
      {!isLoading && bom.length === 0 && (
        <div style={{ padding: 20, color: 'var(--text-muted)', fontSize: 14 }}>Belum ada item inventory.</div>
      )}
      {!isLoading && bom.length > 0 && <DataTable columns={columns} rows={bom} />}
      <div style={{ padding: '10px 18px', fontSize: 12, color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)' }}>
        “Berlaku” menentukan jemaah mana yang menerima item — mis. Kain Ihram hanya untuk Pria.
      </div>

      {editing !== null && (
        <BomModal
          productId={productId}
          entry={editing === 'new' ? null : editing}
          items={items}
          onClose={() => setEditing(null)}
        />
      )}
    </Panel>
  )
}

function BomModal({
  productId,
  entry,
  items,
  onClose,
}: {
  productId: string
  entry: ProductBomEntry | null
  items: InventoryItem[]
  onClose: () => void
}) {
  const isEdit = !!entry
  const save = useSaveBom(productId)
  const [itemId, setItemId] = useState(entry?.inventory_item_id ?? items[0]?.id ?? '')
  const [gender, setGender] = useState<string>(entry?.gender ?? 'all')
  const [qty, setQty] = useState(entry != null ? String(Number(entry.qty_per_pax)) : '1')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await save.mutateAsync({ id: entry?.id, inventory_item_id: itemId, gender, qty_per_pax: qty ? Number(qty) : 1 })
      onClose()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 14 }}>
          {isEdit ? 'Edit Item Inventory' : 'Tambah Item Inventory'}
        </h2>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={lbl}>
            Item
            <select style={inp} value={itemId} onChange={(e) => setItemId(e.target.value)}>
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </label>
          <label style={lbl}>
            Berlaku untuk
            <select style={inp} value={gender} onChange={(e) => setGender(e.target.value)}>
              {GENDERS.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>
          <label style={lbl}>
            Qty per jemaah
            <input type="number" min="0" step="0.01" style={inp} value={qty} onChange={(e) => setQty(e.target.value)} />
          </label>
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
  maxWidth: 440,
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

import { useState, type CSSProperties, type FormEvent } from 'react'
import { useSaveCustomer } from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import type { Customer } from '../../lib/types'

// Create / edit a customer or partner. Individuals carry a NIK, corporations an
// NPWP; partners add a commission rate. New records are stamped with the creator
// as owner_id (informational — customers are shared, not owner-scoped).
export function CustomerModal({ customer, onClose }: { customer: Customer | null; onClose: () => void }) {
  const { user } = useSession()
  const save = useSaveCustomer()
  const [type, setType] = useState(customer?.customer_type ?? 'individual')
  const [name, setName] = useState(customer?.name ?? '')
  const [nik, setNik] = useState(customer?.nik ?? '')
  const [npwp, setNpwp] = useState(customer?.npwp ?? '')
  const [phone, setPhone] = useState(customer?.phone ?? '')
  const [email, setEmail] = useState(customer?.email ?? '')
  const [city, setCity] = useState(customer?.city ?? '')
  const [address, setAddress] = useState(customer?.address ?? '')
  const [isPartner, setIsPartner] = useState(customer?.is_partner ?? false)
  const [commission, setCommission] = useState(customer?.commission_rate != null ? String(customer.commission_rate) : '')
  const [notes, setNotes] = useState(customer?.notes ?? '')
  const [error, setError] = useState<string | null>(null)

  const isCorp = type === 'corporation'

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const payload: Record<string, unknown> = {
      customer_type: type,
      name: name.trim(),
      nik: isCorp ? null : nik.trim() || null,
      npwp: isCorp ? npwp.trim() || null : null,
      phone: phone.trim() || null,
      email: email.trim() || null,
      city: city.trim() || null,
      address: address.trim() || null,
      is_partner: isPartner,
      commission_rate: isPartner && commission.trim() ? Number(commission) : null,
      notes: notes.trim() || null,
    }
    if (!customer) payload.owner_id = user?.id ?? null
    try {
      await save.mutateAsync(customer ? { id: customer.id, ...payload } : payload)
      onClose()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 14 }}>
          {customer ? 'Ubah Pelanggan' : 'Pelanggan Baru'}
        </h2>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={lbl}>
            Tipe
            <select style={inp} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="individual">Individu</option>
              <option value="corporation">Korporasi</option>
            </select>
          </label>
          <label style={lbl}>
            {isCorp ? 'Nama Perusahaan' : 'Nama Lengkap'}
            <input
              style={inp}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={isCorp ? 'mis. PT Berkah Travel' : 'mis. Budi Santoso'}
            />
          </label>
          {isCorp ? (
            <label style={lbl}>
              NPWP
              <input style={inp} value={npwp} onChange={(e) => setNpwp(e.target.value)} placeholder="00.000.000.0-000.000" />
            </label>
          ) : (
            <label style={lbl}>
              NIK
              <input style={inp} value={nik} onChange={(e) => setNik(e.target.value)} placeholder="16 digit" />
            </label>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <label style={{ ...lbl, flex: 1 }}>
              Telepon
              <input style={inp} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08…" />
            </label>
            <label style={{ ...lbl, flex: 1 }}>
              Email
              <input style={inp} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <label style={{ ...lbl, flex: 1 }}>
              Kota
              <input style={inp} value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label style={{ ...lbl, flex: 1 }}>
              Alamat
              <input style={inp} value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
          </div>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
            <input type="checkbox" checked={isPartner} onChange={(e) => setIsPartner(e.target.checked)} />
            Mitra (partner)
          </label>
          {isPartner && (
            <label style={lbl}>
              Komisi (%)
              <input style={inp} value={commission} onChange={(e) => setCommission(e.target.value)} inputMode="decimal" placeholder="mis. 2.5" />
            </label>
          )}
          <label style={lbl}>
            Catatan
            <textarea style={{ ...inp, minHeight: 70, resize: 'vertical' }} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          {error && <div style={{ color: 'var(--danger-500)', fontSize: 13 }}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
            <button type="button" className="btn-ghost" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary" disabled={save.isPending || !name.trim()}>
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
  overflowY: 'auto',
}
const sheet: CSSProperties = {
  width: '100%',
  maxWidth: 520,
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

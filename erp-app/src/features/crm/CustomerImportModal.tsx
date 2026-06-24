import { useState, type CSSProperties, type ChangeEvent } from 'react'
import { useImportCustomers } from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import { parseCsvRecords } from '../../lib/csv'

// Bulk-import customers from a CSV. The user maps spreadsheet columns to customer
// fields (auto-guessed by header name), previews, then imports. Reuses the generic
// parser in lib/csv.ts and the bulk-insert hook (chunked, owner-stamped).
const TARGETS: { key: string; label: string; required?: boolean }[] = [
  { key: 'name', label: 'Nama', required: true },
  { key: 'customer_type', label: 'Tipe (individu/korporasi)' },
  { key: 'nik', label: 'NIK' },
  { key: 'npwp', label: 'NPWP' },
  { key: 'phone', label: 'Telepon' },
  { key: 'email', label: 'Email' },
  { key: 'city', label: 'Kota' },
  { key: 'address', label: 'Alamat' },
  { key: 'is_partner', label: 'Mitra (ya/tidak)' },
  { key: 'commission_rate', label: 'Komisi (%)' },
  { key: 'notes', label: 'Catatan' },
]

const SYNONYMS: Record<string, string[]> = {
  name: ['nama', 'name', 'namalengkap', 'namaperusahaan', 'fullname'],
  customer_type: ['tipe', 'type', 'jenis'],
  nik: ['nik', 'ktp', 'noktp'],
  npwp: ['npwp'],
  phone: ['telepon', 'telp', 'phone', 'hp', 'nohp', 'notelp', 'whatsapp', 'wa'],
  email: ['email', 'surel', 'mail'],
  city: ['kota', 'city', 'domisili'],
  address: ['alamat', 'address'],
  is_partner: ['mitra', 'partner', 'ispartner'],
  commission_rate: ['komisi', 'commission', 'rate'],
  notes: ['catatan', 'notes', 'keterangan', 'note'],
}

function guessMapping(headers: string[]): Record<string, number> {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  const H = headers.map(norm)
  const out: Record<string, number> = {}
  for (const t of TARGETS) {
    const keys = SYNONYMS[t.key] ?? [t.key]
    let idx = -1
    for (const k of keys) {
      idx = H.indexOf(k)
      if (idx >= 0) break
    }
    if (idx < 0) for (const k of keys) {
      idx = H.findIndex((h) => h.includes(k))
      if (idx >= 0) break
    }
    out[t.key] = idx
  }
  return out
}

export function CustomerImportModal({ onClose }: { onClose: () => void }) {
  const { user } = useSession()
  const imp = useImportCustomers()
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<string[][]>([])
  const [mapping, setMapping] = useState<Record<string, number>>({})
  const [result, setResult] = useState<string | null>(null)

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const parsed = parseCsvRecords(String(reader.result ?? ''))
      setHeaders(parsed.headers)
      setRows(parsed.rows)
      setMapping(guessMapping(parsed.headers))
      setResult(null)
    }
    reader.readAsText(f)
    e.target.value = ''
  }

  const cell = (row: string[], key: string) => {
    const i = mapping[key]
    return i != null && i >= 0 ? (row[i] ?? '').trim() : ''
  }

  function buildPayload(): Record<string, unknown>[] {
    return rows
      .map((row) => {
        const name = cell(row, 'name')
        if (!name) return null
        const typeRaw = cell(row, 'customer_type').toLowerCase()
        const corp = /corp|korp|\bpt\b|\bcv\b|perusahaan|company/.test(typeRaw)
        const partnerRaw = cell(row, 'is_partner').toLowerCase()
        const isPartner = ['ya', 'yes', 'true', '1', 'y', 'mitra', 'partner'].includes(partnerRaw)
        const comm = cell(row, 'commission_rate').replace(/[^0-9.,]/g, '').replace(',', '.')
        return {
          name,
          customer_type: corp ? 'corporation' : 'individual',
          nik: cell(row, 'nik') || null,
          npwp: cell(row, 'npwp') || null,
          phone: cell(row, 'phone') || null,
          email: cell(row, 'email') || null,
          city: cell(row, 'city') || null,
          address: cell(row, 'address') || null,
          is_partner: isPartner,
          commission_rate: isPartner && comm ? Number(comm) : null,
          notes: cell(row, 'notes') || null,
          owner_id: user?.id ?? null,
        }
      })
      .filter(Boolean) as Record<string, unknown>[]
  }

  async function doImport() {
    setResult(null)
    const payload = buildPayload()
    if (payload.length === 0) {
      setResult('Tidak ada baris dengan kolom Nama terisi.')
      return
    }
    try {
      await imp.mutateAsync(payload)
      setResult(`Berhasil mengimpor ${payload.length} pelanggan.`)
      setRows([])
      setHeaders([])
    } catch (e) {
      setResult('Gagal: ' + (e as Error).message)
    }
  }

  const hasFile = headers.length > 0
  const nameMapped = (mapping.name ?? -1) >= 0
  const previewCount = hasFile ? buildPayload().length : 0

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 6 }}>Impor Pelanggan (CSV)</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>
          Pilih berkas CSV (baris pertama = nama kolom), lalu cocokkan kolom ke field pelanggan. Kolom Nama wajib.
        </p>

        <input type="file" accept=".csv,text/csv" onChange={onFile} style={{ fontSize: 13, marginBottom: 14 }} />

        {hasFile && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px', marginBottom: 14 }}>
              {TARGETS.map((t) => (
                <label key={t.key} style={lbl}>
                  {t.label}
                  {t.required && <span style={{ color: 'var(--danger-500)' }}> *</span>}
                  <select
                    style={inp}
                    value={String(mapping[t.key] ?? -1)}
                    onChange={(e) => setMapping({ ...mapping, [t.key]: Number(e.target.value) })}
                  >
                    <option value="-1">— Lewati —</option>
                    {headers.map((h, i) => (
                      <option key={i} value={i}>{h}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
              {previewCount} dari {rows.length} baris siap diimpor
              {previewCount < rows.length && <span style={{ color: 'var(--text-muted)' }}> (sisanya tanpa Nama, dilewati)</span>}.
            </div>
          </>
        )}

        {result && (
          <div style={{ fontSize: 13, marginBottom: 12, color: result.startsWith('Berhasil') ? 'var(--success-500)' : 'var(--danger-500)' }}>
            {result}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button type="button" className="btn-ghost" onClick={onClose}>
            {result?.startsWith('Berhasil') ? 'Tutup' : 'Batal'}
          </button>
          <button
            type="button"
            className="btn-primary"
            disabled={!hasFile || !nameMapped || previewCount === 0 || imp.isPending}
            onClick={doImport}
          >
            {imp.isPending ? 'Mengimpor…' : `Impor ${previewCount || ''}`.trim()}
          </button>
        </div>
      </div>
    </div>
  )
}

const overlay: CSSProperties = {
  position: 'fixed', inset: 0, background: 'rgba(15,29,43,0.5)', display: 'grid',
  placeItems: 'center', padding: 20, zIndex: 50, overflowY: 'auto',
}
const sheet: CSSProperties = {
  width: '100%', maxWidth: 640, background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-xl)', padding: 22,
}
const lbl: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }
const inp: CSSProperties = {
  padding: '7px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)',
  fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-primary)', outline: 'none', background: 'var(--surface-card)',
}

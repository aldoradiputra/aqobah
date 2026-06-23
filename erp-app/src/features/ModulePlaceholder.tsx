import { Panel } from '../components/ui'
import { MODULE_META } from '../lib/nav'

const PHASE_NOTE: Record<string, string> = {
  crm: 'Fase 2 — pelanggan (NIK/NPWP), pipeline kanban, mitra & komisi.',
  sales: 'Fase 3 — transaksi, multi-peserta, kode unik + QR, komisi.',
  ops: 'Fase 4 — tiket pesawat, rooming list, manasik, pemindai QR jamaah.',
  finance: 'Fase 7 — komisi, HPP vs pendapatan, laba-rugi per unit bisnis.',
  hr: 'Fase berikutnya — direktori karyawan & tim lapangan.',
}

export function ModulePlaceholder({ moduleKey }: { moduleKey: string }) {
  const meta = MODULE_META[moduleKey] ?? { title: moduleKey, subtitle: '' }
  return (
    <Panel title={meta.title}>
      <div style={{ padding: '8px 0', maxWidth: 620 }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
          Modul ini akan dibangun pada fase berikutnya dari roadmap.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 10 }}>{PHASE_NOTE[moduleKey] ?? ''}</p>
      </div>
    </Panel>
  )
}

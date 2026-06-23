import { useProducts } from '../lib/queries'
import { Kpi, Panel } from '../components/ui'

export function DashboardPage() {
  const { data: products = [], isLoading, isError } = useProducts()

  const totalPaket = products.length
  const terbit = products.filter((p) => p.is_published).length
  const terjual = products.reduce((sum, p) => sum + (p.sold ?? 0), 0)
  const kapasitas = products.reduce((sum, p) => sum + (p.cap ?? 0), 0)
  const isi = kapasitas > 0 ? Math.round((terjual / kapasitas) * 100) : 0
  const dash = isLoading ? '…' : undefined

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        <Kpi icon="Package" label="Total paket" value={dash ?? String(totalPaket)} accent="var(--brand-primary)" />
        <Kpi icon="TrendingUp" label="Paket terbit" value={dash ?? String(terbit)} accent="var(--indigo-500)" />
        <Kpi icon="Users" label="Kursi terjual" value={dash ?? terjual.toLocaleString('id-ID')} accent="var(--gold-400)" />
        <Kpi icon="ClipboardCheck" label="Tingkat keterisian" value={dash ?? `${isi}%`} accent="var(--success-500)" />
      </div>

      <Panel title="Selamat datang di Aqobah ERP">
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, maxWidth: 680 }}>
          Fondasi baru (Vite + React + TypeScript) sudah berjalan dan terhubung ke Supabase melalui
          SDK resmi. KPI di atas dihitung langsung dari data <strong>produk</strong> nyata. Modul
          berikutnya — autentikasi &amp; peran, konfigurasi produk, CRM, hingga operasional jamaah —
          akan dibangun bertahap sesuai roadmap.
        </p>
        {isError && (
          <p style={{ color: 'var(--danger-500)', fontSize: 13, marginTop: 12 }}>
            Gagal memuat data produk dari Supabase.
          </p>
        )}
      </Panel>
    </div>
  )
}

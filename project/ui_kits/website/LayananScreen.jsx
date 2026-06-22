// Aqobah — Layanan unggulan, Pendanaan & Tabungan, Kemitraan B2B.
const BIZ_UNITS = [
  ['Plane','Umrah','Umroh reguler & private sepanjang tahun.'],
  ['Sparkles','Haji Khusus','Visa resmi, waktu tunggu 5–9 tahun.'],
  ['Palmtree','Wisata Halal','Paket wisata muslim-friendly domestik & luar negeri.'],
  ['Briefcase','B2B','Provider tiket, visa, & layanan korporat.'],
];
const FUNDING_PARTNERS = ['Amitra','Pegadaian Syariah','CIMB Syariah','Bank Jakarta'];
const B2B_SERVICES = [
  ['Gift','Hadiah Karyawan','Apresiasi umrah/wisata sebagai benefit karyawan.'],
  ['Ticket','Hadiah Undian','Paket perjalanan sebagai grand prize program Anda.'],
  ['HeartHandshake','CSR','Program tanggung jawab sosial berbasis perjalanan ibadah.'],
  ['PlaneTakeoff','Provider Tiket','Penyediaan tiket & visa untuk instansi dan agen.'],
];
const TRUSTED_BY = ['Pegadaian','Bank BRI','UIMA','+ lainnya'];

function LY_Ico({ name, size=22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current && window.lucide && lucide[name]) { ref.current.innerHTML=''; ref.current.appendChild(lucide.createElement(lucide[name])); const s=ref.current.querySelector('svg'); if(s){s.setAttribute('width',size);s.setAttribute('height',size);s.setAttribute('stroke-width',1.7);} } });
  return <span ref={ref} style={{display:'flex'}} />;
}

function LayananScreen({ onNav }) {
  const { Button, Badge, Card, SectionHeading } = window.AqobahDesignSystem_6897ec;
  return (
    <div>
      {/* HEADER */}
      <section style={{ background:'var(--surface-deep)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(90% 120% at 85% 10%, rgba(252,176,23,0.14), rgba(0,0,0,0))' }} />
        <div style={{ position:'relative', maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-9) var(--space-6)' }}>
          <SectionHeading onDark eyebrow="Layanan & Kemitraan" title="Empat unit bisnis, satu komitmen #SantunAmanah" subtitle="Dari ibadah ke tanah suci hingga kemitraan korporat — Aqobah melayani individu dan instansi." />
        </div>
      </section>

      {/* BUSINESS UNITS */}
      <section style={{ maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-8) var(--space-6) 0' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'var(--space-5)' }}>
          {BIZ_UNITS.map(([ic,t,d])=>(
            <Card key={t} elevation="sm" padding="lg" interactive>
              <div style={{ width:'48px', height:'48px', borderRadius:'var(--radius-md)', background:'var(--surface-brand-soft)', color:'var(--brand-primary)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'14px' }}><LY_Ico name={ic} /></div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-lg)', margin:'0 0 6px' }}>{t}</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', lineHeight:1.6, color:'var(--text-secondary)', margin:0 }}>{d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* PENDANAAN & TABUNGAN */}
      <section style={{ maxWidth:'var(--container-lg)', margin:'0 auto', padding:'var(--space-10) var(--space-6) 0' }}>
        <div style={{ background:'var(--surface-accent-soft)', borderRadius:'var(--radius-xl)', padding:'var(--space-8)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-7)', alignItems:'center' }}>
          <div>
            <SectionHeading eyebrow="Layanan Unggulan" title="Pendanaan & Tabungan Umrah dan Haji" subtitle="Wujudkan niat ke tanah suci dengan skema pendanaan dan tabungan ringan, bekerja sama dengan mitra keuangan syariah tepercaya." />
            <div style={{ marginTop:'var(--space-5)' }}>
              <Button variant="primary" onClick={()=>onNav('contact')}>Ajukan Pendanaan</Button>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold-600)', marginBottom:'14px' }}>Mitra Pendanaan & Tabungan</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              {FUNDING_PARTNERS.map(p=>(
                <div key={p} style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-md)', padding:'16px 18px', display:'flex', alignItems:'center', gap:'10px', fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'var(--text-sm)', color:'var(--indigo-700)', boxShadow:'var(--shadow-xs)' }}>
                  <span style={{ color:'var(--success-500)' }}><LY_Ico name="Landmark" size={18} /></span>{p}
                </div>
              ))}
            </div>
            <p style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:'12px' }}>dan mitra keuangan syariah lainnya</p>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section style={{ maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-10) var(--space-6) 0' }}>
        <SectionHeading eyebrow="Kerja Sama B2B" title="Program kemitraan untuk Individu & Instansi" subtitle="Aqobah menjadi mitra perjalanan untuk kebutuhan korporat — dari apresiasi karyawan hingga program CSR." align="center" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'var(--space-5)', marginTop:'var(--space-7)' }}>
          {B2B_SERVICES.map(([ic,t,d])=>(
            <div key={t} style={{ display:'flex', flexDirection:'column', gap:'10px', padding:'var(--space-5)', borderRadius:'var(--radius-lg)', border:'1px solid var(--border-subtle)', background:'var(--surface-card)' }}>
              <span style={{ color:'var(--brand-seal)' }}><LY_Ico name={ic} size={26} /></span>
              <h4 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-md)', margin:0 }}>{t}</h4>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', lineHeight:1.6, color:'var(--text-secondary)', margin:0 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <section style={{ maxWidth:'var(--container-lg)', margin:'0 auto', padding:'var(--space-10) var(--space-6) 0' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-sm)', color:'var(--text-muted)', marginBottom:'18px' }}>Dipercaya oleh instansi & perusahaan terkemuka</div>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            {TRUSTED_BY.map(t=>(<span key={t} style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-lg)', color:'var(--neutral-400)', padding:'10px 22px', borderRadius:'var(--radius-md)', background:'var(--surface-sunken)' }}>{t}</span>))}
          </div>
          <p style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:'14px' }}>Referensi lengkap perusahaan & tokoh akan ditampilkan menyusul.</p>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { LayananScreen });

// Aqobah marketing site — shared chrome (header + footer). Exposes to window.
function SiteHeader({ onNav, active }) {
  const { Button } = window.AqobahDesignSystem_6897ec;
  const links = [['Beranda','home'],['Haji Khusus','hajj'],['Paket Umroh','packages'],['Pendanaan & B2B','layanan'],['Kontak','contact']];
  return (
    <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(255,255,255,0.88)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth:'var(--container-xl)', margin:'0 auto', padding:'0 var(--space-6)', height:'74px', display:'flex', alignItems:'center', gap:'var(--space-6)' }}>
        <a onClick={()=>onNav('home')} style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', textDecoration:'none' }}>
          <img src="../../assets/mark-globe.png" alt="Aqobah" style={{ height:'40px' }} />
          <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.5rem', color:'var(--brand-primary)', letterSpacing:'0.01em' }}>AQOBAH</span>
        </a>
        <nav style={{ display:'flex', gap:'4px', marginLeft:'var(--space-5)' }}>
          {links.map(([label,key])=>(
            <a key={key} onClick={()=>onNav(key)} style={{
              fontFamily:'var(--font-ui)', fontSize:'var(--text-sm)', fontWeight:active===key?600:500,
              color:active===key?'var(--brand-primary)':'var(--text-secondary)', cursor:'pointer',
              padding:'8px 14px', borderRadius:'var(--radius-pill)',
              background:active===key?'var(--surface-brand-soft)':'transparent', transition:'all var(--dur-base) var(--ease-out)',
            }}>{label}</a>
          ))}
        </nav>
        <div style={{ marginLeft:'auto', display:'flex', gap:'10px', alignItems:'center' }}>
          <span style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-sm)', fontWeight:600, color:'var(--text-secondary)', whiteSpace:'nowrap' }}>+62 811-1805-330</span>
          <Button variant="primary" size="sm" onClick={()=>onNav('contact')}>Konsultasi Gratis</Button>
        </div>
      </div>
    </header>
  );
}

function SiteFooter({ onNav }) {
  const cols = [
    ['Layanan', ['Umroh Reguler','Umroh Private','Haji Khusus','Provider Visa']],
    ['Perusahaan', ['Tentang Kami','Legalitas & Izin','Mitra & Cabang','Karier']],
    ['Bantuan', ['Hubungi Kami','Pertanyaan Umum','Jadwal Keberangkatan','Panduan Manasik']],
  ];
  return (
    <footer style={{ background:'var(--surface-deep)', color:'rgba(255,255,255,0.82)', marginTop:'var(--space-12)' }}>
      <div style={{ maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-9) var(--space-6) var(--space-6)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:'var(--space-7)' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
              <img src="../../assets/mark-globe.png" alt="Aqobah" style={{ height:'40px' }} />
              <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.4rem', color:'#fff' }}>AQOBAH</span>
            </div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', lineHeight:1.7, maxWidth:'34ch', margin:'0 0 16px' }}>
              Penyelenggara Ibadah Haji Khusus & Umrah. Santun &amp; Amanah sejak 2011 — Akreditasi A.
            </p>
            <div style={{ display:'flex', gap:'8px' }}>
              <span style={{ fontFamily:'var(--font-ui)', fontSize:'11px', fontWeight:600, padding:'5px 11px', borderRadius:'var(--radius-pill)', background:'rgba(255,255,255,0.1)' }}>PIHK 610</span>
              <span style={{ fontFamily:'var(--font-ui)', fontSize:'11px', fontWeight:600, padding:'5px 11px', borderRadius:'var(--radius-pill)', background:'rgba(255,255,255,0.1)' }}>PPIU 579</span>
              <span style={{ fontFamily:'var(--font-ui)', fontSize:'11px', fontWeight:600, padding:'5px 11px', borderRadius:'var(--radius-pill)', background:'var(--gold-300)', color:'var(--indigo-800)' }}>Akreditasi A</span>
            </div>
          </div>
          {cols.map(([h,items])=>(
            <div key={h}>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold-300)', marginBottom:'14px' }}>{h}</div>
              <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:'10px' }}>
                {items.map(it=>(<li key={it}><a onClick={()=>onNav&&onNav('packages')} style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-sm)', color:'rgba(255,255,255,0.8)', cursor:'pointer' }}>{it}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop:'var(--space-7)', paddingTop:'var(--space-5)', borderTop:'1px solid rgba(255,255,255,0.12)', display:'flex', justifyContent:'space-between', fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', color:'rgba(255,255,255,0.6)' }}>
          <span>© 2026 PT. IBS Buana Sejahtera · Tangerang Selatan</span>
          <span>info@aqobah.com · #SantunAmanah</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteHeader, SiteFooter });

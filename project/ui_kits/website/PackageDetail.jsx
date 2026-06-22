// Aqobah marketing site — Package detail + booking screen.
function PackageDetail({ pkg, onNav, onBook }) {
  const { Button, Badge, Card, Input, SectionHeading } = window.AqobahDesignSystem_6897ec;
  const p = pkg || window.AQOBAH_PACKAGES[0];
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <div style={{ maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-7) var(--space-6) 0' }}>
      <a onClick={()=>onNav('home')} style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-sm)', fontWeight:600, color:'var(--text-secondary)', cursor:'pointer', display:'inline-flex', gap:'6px', marginBottom:'var(--space-5)' }}>← Kembali ke Beranda</a>
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'var(--space-7)', alignItems:'start' }}>
        <div>
          <div style={{ position:'relative', borderRadius:'var(--radius-xl)', overflow:'hidden', height:'360px', boxShadow:'var(--shadow-md)' }}>
            <img src={p.image} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <span style={{ position:'absolute', top:'16px', left:'16px' }}><Badge variant={p.badge?.variant||'seal'} soft={false}>{p.badge?.label}</Badge></span>
          </div>
          <div style={{ marginTop:'var(--space-6)' }}>
            <SectionHeading eyebrow={`${p.duration} · ${p.departure}`} title={p.title} subtitle="Program ibadah lengkap dengan bimbingan penuh, akomodasi terbaik, dan pelayanan Santun & Amanah khas Aqobah." />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--space-4)', marginTop:'var(--space-6)' }}>
            {[['Durasi',p.duration],['Keberangkatan',p.departure],['Hotel',`${p.hotelStars} Bintang`]].map(([k,v])=>(
              <Card key={k} elevation="sm" padding="md">
                <div style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', color:'var(--text-muted)', letterSpacing:'0.06em', textTransform:'uppercase' }}>{k}</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-lg)', fontWeight:700, marginTop:'4px' }}>{v}</div>
              </Card>
            ))}
          </div>
          <div style={{ marginTop:'var(--space-6)' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontWeight:700, margin:'0 0 14px' }}>Fasilitas Termasuk</h3>
            <ul style={{ listStyle:'none', margin:0, padding:0, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              {[...p.facilities, 'Air Zamzam 5 liter', 'Perlengkapan ibadah', 'Asuransi perjalanan', 'Manasik sebelum berangkat'].map(f=>(
                <li key={f} style={{ display:'flex', gap:'10px', alignItems:'center', fontFamily:'var(--font-body)', fontSize:'var(--text-base)', color:'var(--text-secondary)' }}>
                  <span style={{ color:'var(--success-500)', flex:'none' }}>✓</span>{f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking rail */}
        <div style={{ position:'sticky', top:'94px' }}>
          <Card elevation="lg" padding="lg" goldTop>
            <div style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>Mulai dari</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)', fontWeight:700, color:'var(--brand-seal)', lineHeight:1.1 }}>{p.price}</div>
            <div style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-sm)', color:'var(--text-secondary)', marginTop:'2px', marginBottom:'var(--space-5)' }}>per jamaah · ★ {p.rating} dari jamaah</div>
            {submitted ? (
              <div style={{ background:'var(--success-50)', borderRadius:'var(--radius-md)', padding:'var(--space-5)', textAlign:'center' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-lg)', fontWeight:700, color:'var(--success-500)' }}>Terima kasih!</div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--text-secondary)', margin:'6px 0 0' }}>Tim kami akan menghubungi Anda via WhatsApp dalam 1×24 jam.</p>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
                <Input label="Nama Lengkap" placeholder="Sesuai paspor" />
                <Input label="No. WhatsApp" placeholder="+62..." hint="Aktif untuk konfirmasi" />
                <Button variant="primary" fullWidth size="lg" onClick={()=>setSubmitted(true)}>Daftar Sekarang</Button>
                <Button variant="seal" fullWidth onClick={()=>setSubmitted(true)}>Tanya via WhatsApp</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PackageDetail });

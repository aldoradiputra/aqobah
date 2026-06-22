// Aqobah marketing site — Home screen sections.
const PACKAGES = [
  { id:'reg12', title:'Umroh Reguler 12 Hari', image:'../../assets/img-kaaba.jpg', badge:{label:'Best Seller',variant:'accent'}, duration:'12 Hari', departure:'Jakarta', hotelStars:4, facilities:['Hotel ⭐4 dekat Masjidil Haram','Pembimbing bersertifikat','Maskapai resmi PP'], price:'Rp 28.900.000', rating:'4.9' },
  { id:'priv9', title:'Umroh Private 9 Hari', image:'../../assets/img-madinah.jpg', badge:{label:'VIP',variant:'seal'}, duration:'9 Hari', departure:'Jakarta · Surabaya', hotelStars:5, facilities:['Hotel ⭐5 view Haram','Muthawif pribadi','Itinerary fleksibel'], price:'Rp 47.500.000', rating:'5.0' },
  { id:'haji', title:'Haji Khusus 1447 H', image:'../../assets/img-group.jpg', badge:{label:'Kuota Resmi',variant:'success'}, duration:'26 Hari', departure:'Jakarta', hotelStars:5, facilities:['Tenda VIP Arafah–Mina','Bimbingan manasik penuh','Kuota PIHK resmi'], price:'Rp 198.000.000', rating:'4.8' },
];

function HomeScreen({ onNav, onSelectPackage }) {
  const { Button, Badge, SectionHeading, StatBlock, PackageCard } = window.AqobahDesignSystem_6897ec;
  return (
    <div>
      {/* HERO */}
      <section style={{ position:'relative', overflow:'hidden', background:'var(--surface-deep)' }}>
        <img src="../../assets/img-hero-makkah.jpg" alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.5 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(15,29,43,0.92) 0%, rgba(20,34,66,0.7) 55%, rgba(20,34,66,0.25) 100%)' }} />
        <div style={{ position:'relative', maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-12) var(--space-6)' }}>
          <div style={{ maxWidth:'640px', display:'flex', flexDirection:'column', gap:'var(--space-5)' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:'10px', fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', fontWeight:600, letterSpacing:'var(--tracking-eyebrow)', textTransform:'uppercase', color:'var(--gold-300)' }}>
              <span style={{ width:'22px', height:'2px', background:'var(--gold-300)', borderRadius:'2px' }} />Penyelenggara Resmi · Akreditasi A
            </span>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-4xl)', lineHeight:1.08, color:'#fff', margin:0, textWrap:'balance' }}>
              Ibadah yang Santun &amp; Amanah, ke Tanah Suci
            </h1>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-md)', lineHeight:1.7, color:'rgba(255,255,255,0.86)', margin:0, maxWidth:'52ch' }}>
              16 tahun mendampingi lebih dari 10.000 jamaah haji &amp; umrah — dari rombongan besar hingga tamu VIP dengan permintaan khusus.
            </p>
            <div style={{ display:'flex', gap:'12px', marginTop:'4px' }}>
              <Button variant="accent" size="lg" onClick={()=>onNav('packages')}>Lihat Paket Umroh</Button>
              <Button variant="secondary" size="lg" onClick={()=>onNav('contact')} style={{ background:'rgba(255,255,255,0.1)', color:'#fff', borderColor:'rgba(255,255,255,0.3)' }}>Konsultasi via WhatsApp</Button>
            </div>
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section style={{ background:'var(--brand-primary)' }}>
        <div style={{ maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-6)', display:'flex', gap:'var(--space-8)', flexWrap:'wrap' }}>
          <StatBlock value="16 Thn" label="Pengalaman beroperasi" onDark />
          <StatBlock value="10.000+" label="Jamaah & wisatawan" onDark />
          <StatBlock value="40" label="Mitra & cabang" onDark />
          <StatBlock value="4.8/5.0" label="Penilaian pelanggan" onDark />
        </div>
      </section>

      {/* PACKAGES */}
      <section style={{ maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-10) var(--space-6) 0' }}>
        <SectionHeading eyebrow="Paket Pilihan" title="Berangkat dengan tenang, setiap pekan" subtitle="Pilihan paket umrah dan haji khusus dengan hotel dekat Masjidil Haram dan pembimbing bersertifikat." align="center" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'var(--space-5)', marginTop:'var(--space-7)' }}>
          {PACKAGES.map(p=>(<PackageCard key={p.id} {...p} onSelect={()=>onSelectPackage(p)} />))}
        </div>
      </section>

      {/* PROMISE */}
      <section style={{ maxWidth:'var(--container-lg)', margin:'0 auto', padding:'var(--space-10) var(--space-6) 0' }}>
        <div style={{ background:'var(--surface-accent-soft)', borderRadius:'var(--radius-xl)', padding:'var(--space-8)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-7)', alignItems:'center' }}>
          <div>
            <SectionHeading eyebrow="Komitmen Kami" title="#SantunAmanah dalam setiap langkah" subtitle="Dari pengurusan visa hingga bimbingan manasik, kami memastikan ibadah Anda bermakna dan penuh kebahagiaan." />
          </div>
          <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:'14px' }}>
            {['Izin resmi PIHK 610 & PPIU 579','Pembimbing ibadah bersertifikat','Hotel berjarak dekat dari Haram','Pendampingan tamu VIP & big group'].map(t=>(
              <li key={t} style={{ display:'flex', gap:'12px', alignItems:'center', fontFamily:'var(--font-body)', fontSize:'var(--text-md)', color:'var(--text-primary)' }}>
                <span style={{ flex:'none', width:'28px', height:'28px', borderRadius:'50%', background:'var(--gold-300)', color:'var(--indigo-800)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>✓</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomeScreen, AQOBAH_PACKAGES: PACKAGES });

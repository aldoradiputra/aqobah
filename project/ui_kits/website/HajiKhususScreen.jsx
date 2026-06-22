// Aqobah — Haji Khusus product page (real brochure data).
const HAJI_PACKAGES = {
  vip: {
    name: 'VIP', tagline: 'Fasilitas tertinggi, hotel bintang 5 dua kota',
    hotels: [['Makkah','Swiss Al Maqam',5],['Madinah','Movenpick',5],['Jeddah','Mercure',4]],
    tiers: [['270','USD 15.500','QUAD'],['288','USD 16.500','TRIPLE'],['306','USD 17.500','DOUBLE']],
  },
  premium: {
    name: 'Premium', tagline: 'Hotel Makkah bintang 5, nilai terbaik',
    hotels: [['Makkah','Anjum',5],['Madinah','Saja',4],['Jeddah','Mercure',4]],
    tiers: [['230','USD 13.500','QUAD'],['250','USD 14.500','TRIPLE'],['270','USD 15.500','DOUBLE']],
  },
  mabrur: {
    name: 'Mabrur', tagline: 'Paket hemat, tetap nyaman & lengkap',
    hotels: [['Makkah','Ajyad Makarem',4],['Madinah','Grand Plaza',4],['Jeddah','Mercure',4]],
    tiers: [['190','USD 11.000','QUAD'],['200','USD 12.000','TRIPLE'],['220','USD 13.000','DOUBLE']],
  },
};

const FACILITIES = [
  ['BedDouble','Hotel','Penginapan nyaman berfasilitas lengkap, memastikan kenyamanan selama beribadah.'],
  ['UserCheck','Muthawif','Pendamping jamaah berpengalaman membimbing sesuai sunnah sepanjang perjalanan.'],
  ['Crown','Maktab VIP','Layanan eksklusif di maktab dengan fasilitas premium dan layanan khusus.'],
  ['Stethoscope','Dokter Pribadi','Layanan kesehatan dengan dokter pribadi yang siap menjaga kondisi jamaah.'],
  ['Plane','Tiket Pesawat','Penerbangan nyaman dan tepat waktu dengan maskapai internasional terbaik.'],
  ['UtensilsCrossed','Konsumsi','Makanan halal dan bergizi yang mendukung kebutuhan jamaah selama ibadah.'],
  ['Building2','Apartemen Transit','Apartemen nyaman untuk transit sebelum puncak haji, fasilitas lengkap.'],
  ['Bus','Bus AC','Transportasi ber-AC untuk kenyamanan perjalanan antara tempat ibadah dan akomodasi.'],
  ['BookOpenText','Asatidz Pembimbing','Bimbingan ibadah oleh asatidz bersertifikat sepanjang rangkaian manasik.'],
];

const ASATIDZ = ['Ustadz Ahmad Najihan Maududi, S.S.I., MA','Ustadz Chairul Anwar','Ustadz Ahmad Masyhuri'];
const AIRLINES = ['Qatar Airways','Emirates','Saudia'];

function HK_Ico({ name, size=22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current && window.lucide && lucide[name]) { ref.current.innerHTML=''; ref.current.appendChild(lucide.createElement(lucide[name])); const s=ref.current.querySelector('svg'); if(s){s.setAttribute('width',size);s.setAttribute('height',size);s.setAttribute('stroke-width',1.7);} } });
  return <span ref={ref} style={{display:'flex'}} />;
}

function Stars({ n }) {
  return <span style={{ color:'var(--gold-400)', fontSize:'0.8em', letterSpacing:'1px' }}>{'★'.repeat(n)}</span>;
}

function HajiKhususScreen({ onNav }) {
  const { Button, Badge, Card, SectionHeading, PricingTier } = window.AqobahDesignSystem_6897ec;
  const [tier, setTier] = React.useState('vip');
  const pkg = HAJI_PACKAGES[tier];

  return (
    <div>
      {/* HERO */}
      <section style={{ position:'relative', overflow:'hidden' }}>
        <img src="../../assets/img-arafah.jpg" alt="Jamaah di Arafah" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(15,29,43,0.86) 0%, rgba(20,34,66,0.62) 55%, rgba(15,29,43,0.5) 100%)' }} />
        <div style={{ position:'relative', maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-10) var(--space-6)' }}>
          <div style={{ maxWidth:'660px', display:'flex', flexDirection:'column', gap:'18px' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:'10px', fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', fontWeight:600, letterSpacing:'var(--tracking-eyebrow)', textTransform:'uppercase', color:'var(--gold-300)' }}>
              <span style={{ width:'22px', height:'2px', background:'var(--gold-300)', borderRadius:'2px' }} />#LebihCepatDanNyamanBerhaji
            </span>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-4xl)', lineHeight:1.06, color:'#fff', margin:0 }}>Haji Khusus</h1>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-md)', lineHeight:1.7, color:'rgba(255,255,255,0.9)', margin:0, maxWidth:'56ch' }}>
              Paket perjalanan haji dengan visa resmi pemerintah Indonesia — waktu tunggu lebih cepat <strong style={{color:'var(--gold-300)'}}>5–9 tahun</strong> dan jauh lebih nyaman dibanding haji reguler.
            </p>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginTop:'4px' }}>
              <Badge variant="seal" soft={false}>PIHK 610</Badge>
              <Badge variant="accent" soft={false}>DP USD 5.000</Badge>
              <Badge variant="brand" soft={false}>Kuota Resmi Terbatas</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section style={{ maxWidth:'var(--container-lg)', margin:'0 auto', padding:'var(--space-9) var(--space-6) 0' }}>
        <SectionHeading eyebrow="Apa itu Haji Khusus?" title="Lebih cepat berangkat, lebih nyaman beribadah" subtitle="Kami menawarkan paket haji khusus dengan fasilitas terbaik untuk memenuhi kebutuhan dan kenyamanan Anda. Temukan paket yang tepat untuk Anda." align="center" />
      </section>

      {/* PACKAGE SELECTOR */}
      <section style={{ maxWidth:'var(--container-lg)', margin:'0 auto', padding:'var(--space-7) var(--space-6) 0' }}>
        <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginBottom:'var(--space-6)' }}>
          {Object.keys(HAJI_PACKAGES).map(k=>(
            <button key={k} onClick={()=>setTier(k)} style={{
              fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'var(--text-sm)', cursor:'pointer',
              padding:'11px 26px', borderRadius:'var(--radius-pill)', border:'1.5px solid',
              borderColor: tier===k ? 'var(--brand-primary)' : 'var(--border-default)',
              background: tier===k ? 'var(--brand-primary)' : 'var(--surface-card)',
              color: tier===k ? '#fff' : 'var(--text-secondary)',
              transition:'all var(--dur-base) var(--ease-out)',
            }}>Haji Khusus {HAJI_PACKAGES[k].name}</button>
          ))}
        </div>

        <Card elevation="lg" padding="lg" goldTop>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.25fr', gap:'var(--space-7)', alignItems:'center' }}>
            {/* hotels */}
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px' }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-2xl)', margin:0, color:'var(--indigo-700)' }}>Haji Khusus {pkg.name}</h3>
                {tier==='vip' && <Badge variant="accent" soft={false}>Terlaris</Badge>}
              </div>
              <p style={{ fontFamily:'var(--font-body)', color:'var(--text-secondary)', margin:'0 0 20px', fontSize:'var(--text-base)' }}>{pkg.tagline}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                {pkg.hotels.map(([city,hotel,stars])=>(
                  <div key={city} style={{ display:'flex', alignItems:'center', gap:'12px', paddingBottom:'12px', borderBottom:'1px solid var(--border-subtle)' }}>
                    <span style={{ flex:'none', color:'var(--brand-primary)' }}><HK_Ico name="MapPin" size={18} /></span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Hotel {city}</div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-md)' }}>{hotel} <Stars n={stars} /> <span style={{fontFamily:'var(--font-ui)', fontWeight:400, fontSize:'var(--text-xs)', color:'var(--text-muted)'}}>/ setaraf</span></div>
                    </div>
                  </div>
                ))}
                <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                  <span style={{ flex:'none', color:'var(--brand-primary)' }}><HK_Ico name="Building2" size={18} /></span>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-md)' }}>Apartment Transit · Maktab VIP</div>
                </div>
              </div>
            </div>
            {/* pricing */}
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px', alignItems:'end' }}>
                {pkg.tiers.map(([p,u,o],i)=>(<PricingTier key={o} price={p} usd={u} occupancy={o} featured={i===1} />))}
              </div>
              <ul style={{ listStyle:'none', margin:'18px 0 0', padding:0, display:'flex', flexDirection:'column', gap:'7px' }}>
                {['Harga rupiah dihitung dengan kurs 17.500','Harga final dihitung kembali pada tahun keberangkatan','Fasilitas & program dapat menyesuaikan tahun keberangkatan'].map(t=>(
                  <li key={t} style={{ display:'flex', gap:'8px', fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', color:'var(--text-muted)' }}><span>•</span>{t}</li>
                ))}
              </ul>
              <div style={{ display:'flex', gap:'10px', marginTop:'18px' }}>
                <Button variant="primary" onClick={()=>onNav('contact')}>Daftar Sekarang</Button>
                <Button variant="seal" onClick={()=>onNav('contact')}>Tanya Kuota</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* airlines */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'18px', marginTop:'var(--space-6)', flexWrap:'wrap' }}>
          <span style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-sm)', fontWeight:600, color:'var(--text-muted)' }}>Maskapai:</span>
          {AIRLINES.map(a=>(<span key={a} style={{ fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'var(--text-sm)', color:'var(--indigo-600)', padding:'8px 16px', background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-pill)', boxShadow:'var(--shadow-xs)' }}>{a}</span>))}
        </div>
      </section>

      {/* FACILITIES */}
      <section style={{ maxWidth:'var(--container-xl)', margin:'0 auto', padding:'var(--space-10) var(--space-6) 0' }}>
        <SectionHeading eyebrow="Fasilitas Haji Khusus" title="Sembilan layanan untuk ketenangan ibadah Anda" align="center" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--space-6) var(--space-7)', marginTop:'var(--space-7)' }}>
          {FACILITIES.map(([ic,t,d])=>(
            <div key={t} style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
              <div style={{ flex:'none', width:'48px', height:'48px', borderRadius:'var(--radius-md)', background:'var(--surface-brand-soft)', color:'var(--brand-primary)', display:'flex', alignItems:'center', justifyContent:'center' }}><HK_Ico name={ic} /></div>
              <div>
                <h4 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-md)', margin:'0 0 4px' }}>{t}</h4>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', lineHeight:1.6, color:'var(--text-secondary)', margin:0 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ASATIDZ */}
      <section style={{ maxWidth:'var(--container-lg)', margin:'0 auto', padding:'var(--space-10) var(--space-6) 0' }}>
        <SectionHeading eyebrow="Asatidz Pembimbing" title="Dibimbing oleh para asatidz tepercaya" align="center" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--space-5)', marginTop:'var(--space-7)' }}>
          {ASATIDZ.map(name=>(
            <Card key={name} elevation="sm" padding="lg" style={{ textAlign:'center' }}>
              <div style={{ width:'64px', height:'64px', borderRadius:'50%', margin:'0 auto 14px', background:'var(--surface-deep)', color:'var(--gold-300)', display:'flex', alignItems:'center', justifyContent:'center' }}><HK_Ico name="UserRound" size={28} /></div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-md)', color:'var(--text-primary)' }}>{name}</div>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'var(--text-xs)', color:'var(--brand-primary)', marginTop:'4px', letterSpacing:'0.04em' }}>Pembimbing Haji Khusus</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth:'var(--container-lg)', margin:'0 auto', padding:'var(--space-10) var(--space-6) 0' }}>
        <div style={{ background:'var(--surface-deep)', borderRadius:'var(--radius-xl)', padding:'var(--space-8)', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'18px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(100% 120% at 80% 0%, rgba(252,176,23,0.16), rgba(0,0,0,0))' }} />
          <h2 style={{ position:'relative', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-2xl)', color:'#fff', margin:0, maxWidth:'20ch' }}>Segera Daftar, Kuota Terbatas!</h2>
          <p style={{ position:'relative', fontFamily:'var(--font-body)', color:'rgba(255,255,255,0.82)', margin:0 }}>Hubungi tim haji khusus kami: <strong style={{color:'var(--gold-300)'}}>0813-8996-2073</strong></p>
          <div style={{ position:'relative', display:'flex', gap:'10px' }}>
            <Button variant="accent" size="lg" onClick={()=>onNav('contact')}>Konsultasi Gratis</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HajiKhususScreen });

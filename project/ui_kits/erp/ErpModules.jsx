// Aqobah ERP — module screens (dashboard + CRM, Sales, Produk, Ops, Keuangan, HR).

// ---------- DASHBOARD ----------
function ErpDashboard() {
  const { Kpi, DataTable, Pill, Panel, E_Ico, ERP_UNITS } = window;
  const unitRevenue = [['Haji Khusus', 62, 'var(--indigo-500)'],['Umrah', 24, 'var(--blue-500)'],['Wisata Halal', 9, 'var(--gold-300)'],['B2B', 5, 'var(--maroon-500)']];
  const departures = [
    ['Umroh Reguler 12H','24 Sep 2026','Jakarta',42,45],
    ['Haji Khusus VIP','05 Mei 2026','Jakarta',18,20],
    ['Umroh Private 9H','11 Okt 2026','Surabaya',8,12],
  ];
  const orders = [
    ['#SO-20461','H. Sulaiman','Haji Khusus VIP','Rp 306.000.000','green','Lunas'],
    ['#SO-20460','Hj. Aminah','Umroh Reguler 12H','Rp 28.900.000','amber','Cicilan'],
    ['#SO-20459','Rizky Pratama','Umroh Private 9H','Rp 47.500.000','blue','DP'],
    ['#SO-20458','PT Karya Abadi','B2B · 30 Tiket','Rp 124.000.000','green','Lunas'],
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'18px' }}>
        <Kpi icon="Wallet" label="Pendapatan bulan ini" value="Rp 4,82 M" delta="12,4%" accent="var(--brand-primary)" />
        <Kpi icon="Users" label="Jamaah aktif" value="1.284" delta="8,1%" accent="var(--indigo-500)" />
        <Kpi icon="ShoppingCart" label="Sales order baru" value="96" delta="5,2%" accent="var(--gold-400)" />
        <Kpi icon="CircleAlert" label="Pembayaran tertunda" value="Rp 612 Jt" delta="3,0%" deltaUp={false} accent="var(--maroon-500)" />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:'22px' }}>
        <Panel title="Pendapatan per Unit Bisnis" action={<span style={{fontSize:'12px',color:'var(--text-muted)'}}>Kuartal berjalan</span>}>
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            {unitRevenue.map(([name,pct,col])=>(
              <div key={name}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'6px' }}>
                  <span style={{ fontWeight:600 }}>{name}</span><span style={{ color:'var(--text-muted)' }}>{pct}%</span>
                </div>
                <div style={{ height:'10px', borderRadius:'var(--radius-pill)', background:'var(--surface-sunken)', overflow:'hidden' }}>
                  <div style={{ width:pct+'%', height:'100%', background:col, borderRadius:'var(--radius-pill)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Keberangkatan Mendatang">
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            {departures.map(([name,date,dep,sold,cap])=>(
              <div key={name} style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <span style={{ width:'40px', height:'40px', borderRadius:'var(--radius-sm)', background:'var(--surface-brand-soft)', color:'var(--brand-primary)', display:'flex', alignItems:'center', justifyContent:'center', flex:'none' }}><E_Ico name="PlaneTakeoff" size={18} color="var(--brand-primary)" /></span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:'13px', fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</div>
                  <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{date} · {dep}</div>
                </div>
                <div style={{ textAlign:'right', flex:'none' }}>
                  <div style={{ fontSize:'13px', fontWeight:700, fontVariantNumeric:'tabular-nums' }}>{sold}/{cap}</div>
                  <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>kursi</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Sales Order Terbaru" action={<span style={{fontSize:'13px',color:'var(--brand-primary)',fontWeight:600,cursor:'pointer'}}>Lihat semua →</span>} style={{ padding:0 }}>
        <DataTable
          columns={[
            {key:'id',label:'Order'},
            {key:'name',label:'Jamaah / Klien'},
            {key:'pkg',label:'Paket'},
            {key:'total',label:'Nilai',align:'right',render:r=>(<span style={{fontWeight:600,fontVariantNumeric:'tabular-nums'}}>{r.total}</span>)},
            {key:'status',label:'Status',render:r=>(<Pill tone={r.tone}>{r.status}</Pill>)},
          ]}
          rows={orders.map(([id,name,pkg,total,tone,status])=>({id,name,pkg,total,tone,status}))}
        />
      </Panel>
    </div>
  );
}

// ---------- CRM ----------
function ErpCrm() {
  const { DataTable, Pill, Panel, Kpi } = window;
  const leads = [
    ['Sulaiman Hadi','Haji Khusus VIP','Instagram','seal','Booking','2 jam lalu'],
    ['Aminah Zahra','Umroh Reguler 12H','WhatsApp','red','Hot Lead','Hari ini'],
    ['Rizky Pratama','Umroh Private 9H','Referral','blue','Negosiasi','Kemarin'],
    ['Dewi Lestari','Wisata Halal Turki','Website','gold','Follow-up','2 hari lalu'],
    ['PT Karya Abadi','B2B Provider Tiket','Sales Visit','green','Closing','3 hari lalu'],
    ['Budi Santoso','Haji Khusus Mabrur','WhatsApp','neutral','Lead Baru','3 hari lalu'],
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'18px' }}>
        <Kpi icon="UserPlus" label="Lead baru (minggu ini)" value="48" accent="var(--brand-primary)" />
        <Kpi icon="Flame" label="Hot leads" value="17" accent="var(--maroon-500)" />
        <Kpi icon="CalendarCheck" label="Booking dikonfirmasi" value="29" accent="var(--success-500)" />
        <Kpi icon="Percent" label="Conversion rate" value="34%" accent="var(--gold-400)" />
      </div>
      <Panel title="Pipeline Jamaah & Klien" action={<span style={{fontSize:'13px',color:'var(--brand-primary)',fontWeight:600,cursor:'pointer'}}>+ Tambah Lead</span>} style={{ padding:0 }}>
        <DataTable
          columns={[
            {key:'name',label:'Nama'},
            {key:'pkg',label:'Minat Paket'},
            {key:'src',label:'Sumber'},
            {key:'stage',label:'Tahap',render:r=>(<Pill tone={r.tone}>{r.stage}</Pill>)},
            {key:'last',label:'Kontak terakhir',align:'right'},
          ]}
          rows={leads.map(([name,pkg,src,tone,stage,last])=>({name,pkg,src,tone,stage,last}))}
        />
      </Panel>
    </div>
  );
}

// ---------- SALES ----------
function ErpSales() {
  const { DataTable, Pill, Panel, Kpi } = window;
  const rows = [
    ['#SO-20461','H. Sulaiman','Haji Khusus VIP','Double','Rp 306.000.000','Rp 306.000.000','green','Lunas'],
    ['#SO-20460','Hj. Aminah','Umroh Reguler 12H','Quad','Rp 28.900.000','Rp 15.000.000','amber','Cicilan'],
    ['#SO-20459','Rizky Pratama','Umroh Private 9H','Double','Rp 47.500.000','Rp 5.000.000','blue','DP'],
    ['#SO-20458','PT Karya Abadi','B2B · 30 Tiket','—','Rp 124.000.000','Rp 124.000.000','green','Lunas'],
    ['#SO-20457','Dewi Lestari','Wisata Halal Turki','Triple','Rp 32.000.000','Rp 0','red','Menunggu DP'],
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'18px' }}>
        <Kpi icon="Receipt" label="Order bulan ini" value="96" delta="5,2%" accent="var(--brand-primary)" />
        <Kpi icon="Banknote" label="Nilai order" value="Rp 6,1 M" delta="9,8%" accent="var(--success-500)" />
        <Kpi icon="Hourglass" label="Outstanding" value="Rp 612 Jt" deltaUp={false} delta="3,0%" accent="var(--maroon-500)" />
        <Kpi icon="CheckCheck" label="Lunas" value="71%" accent="var(--gold-400)" />
      </div>
      <Panel title="Daftar Sales Order" action={<span style={{fontSize:'13px',color:'var(--brand-primary)',fontWeight:600,cursor:'pointer'}}>+ Order Baru</span>} style={{ padding:0 }}>
        <DataTable
          columns={[
            {key:'id',label:'Order'},
            {key:'name',label:'Jamaah / Klien'},
            {key:'pkg',label:'Paket'},
            {key:'occ',label:'Okupansi'},
            {key:'total',label:'Total',align:'right',render:r=>(<span style={{fontWeight:600,fontVariantNumeric:'tabular-nums'}}>{r.total}</span>)},
            {key:'paid',label:'Terbayar',align:'right',render:r=>(<span style={{color:'var(--text-secondary)',fontVariantNumeric:'tabular-nums'}}>{r.paid}</span>)},
            {key:'status',label:'Status',render:r=>(<Pill tone={r.tone}>{r.status}</Pill>)},
          ]}
          rows={rows.map(([id,name,pkg,occ,total,paid,tone,status])=>({id,name,pkg,occ,total,paid,tone,status}))}
        />
      </Panel>
    </div>
  );
}

// ---------- PRODUCTS ----------
function ErpProducts() {
  const { Pill, Panel } = window;
  const products = [
    ['Haji Khusus VIP','Haji Khusus','Rp 270–306 Jt','18/20','seal'],
    ['Haji Khusus Premium','Haji Khusus','Rp 230–270 Jt','12/20','seal'],
    ['Haji Khusus Mabrur','Haji Khusus','Rp 190–220 Jt','9/20','seal'],
    ['Umroh Reguler 12 Hari','Umrah','Rp 28,9 Jt','42/45','blue'],
    ['Umroh Private 9 Hari','Umrah','Rp 47,5 Jt','8/12','blue'],
    ['Wisata Halal Turki','Wisata Halal','Rp 32 Jt','15/30','gold'],
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'18px' }}>
      {products.map(([name,unit,price,seats,tone])=>{
        const [sold,cap]=seats.split('/').map(Number); const pct=Math.round(sold/cap*100);
        return (
          <div key={name} style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:'20px', boxShadow:'var(--shadow-xs)', display:'flex', flexDirection:'column', gap:'12px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'10px' }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', margin:0 }}>{name}</h3>
              <Pill tone={tone}>{unit}</Pill>
            </div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.3rem', color:'var(--brand-seal)' }}>{price}</div>
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', color:'var(--text-muted)', marginBottom:'5px' }}><span>Kursi terisi</span><span>{seats}</span></div>
              <div style={{ height:'8px', borderRadius:'var(--radius-pill)', background:'var(--surface-sunken)', overflow:'hidden' }}>
                <div style={{ width:pct+'%', height:'100%', background: pct>85?'var(--danger-500)':'var(--success-500)', borderRadius:'var(--radius-pill)' }}></div>
              </div>
            </div>
            <div style={{ display:'flex', gap:'8px', marginTop:'2px' }}>
              <button style={{ flex:1, fontFamily:'var(--font-ui)', fontSize:'13px', fontWeight:600, padding:'9px', borderRadius:'var(--radius-sm)', border:'1px solid var(--border-default)', background:'var(--surface-card)', color:'var(--text-secondary)', cursor:'pointer' }}>Detail</button>
              <button style={{ flex:1, fontFamily:'var(--font-ui)', fontSize:'13px', fontWeight:600, padding:'9px', borderRadius:'var(--radius-sm)', border:'none', background:'var(--brand-primary)', color:'#fff', cursor:'pointer' }}>Kelola</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- OPERATIONS ----------
function ErpOps() {
  const { Panel, Pill, DataTable } = window;
  const docs = [
    ['Sulaiman Hadi','Haji Khusus VIP','green','green','green','amber'],
    ['Aminah Zahra','Umroh Reguler 12H','green','green','amber','neutral'],
    ['Rizky Pratama','Umroh Private 9H','green','amber','neutral','neutral'],
    ['Dewi Lestari','Wisata Halal Turki','green','green','green','green'],
  ];
  const mark = (t)=> t==='green'?'Lengkap': t==='amber'?'Proses':'Belum';
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
      <Panel title="Checklist Dokumen Jamaah" action={<span style={{fontSize:'12px',color:'var(--text-muted)'}}>Paspor · Visa · Vaksin · Manasik</span>} style={{ padding:0 }}>
        <DataTable
          columns={[
            {key:'name',label:'Jamaah'},
            {key:'pkg',label:'Paket'},
            {key:'paspor',label:'Paspor',render:r=>(<Pill tone={r.paspor}>{mark(r.paspor)}</Pill>)},
            {key:'visa',label:'Visa',render:r=>(<Pill tone={r.visa}>{mark(r.visa)}</Pill>)},
            {key:'vaksin',label:'Vaksin',render:r=>(<Pill tone={r.vaksin}>{mark(r.vaksin)}</Pill>)},
            {key:'manasik',label:'Manasik',render:r=>(<Pill tone={r.manasik}>{mark(r.manasik)}</Pill>)},
          ]}
          rows={docs.map(([name,pkg,paspor,visa,vaksin,manasik])=>({name,pkg,paspor,visa,vaksin,manasik}))}
        />
      </Panel>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'22px' }}>
        <Panel title="Jadwal Manasik">
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {[['Manasik Akbar Umroh','28 Sep 2026','Aula Kantor Pusat'],['Bimbingan Haji Khusus','02 Apr 2026','Hotel Santika BSD'],['Manasik Private Group','05 Okt 2026','Online · Zoom']].map(([t,d,loc])=>(
              <div key={t} style={{ display:'flex', gap:'12px', alignItems:'center', paddingBottom:'12px', borderBottom:'1px solid var(--border-subtle)' }}>
                <div style={{ width:'46px', textAlign:'center', flex:'none' }}><div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', color:'var(--brand-primary)' }}>{d.split(' ')[0]}</div><div style={{ fontSize:'10px', textTransform:'uppercase', color:'var(--text-muted)' }}>{d.split(' ')[1]}</div></div>
                <div><div style={{ fontSize:'13px', fontWeight:600 }}>{t}</div><div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{loc}</div></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Vendor & Logistik">
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {[['Hotel Swiss Al Maqam','Makkah · 20 kamar','green','Confirmed'],['Qatar Airways','45 seat · CGK–JED','green','Ticketed'],['Bus AC Armada','3 unit · Madinah','amber','Pending'],['Catering Maktab','Arafah–Mina','blue','Booked']].map(([v,d,tone,st])=>(
              <div key={v} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ flex:1 }}><div style={{ fontSize:'13px', fontWeight:600 }}>{v}</div><div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{d}</div></div>
                <Pill tone={tone}>{st}</Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

// ---------- FINANCE ----------
function ErpFinance() {
  const { Kpi, Panel, DataTable, Pill } = window;
  const ledger = [
    ['12 Jun','Pelunasan SO-20461','Haji Khusus','in','Rp 291.000.000'],
    ['11 Jun','DP Umroh Private SO-20459','Umrah','in','Rp 5.000.000'],
    ['10 Jun','Pembayaran Hotel Movenpick','Haji Khusus','out','Rp 480.000.000'],
    ['09 Jun','Tiket Qatar Airways (45 pax)','Umrah','out','Rp 720.000.000'],
    ['08 Jun','Invoice B2B PT Karya Abadi','B2B','in','Rp 124.000.000'],
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'18px' }}>
        <Kpi icon="TrendingUp" label="Pemasukan (MTD)" value="Rp 4,82 M" delta="12,4%" accent="var(--success-500)" />
        <Kpi icon="TrendingDown" label="Pengeluaran (MTD)" value="Rp 3,15 M" delta="6,7%" deltaUp={false} accent="var(--maroon-500)" />
        <Kpi icon="PiggyBank" label="Laba kotor" value="Rp 1,67 M" delta="18,2%" accent="var(--brand-primary)" />
        <Kpi icon="FileClock" label="Piutang jatuh tempo" value="Rp 612 Jt" accent="var(--gold-400)" />
      </div>
      <Panel title="Buku Kas & Bank" action={<span style={{fontSize:'13px',color:'var(--brand-primary)',fontWeight:600,cursor:'pointer'}}>Ekspor</span>} style={{ padding:0 }}>
        <DataTable
          columns={[
            {key:'date',label:'Tanggal'},
            {key:'desc',label:'Keterangan'},
            {key:'unit',label:'Unit',render:r=>(<Pill tone={r.unit==='Haji Khusus'?'seal':r.unit==='Umrah'?'blue':'gold'}>{r.unit}</Pill>)},
            {key:'amount',label:'Jumlah',align:'right',render:r=>(<span style={{fontWeight:600,fontVariantNumeric:'tabular-nums',color:r.dir==='in'?'var(--success-500)':'var(--danger-500)'}}>{r.dir==='in'?'+ ':'− '}{r.amount}</span>)},
          ]}
          rows={ledger.map(([date,desc,unit,dir,amount])=>({date,desc,unit,dir,amount}))}
        />
      </Panel>
    </div>
  );
}

// ---------- HR ----------
function ErpHr() {
  const { Kpi, Panel, DataTable, Pill } = window;
  const staff = [
    ['Ahmad Najihan Maududi','Asatidz Pembimbing','Operasional','green','Aktif'],
    ['Chairul Anwar','Asatidz Pembimbing','Operasional','green','Aktif'],
    ['Ahmad Masyhuri','Muthawif Senior','Operasional','blue','Bertugas'],
    ['Siti Rahmawati','Sales Consultant','Sales & CRM','green','Aktif'],
    ['Fauzan Akbar','Finance Officer','Keuangan','green','Aktif'],
    ['Nurul Hidayah','Customer Care','Layanan','amber','Cuti'],
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'18px' }}>
        <Kpi icon="Users" label="Total karyawan" value="64" accent="var(--brand-primary)" />
        <Kpi icon="UserCheck" label="Hadir hari ini" value="58" accent="var(--success-500)" />
        <Kpi icon="Plane" label="Bertugas di tanah suci" value="6" accent="var(--gold-400)" />
        <Kpi icon="Building" label="Cabang & mitra" value="40" accent="var(--indigo-500)" />
      </div>
      <Panel title="Direktori Karyawan & Tim Lapangan" action={<span style={{fontSize:'13px',color:'var(--brand-primary)',fontWeight:600,cursor:'pointer'}}>+ Tambah</span>} style={{ padding:0 }}>
        <DataTable
          columns={[
            {key:'name',label:'Nama',render:r=>(
              <span style={{display:'inline-flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'30px',height:'30px',borderRadius:'50%',background:'var(--surface-deep)',color:'var(--gold-300)',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:700}}>{r.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</span>
                <span style={{fontWeight:600}}>{r.name}</span>
              </span>)},
            {key:'role',label:'Jabatan'},
            {key:'dept',label:'Divisi'},
            {key:'status',label:'Status',render:r=>(<Pill tone={r.tone}>{r.status}</Pill>)},
          ]}
          rows={staff.map(([name,role,dept,tone,status])=>({name,role,dept,tone,status}))}
        />
      </Panel>
    </div>
  );
}

Object.assign(window, { ErpDashboard, ErpCrm, ErpSales, ErpProducts, ErpOps, ErpFinance, ErpHr });

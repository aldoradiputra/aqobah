// Aqobah ERP — admin shell (sidebar + topbar) and shared UI helpers.
const ERP_NAV = [
  ['LayoutDashboard','Dashboard','dashboard'],
  ['Users','CRM','crm'],
  ['ShoppingCart','Sales Order','sales'],
  ['Package','Produk','products'],
  ['ClipboardCheck','Operasional','ops'],
  ['Wallet','Keuangan','finance'],
  ['UserCog','SDM / HR','hr'],
];
const ERP_UNITS = ['Umrah','Haji Khusus','Wisata Halal','B2B'];

function E_Ico({ name, size=18, color }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current && window.lucide && lucide[name]) { ref.current.innerHTML=''; ref.current.appendChild(lucide.createElement(lucide[name])); const s=ref.current.querySelector('svg'); if(s){s.setAttribute('width',size);s.setAttribute('height',size);s.setAttribute('stroke-width',1.8); if(color) s.setAttribute('stroke',color);} } });
  return <span ref={ref} style={{display:'flex'}} />;
}

function ErpShell({ active, onNav, title, subtitle, actions, children }) {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--surface-page)', fontFamily:'var(--font-ui)', color:'var(--text-primary)' }}>
      {/* SIDEBAR */}
      <aside style={{ width:'248px', flex:'none', background:'var(--surface-deep)', color:'#fff', display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh' }}>
        <div style={{ padding:'20px 22px', display:'flex', alignItems:'center', gap:'10px', borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
          <img src="../../assets/mark-globe.png" alt="" style={{ height:'32px' }} />
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.15rem', lineHeight:1 }}>AQOBAH</div>
            <div style={{ fontSize:'10px', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--gold-300)', marginTop:'2px' }}>ERP Console</div>
          </div>
        </div>
        <nav style={{ padding:'14px 12px', display:'flex', flexDirection:'column', gap:'3px', flex:1 }}>
          {ERP_NAV.map(([ic,label,key])=>(
            <button key={key} onClick={()=>onNav(key)} style={{
              display:'flex', alignItems:'center', gap:'12px', padding:'11px 14px', borderRadius:'var(--radius-sm)',
              border:'none', cursor:'pointer', textAlign:'left', width:'100%',
              fontFamily:'var(--font-ui)', fontSize:'var(--text-sm)', fontWeight:active===key?600:500,
              background: active===key ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: active===key ? '#fff' : 'rgba(255,255,255,0.72)',
              borderLeft: active===key ? '3px solid var(--gold-300)' : '3px solid transparent',
            }}>
              <E_Ico name={ic} color={active===key?'#FCB017':'rgba(255,255,255,0.72)'} />{label}
            </button>
          ))}
        </nav>
        <div style={{ padding:'16px', borderTop:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'34px', height:'34px', borderRadius:'50%', background:'var(--gold-300)', color:'var(--indigo-800)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'14px' }}>AD</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'13px', fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>Admin Pusat</div>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.6)' }}>Kantor Pusat · Tangsel</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column' }}>
        <header style={{ height:'68px', flex:'none', background:'var(--surface-card)', borderBottom:'1px solid var(--border-subtle)', display:'flex', alignItems:'center', gap:'20px', padding:'0 28px', position:'sticky', top:0, zIndex:10 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.4rem', margin:0, lineHeight:1.1 }}>{title}</h1>
            {subtitle && <div style={{ fontSize:'13px', color:'var(--text-muted)', marginTop:'1px' }}>{subtitle}</div>}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', background:'var(--surface-sunken)', borderRadius:'var(--radius-pill)', padding:'8px 14px', width:'240px' }}>
            <E_Ico name="Search" size={16} color="var(--text-muted)" />
            <span style={{ fontSize:'13px', color:'var(--text-muted)' }}>Cari jamaah, order…</span>
          </div>
          <button style={{ position:'relative', background:'var(--surface-sunken)', border:'none', width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <E_Ico name="Bell" size={18} color="var(--text-secondary)" />
            <span style={{ position:'absolute', top:'8px', right:'9px', width:'8px', height:'8px', borderRadius:'50%', background:'var(--danger-500)', border:'2px solid var(--surface-card)' }}></span>
          </button>
          {actions}
        </header>
        <main style={{ flex:1, padding:'28px', minWidth:0 }}>{children}</main>
      </div>
    </div>
  );
}

// ---- shared helpers ----
function Kpi({ icon, label, value, delta, deltaUp=true, accent='var(--brand-primary)' }) {
  return (
    <div style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:'18px 20px', boxShadow:'var(--shadow-xs)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
        <span style={{ width:'38px', height:'38px', borderRadius:'var(--radius-sm)', background:'color-mix(in srgb, '+accent+' 12%, white)', color:accent, display:'flex', alignItems:'center', justifyContent:'center' }}><E_Ico name={icon} size={19} color={accent} /></span>
        {delta && <span style={{ fontSize:'12px', fontWeight:600, color: deltaUp?'var(--success-500)':'var(--danger-500)', display:'inline-flex', alignItems:'center', gap:'2px' }}>{deltaUp?'▲':'▼'} {delta}</span>}
      </div>
      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.6rem', lineHeight:1.1, color:'var(--text-primary)', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap' }}>{value}</div>
      <div style={{ fontSize:'13px', color:'var(--text-muted)', marginTop:'5px' }}>{label}</div>
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', overflow:'hidden', boxShadow:'var(--shadow-xs)' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
        <thead>
          <tr style={{ background:'var(--surface-sunken)' }}>
            {columns.map(c=>(<th key={c.key} style={{ textAlign:c.align||'left', padding:'13px 18px', fontSize:'11px', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text-muted)', whiteSpace:'nowrap' }}>{c.label}</th>))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} style={{ borderTop:'1px solid var(--border-subtle)' }}>
              {columns.map(c=>(<td key={c.key} style={{ padding:'13px 18px', textAlign:c.align||'left', color:'var(--text-primary)', whiteSpace:c.wrap?'normal':'nowrap', verticalAlign:'middle' }}>{c.render?c.render(r):r[c.key]}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pill({ children, tone='neutral' }) {
  const tones = {
    neutral:['var(--neutral-100)','var(--neutral-700)'],
    blue:['var(--blue-50)','var(--blue-700)'],
    gold:['var(--gold-50)','var(--gold-600)'],
    green:['var(--success-50)','var(--success-500)'],
    amber:['var(--warning-50)','var(--warning-500)'],
    red:['var(--danger-50)','var(--danger-500)'],
    seal:['var(--maroon-100)','var(--maroon-600)'],
  };
  const [bg,fg]=tones[tone]||tones.neutral;
  return <span style={{ display:'inline-block', padding:'4px 10px', borderRadius:'var(--radius-pill)', background:bg, color:fg, fontSize:'12px', fontWeight:600, whiteSpace:'nowrap' }}>{children}</span>;
}

function Panel({ title, action, children, style }) {
  return (
    <div style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow-xs)', ...style }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'1px solid var(--border-subtle)' }}>
        <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', margin:0 }}>{title}</h3>
        {action}
      </div>
      <div style={{ padding:'20px' }}>{children}</div>
    </div>
  );
}

Object.assign(window, { ErpShell, Kpi, DataTable, Pill, Panel, E_Ico, ERP_UNITS });

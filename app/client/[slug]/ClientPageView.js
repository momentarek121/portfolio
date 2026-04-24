'use client'
const S = { bg:'#0A0A0A',surface:'#111',border:'rgba(255,255,255,0.07)',border2:'rgba(255,255,255,0.13)',text:'#F0EDE8',muted:'#6B6760',accent:'#C8F04D' }
const CAT_COLORS = {brand:'#e94560',ui:'#ff6b35',social:'#4fc3f7',other:'#b39ddb'}
const CAT_BG = {brand:'linear-gradient(135deg,#1a1a2e,#0f3460)',ui:'linear-gradient(160deg,#0d0d0d,#2d1b00)',social:'linear-gradient(110deg,#050505,#0a1628)',other:'linear-gradient(145deg,#0f0f0f,#1a0a2e)'}

export default function ClientPageView({ client, projects, settings }) {
  return (
    <div style={{minHeight:'100vh',background:S.bg,color:S.text,fontFamily:"'DM Sans',sans-serif"}}>
      {/* Header */}
      <div style={{background:S.surface,borderBottom:`1px solid ${S.border}`,padding:'20px 48px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,letterSpacing:'.08em',textTransform:'uppercase'}}>
          MT<span style={{color:S.accent}}>.</span>
        </div>
        <div style={{fontSize:12,color:S.muted}}>Private Portfolio for {client.name}</div>
      </div>

      <div style={{padding:'60px 48px',maxWidth:1000,margin:'0 auto'}}>
        {/* Client greeting */}
        <div style={{marginBottom:60}}>
          <div style={{fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:S.accent,marginBottom:12}}>For</div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:'clamp(32px,5vw,64px)',fontWeight:800,lineHeight:1,marginBottom:16}}>{client.name}</h1>
          <p style={{fontSize:14,color:S.muted,maxWidth:480,lineHeight:1.8}}>
            Here's a curated selection of work from Momen Tarek — prepared especially for you.
          </p>
        </div>

        {/* Projects */}
        {projects.length === 0 ? (
          <div style={{textAlign:'center',padding:'80px 0',color:S.muted}}>No projects assigned yet.</div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:20}}>
            {projects.map(p=>(
              <div key={p.id} style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:6,overflow:'hidden'}}>
                <div style={{aspectRatio:'16/9',overflow:'hidden'}}>
                  {p.image?<img src={p.image} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/>:(
                    <div style={{width:'100%',height:'100%',background:CAT_BG[p.category]||CAT_BG.other,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontWeight:700,color:CAT_COLORS[p.category]||CAT_COLORS.other,fontSize:16,letterSpacing:'.06em'}}>
                      {p.category?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div style={{padding:'16px 20px'}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:600,marginBottom:4}}>{p.title}</div>
                  <div style={{fontSize:11,color:S.muted,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:p.link?12:0}}>{p.category} · {p.year}</div>
                  {p.link&&<a href={p.link} target="_blank" rel="noreferrer" style={{fontSize:12,color:S.accent,textDecoration:'none',border:`1px solid rgba(200,240,77,.3)`,padding:'6px 14px',borderRadius:2,display:'inline-block'}}>View Project ↗</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact */}
        <div style={{marginTop:80,paddingTop:40,borderTop:`1px solid ${S.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:4}}>{settings.name}</div>
            <div style={{fontSize:13,color:S.muted}}>{settings.email}</div>
          </div>
          <a href={`mailto:${settings.email}`} style={{display:'inline-flex',alignItems:'center',padding:'12px 24px',background:S.accent,color:'#0A0A0A',borderRadius:2,fontSize:12,fontWeight:500,letterSpacing:'.1em',textTransform:'uppercase',textDecoration:'none'}}>
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  )
}

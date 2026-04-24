'use client'
import { useState, useEffect, useRef } from 'react'

const S = {
  bg:'#0A0A0A', surface:'#111', surface2:'#181818',
  border:'rgba(255,255,255,0.07)', border2:'rgba(255,255,255,0.13)',
  text:'#F0EDE8', muted:'#6B6760', accent:'#C8F04D', accent2:'#FF6B35'
}

const CAT_COLORS = {brand:'#e94560',ui:'#ff6b35',social:'#4fc3f7',other:'#b39ddb'}
const CAT_BG = {brand:'linear-gradient(135deg,#1a1a2e,#0f3460)',ui:'linear-gradient(160deg,#0d0d0d,#2d1b00)',social:'linear-gradient(110deg,#050505,#0a1628)',other:'linear-gradient(145deg,#0f0f0f,#1a0a2e)'}

export default function PortfolioClient({ projects, settings }) {
  const [lang, setLang] = useState('en')
  const [filter, setFilter] = useState('all')
  const [mx, setMx] = useState(0); const [my, setMy] = useState(0)
  const [rx, setRx] = useState(0); const [ry, setRy] = useState(0)
  const rafRef = useRef()

  const t = (en, ar) => lang === 'ar' ? ar : en
  const s = settings

  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    const move = e => { setMx(e.clientX); setMy(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    let lx = rx, ly = ry
    function animate() {
      lx += (mx - lx) * 0.12
      ly += (my - ly) * 0.12
      setRx(lx); setRy(ly)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mx, my])

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)
  const isAr = lang === 'ar'
  const ff = isAr ? "'Cairo', sans-serif" : "'Syne', sans-serif"
  const fb = isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif"

  return (
    <div style={{fontFamily:fb, fontSize:14, lineHeight:1.6, overflowX:'hidden', cursor:'none'}}>

      {/* Custom cursor */}
      <div style={{width:10,height:10,background:S.accent,borderRadius:'50%',position:'fixed',top:my,left:mx,transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:9999,transition:'width .2s,height .2s'}}/>
      <div style={{width:36,height:36,border:`1px solid rgba(200,240,77,0.4)`,borderRadius:'50%',position:'fixed',top:ry,left:rx,transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:9998}}/>

      {/* Noise */}
      <div style={{position:'fixed',inset:0,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,pointerEvents:'none',zIndex:1000,opacity:.35}}/>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px 48px',background:'linear-gradient(to bottom,rgba(10,10,10,0.95),transparent)'}}>
        <a href="/" style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,letterSpacing:'.08em',textTransform:'uppercase',color:S.text,textDecoration:'none'}}>
          MT<span style={{color:S.accent}}>.</span>
        </a>
        <div style={{display:'flex',alignItems:'center',gap:32}}>
          <div style={{display:'flex',gap:32}}>
            {[['#work',t('Work','أعمالي')],['#services',t('Services','خدماتي')],['#contact',t('Contact','تواصل')]].map(([href,label])=>(
              <a key={href} href={href} style={{fontSize:12,letterSpacing:isAr?0:'.12em',textTransform:isAr?'none':'uppercase',color:S.muted,textDecoration:'none',fontFamily:fb}}>{label}</a>
            ))}
          </div>
          {/* Lang toggle */}
          <div style={{display:'flex',border:`1px solid ${S.border2}`,borderRadius:100,overflow:'hidden'}}>
            {['en','ar'].map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{padding:'7px 14px',background:lang===l?S.accent:'none',border:'none',color:lang===l?'#0A0A0A':S.muted,cursor:'pointer',fontSize:11,fontWeight:500,fontFamily:"'DM Sans',sans-serif",letterSpacing:'.08em'}}>
                {l==='en'?'EN':'ع'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'0 48px 80px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 80% 20%,rgba(200,240,77,.06) 0%,transparent 60%),radial-gradient(ellipse 40% 60% at 10% 80%,rgba(255,107,53,.05) 0%,transparent 50%)'}}/>
        <div style={{position:'absolute',top:0,[isAr?'right':'left']:48,width:1,height:'100%',background:'linear-gradient(to bottom,transparent,rgba(255,255,255,0.13) 30%,rgba(255,255,255,0.07) 70%,transparent)'}}/>

        <div style={{fontSize:11,letterSpacing:isAr?0:'.2em',textTransform:isAr?'none':'uppercase',color:S.accent,marginBottom:28,display:'flex',alignItems:'center',gap:12,fontFamily:fb}}>
          <span style={{display:'block',width:32,height:1,background:S.accent}}/>
          {t(s.heroTagline, s.heroTaglineAr)}
        </div>

        <h1 style={{fontFamily:ff,fontWeight:800,fontSize:'clamp(52px,9vw,130px)',lineHeight:isAr?1.1:.92,letterSpacing:isAr?0:'-.02em',marginBottom:40}}>
          {t(s.name, s.name)}<br/>
          <em style={{fontStyle:isAr?'normal':'italic',fontWeight:isAr?300:400,color:S.muted}}>{t('Designer','مصمم')}</em><br/>
          <span style={{color:S.accent}}>{isAr?'مؤمن طارق.':'Momen Tarek.'}</span>
        </h1>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:32}}>
          <p style={{maxWidth:340,fontSize:14,color:S.muted,lineHeight:1.8,fontFamily:fb,whiteSpace:'pre-line'}}>
            {t(s.heroDesc, s.heroDescAr)}
          </p>
          <div style={{display:'flex',gap:48}}>
            {[
              [s.stats.years, t('Years','سنوات')],
              [s.stats.projects, t('Projects','مشروع')],
              [s.stats.clients, t('Clients','عميل')]
            ].map(([num,label])=>(
              <div key={label} style={{textAlign:isAr?'left':'right'}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:700,lineHeight:1}}>{num}</div>
                <div style={{fontSize:11,letterSpacing:isAr?0:'.1em',textTransform:isAr?'none':'uppercase',color:S.muted,marginTop:4,fontFamily:fb}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{borderTop:`1px solid ${S.border}`,borderBottom:`1px solid ${S.border}`,padding:'22px 0',overflow:'hidden'}}>
        <div style={{display:'flex',gap:48,whiteSpace:'nowrap',animation:'ticker 22s linear infinite'}}>
          {[...Array(2)].map((_,i)=>(
            ['Brand Identity','UI/UX','Social Media','Visual Design','Art Direction','Figma'].map((item,j)=>(
              <div key={`${i}-${j}`} style={{display:'flex',alignItems:'center',gap:16,fontSize:13,letterSpacing:'.08em',textTransform:'uppercase',color:S.muted,fontFamily:fb}}>
                <span style={{width:4,height:4,borderRadius:'50%',background:S.accent,flexShrink:0,display:'block'}}/>
                {item}
              </div>
            ))
          ))}
        </div>
        <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </div>

      {/* WORK */}
      <section id="work" style={{padding:'100px 48px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:64}}>
          <div>
            <div style={{fontSize:11,letterSpacing:isAr?0:'.2em',textTransform:isAr?'none':'uppercase',color:S.accent,marginBottom:12,fontFamily:fb}}>{t('Selected Work','من أعمالي')}</div>
            <h2 style={{fontFamily:ff,fontSize:'clamp(32px,4vw,52px)',fontWeight:700,lineHeight:1.1}}>{t('Recent Projects','أحدث المشاريع')}</h2>
          </div>
          <a href="/admin" style={{fontSize:12,color:S.muted,textDecoration:'none',borderBottom:`1px solid ${S.border2}`,paddingBottom:4,fontFamily:fb,letterSpacing:isAr?0:'.1em',textTransform:isAr?'none':'uppercase'}}>
            {t('Admin ↗','الإدارة ↗')}
          </a>
        </div>

        {/* Filter tabs */}
        <div style={{display:'flex',gap:8,marginBottom:48,flexWrap:'wrap'}}>
          {[['all',t('All','الكل')],['brand',t('Brand','براند')],['ui','UI/UX'],['social',t('Social','سوشيال')]].map(([f,label])=>(
            <button key={f} onClick={()=>setFilter(f)} style={{fontSize:11,letterSpacing:isAr?0:'.1em',textTransform:isAr?'none':'uppercase',color:filter===f?'#0A0A0A':S.muted,padding:'8px 18px',border:`1px solid ${filter===f?S.accent:S.border}`,borderRadius:100,cursor:'pointer',background:filter===f?S.accent:'none',fontFamily:fb,transition:'all .2s'}}>
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',gap:16}}>
          {filtered.map((p,i)=>{
            const wide = i%5===0 || i%5===3
            const span = wide ? 7 : 5
            const realSpan = filtered.length===1 ? 12 : span
            return (
              <div key={p.id} style={{gridColumn:`span ${realSpan}`,background:S.surface,border:`1px solid ${S.border}`,borderRadius:4,overflow:'hidden',cursor:'pointer',position:'relative',transition:'border-color .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=S.border2}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=S.border}}>
                {/* Thumb */}
                <div style={{width:'100%',aspectRatio:wide?'16/9':'4/3',overflow:'hidden',position:'relative'}}>
                  {p.image ? (
                    <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                  ):(
                    <div style={{width:'100%',height:'100%',background:CAT_BG[p.category]||CAT_BG.other,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontWeight:700,letterSpacing:'.06em',color:CAT_COLORS[p.category]||CAT_COLORS.other,position:'relative'}}>
                      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
                      <div style={{position:'relative',textAlign:'center'}}>
                        <div>{p.title.toUpperCase().slice(0,8)}</div>
                        <div style={{fontSize:'0.45em',opacity:.7,letterSpacing:'.2em',marginTop:4,textTransform:'uppercase'}}>{p.category}</div>
                      </div>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="work-overlay" style={{position:'absolute',inset:0,background:'rgba(10,10,10,.85)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',opacity:0,transition:'opacity .3s',backdropFilter:'blur(4px)'}}>
                    <div style={{fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:S.accent,marginBottom:10}}>{p.category}</div>
                    <div style={{fontFamily:ff,fontSize:20,fontWeight:700,textAlign:'center',padding:'0 20px'}}>{isAr&&p.titleAr?p.titleAr:p.title}</div>
                    {p.link&&<a href={p.link} target="_blank" rel="noreferrer" style={{marginTop:12,color:S.accent,fontSize:12,textDecoration:'none',border:`1px solid ${S.accent}`,padding:'6px 16px',borderRadius:2,fontFamily:fb}}>View ↗</a>}
                  </div>
                </div>
                <div style={{padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontFamily:ff,fontSize:15,fontWeight:600,marginBottom:4}}>{isAr&&p.titleAr?p.titleAr:p.title}</div>
                    <div style={{fontSize:11,letterSpacing:isAr?0:'.08em',textTransform:isAr?'none':'uppercase',color:S.muted,fontFamily:fb}}>{p.category} · {p.year}</div>
                  </div>
                  <div style={{width:32,height:32,border:`1px solid ${S.border}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:S.muted,fontSize:14}}>↗</div>
                </div>
              </div>
            )
          })}
        </div>
        <style>{`.work-overlay:hover{opacity:1!important} div:hover .work-overlay{opacity:1!important}`}</style>
      </section>

      {/* SERVICES */}
      <section id="services" style={{padding:'0 48px 100px'}}>
        <div style={{marginBottom:48}}>
          <div style={{fontSize:11,letterSpacing:isAr?0:'.2em',textTransform:isAr?'none':'uppercase',color:S.accent,marginBottom:12,fontFamily:fb}}>{t('What I Do','ماذا أقدم')}</div>
          <h2 style={{fontFamily:ff,fontSize:'clamp(32px,4vw,52px)',fontWeight:700}}>{t('Services','الخدمات')}</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',border:`1px solid ${S.border}`,borderRadius:4,overflow:'hidden'}}>
          {[
            ['01',t('Brand Identity','الهوية البصرية'),t('Logo design, brand guidelines, visual systems, and complete identity packages.','تصميم شعارات، دلائل البراند، والأنظمة البصرية الكاملة.')],
            ['02',t('UI/UX Design','تصميم UI/UX'),t('User research, wireframing, prototyping, and high-fidelity design using Figma.','بحث المستخدمين، wireframing، بروتوتايب، وتصميم عالي الجودة بـ Figma.')],
            ['03',t('Social & Ads','سوشيال وإعلانات'),t('Campaign design, social media templates, ad banners, and conversion-focused content.','تصميم حملات، تمبلات سوشيال ميديا، وبانرات إعلانية تحول الجمهور لعملاء.')]
          ].map(([num,title,desc],i)=>(
            <div key={num} style={{background:S.surface,padding:'40px 36px',borderRight:i<2?`1px solid ${S.border}`:'none'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,letterSpacing:'.15em',color:S.accent,marginBottom:20}}>{num}</div>
              <div style={{fontFamily:ff,fontSize:22,fontWeight:700,marginBottom:12}}>{title}</div>
              <p style={{fontSize:13,color:S.muted,lineHeight:1.8,fontFamily:fb}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <div id="contact" style={{background:S.surface,borderTop:`1px solid ${S.border}`,padding:'120px 48px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 80% at 50% 120%,rgba(200,240,77,.06) 0%,transparent 60%)'}}/>
        <h2 style={{fontFamily:ff,fontSize:'clamp(40px,7vw,96px)',fontWeight:800,lineHeight:1,marginBottom:32,position:'relative'}}>
          {t("Let's Work",'خلينا نشتغل')}<br/><span style={{color:S.accent}}>{t('Together.','سوا.')}</span>
        </h2>
        <p style={{fontSize:15,color:S.muted,maxWidth:400,margin:'0 auto 40px',lineHeight:1.8,fontFamily:fb,position:'relative'}}>
          {t("Have a project in mind? Let's talk.",'عندك مشروع في بالك؟ نتكلم عنه.')}
        </p>
        <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',position:'relative'}}>
          <a href={`mailto:${s.email}`} style={{display:'inline-flex',alignItems:'center',gap:8,padding:'14px 28px',background:S.accent,color:'#0A0A0A',border:`1px solid ${S.accent}`,borderRadius:2,fontSize:12,letterSpacing:isAr?0:'.12em',textTransform:isAr?'none':'uppercase',textDecoration:'none',fontFamily:fb}}>
            {t('Get In Touch','تواصل معي')}
          </a>
          {s.phone&&<a href={`tel:${s.phone}`} style={{display:'inline-flex',alignItems:'center',padding:'14px 28px',border:`1px solid ${S.border2}`,borderRadius:2,fontSize:12,color:S.text,textDecoration:'none',fontFamily:fb,letterSpacing:isAr?0:'.12em',textTransform:isAr?'none':'uppercase'}}>
            {t('WhatsApp','واتساب')}
          </a>}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{padding:'28px 48px',borderTop:`1px solid ${S.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:12,color:S.muted,fontFamily:fb}}>© 2025 {s.name}. {t('All rights reserved.','جميع الحقوق محفوظة.')}</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,letterSpacing:'.1em',color:S.muted}}>ENG / MOMEN TAREK</div>
      </footer>
    </div>
  )
}

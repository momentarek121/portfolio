'use client'
import { useState, useRef } from 'react'

const S = {
  bg:'#0A0A0A', surface:'#111', surface2:'#181818', surface3:'#1e1e1e',
  border:'rgba(255,255,255,0.07)', border2:'rgba(255,255,255,0.13)',
  text:'#F0EDE8', muted:'#6B6760', accent:'#C8F04D', accent2:'#FF6B35',
  error:'#ff4444', success:'#4fc3f7'
}

const inp = { background:S.surface2, border:`1px solid ${S.border2}`, borderRadius:4, padding:'10px 14px', color:S.text, fontSize:13, width:'100%', outline:'none', fontFamily:"'DM Sans',sans-serif" }
const btn = (color='#0A0A0A', bg=S.accent) => ({ background:bg, color, border:`1px solid ${bg}`, borderRadius:2, padding:'10px 20px', cursor:'pointer', fontSize:12, fontWeight:500, letterSpacing:'.08em', textTransform:'uppercase', fontFamily:"'DM Sans',sans-serif" })

export default function AdminClient({ projects: initProjects, settings: initSettings, clients: initClients }) {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState('')
  const [tab, setTab] = useState('projects')
  const [projects, setProjects] = useState(initProjects)
  const [settings, setSettings] = useState(initSettings)
  const [clients, setClients] = useState(initClients)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [editProject, setEditProject] = useState(null)
  const [editClient, setEditClient] = useState(null)
  const fileRef = useRef()

  function showMsg(text, isErr=false) {
    setMsg({text,err:isErr})
    setTimeout(()=>setMsg(''),3000)
  }

  async function saveData(endpoint, data) {
    setSaving(true)
    try {
      const r = await fetch(`/api/${endpoint}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) })
      if (!r.ok) throw new Error()
      showMsg('Saved ✓')
    } catch { showMsg('Error saving', true) }
    setSaving(false)
  }

  // Auth
  if (!authed) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:S.bg,fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:8,padding:48,width:360}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,marginBottom:8}}>Admin Panel</div>
        <div style={{fontSize:13,color:S.muted,marginBottom:32}}>Enter your password to continue</div>
        <input style={{...inp,marginBottom:16}} type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'){if(pw===settings.adminPassword){setAuthed(true)}else{setPwErr('Wrong password')}}}} />
        {pwErr&&<div style={{color:S.error,fontSize:12,marginBottom:12}}>{pwErr}</div>}
        <button style={{...btn(),width:'100%'}} onClick={()=>{if(pw===settings.adminPassword){setAuthed(true)}else{setPwErr('Wrong password')}}}>Enter</button>
        <div style={{marginTop:16,fontSize:11,color:S.muted,textAlign:'center'}}>Default: momen2025</div>
      </div>
    </div>
  )

  const TABS = [['projects','🗂 Projects'],['settings','⚙️ Settings'],['clients','👥 Clients']]

  return (
    <div style={{minHeight:'100vh',background:S.bg,fontFamily:"'DM Sans',sans-serif"}}>

      {/* Header */}
      <div style={{background:S.surface,borderBottom:`1px solid ${S.border}`,padding:'16px 32px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:24}}>
          <a href="/" style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,color:S.text,textDecoration:'none'}}>MT<span style={{color:S.accent}}>.</span></a>
          <div style={{fontSize:12,color:S.muted}}>Admin Dashboard</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          {TABS.map(([t,label])=>(
            <button key={t} onClick={()=>setTab(t)} style={{...btn(tab===t?'#0A0A0A':S.muted, tab===t?S.accent:'none'), border:`1px solid ${tab===t?S.accent:S.border}`, padding:'8px 16px', fontSize:12}}>
              {label}
            </button>
          ))}
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          {msg&&<div style={{fontSize:12,color:msg.err?S.error:S.success,padding:'6px 12px',border:`1px solid ${msg.err?S.error:S.success}`,borderRadius:4}}>{msg.text}</div>}
          <a href="/" target="_blank" style={{fontSize:12,color:S.muted,textDecoration:'none'}}>View Site ↗</a>
        </div>
      </div>

      <div style={{padding:32,maxWidth:1100,margin:'0 auto'}}>

        {/* ── PROJECTS TAB ── */}
        {tab==='projects'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:700}}>Projects</h2>
              <button style={btn()} onClick={()=>setEditProject({id:Date.now().toString(),title:'',titleAr:'',category:'brand',year:'2025',image:'',link:'',visible:true,clientVisible:false})}>
                + Add Project
              </button>
            </div>

            {/* Project list */}
            <div style={{display:'grid',gap:12}}>
              {projects.map(p=>(
                <div key={p.id} style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:6,padding:'16px 20px',display:'flex',alignItems:'center',gap:16}}>
                  {/* Thumb */}
                  <div style={{width:72,height:54,borderRadius:4,overflow:'hidden',flexShrink:0,background:S.surface2,border:`1px solid ${S.border}`}}>
                    {p.image?<img src={p.image} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/>:<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:S.muted}}>{p.category}</div>}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:600,marginBottom:2}}>{p.title}</div>
                    <div style={{fontSize:12,color:S.muted}}>{p.category} · {p.year}</div>
                    {p.link&&<div style={{fontSize:11,color:S.accent,marginTop:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:300}}>{p.link}</div>}
                  </div>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    {/* Visibility badges */}
                    <span style={{fontSize:10,padding:'3px 8px',borderRadius:100,background:p.visible?'rgba(200,240,77,.15)':'rgba(255,255,255,.05)',color:p.visible?S.accent:S.muted,border:`1px solid ${p.visible?'rgba(200,240,77,.3)':S.border}`}}>
                      {p.visible?'Public':'Hidden'}
                    </span>
                    <span style={{fontSize:10,padding:'3px 8px',borderRadius:100,background:p.clientVisible?'rgba(79,195,247,.15)':'rgba(255,255,255,.05)',color:p.clientVisible?S.success:S.muted,border:`1px solid ${p.clientVisible?'rgba(79,195,247,.3)':S.border}`}}>
                      {p.clientVisible?'Client':'—'}
                    </span>
                    <button style={{...btn(S.muted,'none'),border:`1px solid ${S.border}`,padding:'6px 14px'}} onClick={()=>setEditProject({...p})}>Edit</button>
                    <button style={{...btn(S.error,'none'),border:`1px solid rgba(255,68,68,.3)`,padding:'6px 14px'}} onClick={()=>{const updated=projects.filter(x=>x.id!==p.id);setProjects(updated);saveData('projects',{projects:updated})}}>Del</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit modal */}
            {editProject&&<ProjectModal project={editProject} onSave={p=>{
              const exists=projects.find(x=>x.id===p.id)
              const updated=exists?projects.map(x=>x.id===p.id?p:x):[...projects,p]
              setProjects(updated)
              saveData('projects',{projects:updated})
              setEditProject(null)
            }} onClose={()=>setEditProject(null)}/>}
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {tab==='settings'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:700}}>Settings</h2>
              <button style={btn()} onClick={()=>saveData('settings',{settings})} disabled={saving}>{saving?'Saving...':'Save All'}</button>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
              {/* General */}
              <div style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:6,padding:24}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:600,marginBottom:20,fontSize:15}}>General</div>
                {[['name','Name / الاسم'],['email','Email'],['phone','Phone / WhatsApp']].map(([k,label])=>(
                  <div key={k} style={{marginBottom:16}}>
                    <label style={{fontSize:11,color:S.muted,letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:6}}>{label}</label>
                    <input style={inp} value={settings[k]||''} onChange={e=>setSettings({...settings,[k]:e.target.value})}/>
                  </div>
                ))}
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:11,color:S.muted,letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:6}}>Admin Password</label>
                  <input style={inp} type="password" value={settings.adminPassword||''} onChange={e=>setSettings({...settings,adminPassword:e.target.value})}/>
                </div>
                <label style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}>
                  <input type="checkbox" checked={settings.available} onChange={e=>setSettings({...settings,available:e.target.checked})} style={{accentColor:S.accent}}/>
                  <span style={{fontSize:13,color:S.muted}}>Available for projects</span>
                </label>
              </div>

              {/* Stats */}
              <div style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:6,padding:24}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:600,marginBottom:20,fontSize:15}}>Portfolio Stats</div>
                {[['years','Years of Experience'],['projects','Total Projects'],['clients','Total Clients']].map(([k,label])=>(
                  <div key={k} style={{marginBottom:16}}>
                    <label style={{fontSize:11,color:S.muted,letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:6}}>{label}</label>
                    <input style={inp} value={settings.stats?.[k]||''} onChange={e=>setSettings({...settings,stats:{...settings.stats,[k]:e.target.value}})}/>
                  </div>
                ))}
              </div>

              {/* Hero EN */}
              <div style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:6,padding:24}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:600,marginBottom:20,fontSize:15}}>Hero Text (English)</div>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:11,color:S.muted,letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:6}}>Tagline</label>
                  <input style={inp} value={settings.heroTagline||''} onChange={e=>setSettings({...settings,heroTagline:e.target.value})}/>
                </div>
                <div>
                  <label style={{fontSize:11,color:S.muted,letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:6}}>Description</label>
                  <textarea style={{...inp,height:100,resize:'vertical'}} value={settings.heroDesc||''} onChange={e=>setSettings({...settings,heroDesc:e.target.value})}/>
                </div>
              </div>

              {/* Hero AR */}
              <div style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:6,padding:24}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:600,marginBottom:20,fontSize:15}}>Hero Text (العربي)</div>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:11,color:S.muted,letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:6}}>Tagline AR</label>
                  <input style={{...inp,direction:'rtl',fontFamily:"'Cairo',sans-serif"}} value={settings.heroTaglineAr||''} onChange={e=>setSettings({...settings,heroTaglineAr:e.target.value})}/>
                </div>
                <div>
                  <label style={{fontSize:11,color:S.muted,letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:6}}>Description AR</label>
                  <textarea style={{...inp,height:100,resize:'vertical',direction:'rtl',fontFamily:"'Cairo',sans-serif"}} value={settings.heroDescAr||''} onChange={e=>setSettings({...settings,heroDescAr:e.target.value})}/>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CLIENTS TAB ── */}
        {tab==='clients'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:700}}>Clients</h2>
              <button style={btn()} onClick={()=>setEditClient({id:Date.now().toString(),name:'',phone:'',email:'',notes:'',projectIds:[],slug:Date.now().toString(36),active:true})}>
                + Add Client
              </button>
            </div>

            <div style={{display:'grid',gap:12}}>
              {clients.map(c=>(
                <div key={c.id} style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:6,padding:'16px 20px',display:'flex',alignItems:'center',gap:16}}>
                  <div style={{width:42,height:42,borderRadius:'50%',background:S.surface2,border:`1px solid ${S.border2}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,color:S.accent,flexShrink:0}}>
                    {c.name?.charAt(0)?.toUpperCase()||'?'}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:600,marginBottom:2}}>{c.name||'Unnamed'}</div>
                    <div style={{fontSize:12,color:S.muted}}>{c.email} {c.phone&&`· ${c.phone}`}</div>
                    {c.notes&&<div style={{fontSize:11,color:S.muted,marginTop:2,fontStyle:'italic'}}>{c.notes}</div>}
                  </div>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <div style={{fontSize:11,color:S.muted}}>
                      <span style={{color:S.accent}}>{c.projectIds?.length||0}</span> projects
                    </div>
                    {/* Client page link */}
                    <a href={`/client/${c.slug}`} target="_blank" style={{fontSize:11,color:S.success,padding:'4px 10px',border:`1px solid rgba(79,195,247,.3)`,borderRadius:4,textDecoration:'none'}}>
                      Page ↗
                    </a>
                    <button style={{...btn(S.muted,'none'),border:`1px solid ${S.border}`,padding:'6px 14px'}} onClick={()=>setEditClient({...c,projectIds:c.projectIds||[]})}>Edit</button>
                    <button style={{...btn(S.error,'none'),border:`1px solid rgba(255,68,68,.3)`,padding:'6px 14px'}} onClick={()=>{const u=clients.filter(x=>x.id!==c.id);setClients(u);saveData('clients',{clients:u})}}>Del</button>
                  </div>
                </div>
              ))}
              {clients.length===0&&<div style={{textAlign:'center',padding:'60px 0',color:S.muted,fontSize:14}}>No clients yet — add your first client above</div>}
            </div>

            {editClient&&<ClientModal client={editClient} projects={projects} onSave={c=>{
              const exists=clients.find(x=>x.id===c.id)
              const updated=exists?clients.map(x=>x.id===c.id?c:x):[...clients,c]
              setClients(updated)
              saveData('clients',{clients:updated})
              setEditClient(null)
            }} onClose={()=>setEditClient(null)}/>}
          </div>
        )}

      </div>
    </div>
  )
}

// ── PROJECT MODAL ─────────────────────────────────────────
function ProjectModal({project,onSave,onClose}) {
  const [p,setP] = useState(project)
  const [uploading,setUploading] = useState(false)
  const fileRef = useRef()

  async function handleImage(file) {
    if(!file) return
    setUploading(true)
    const reader = new FileReader()
    reader.onload = e => { setP({...p, image: e.target.result}); setUploading(false) }
    reader.readAsDataURL(file)
  }

  const inp2 = { background:'#0A0A0A', border:'1px solid rgba(255,255,255,0.13)', borderRadius:4, padding:'10px 14px', color:'#F0EDE8', fontSize:13, width:'100%', outline:'none', fontFamily:"'DM Sans',sans-serif" }

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.8)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)'}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div style={{background:S.surface,border:`1px solid ${S.border2}`,borderRadius:8,padding:32,width:600,maxHeight:'85vh',overflowY:'auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700}}>Edit Project</div>
          <button style={{background:'none',border:'none',color:S.muted,cursor:'pointer',fontSize:20}} onClick={onClose}>✕</button>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
          {[['title','Title (EN)'],['titleAr','العنوان (AR)']].map(([k,l])=>(
            <div key={k}>
              <label style={{fontSize:11,color:S.muted,textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:6}}>{l}</label>
              <input style={{...inp2,direction:k==='titleAr'?'rtl':'ltr',fontFamily:k==='titleAr'?"'Cairo',sans-serif":undefined}} value={p[k]||''} onChange={e=>setP({...p,[k]:e.target.value})}/>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
          <div>
            <label style={{fontSize:11,color:S.muted,textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:6}}>Category</label>
            <select style={{...inp2}} value={p.category} onChange={e=>setP({...p,category:e.target.value})}>
              {['brand','ui','social','other'].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:S.muted,textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:6}}>Year</label>
            <input style={inp2} value={p.year||''} onChange={e=>setP({...p,year:e.target.value})}/>
          </div>
        </div>

        <div style={{marginBottom:16}}>
          <label style={{fontSize:11,color:S.muted,textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:6}}>Link (Behance / Figma / Lovable / Relayit)</label>
          <input style={inp2} placeholder="https://..." value={p.link||''} onChange={e=>setP({...p,link:e.target.value})}/>
        </div>

        {/* Image upload */}
        <div style={{marginBottom:20}}>
          <label style={{fontSize:11,color:S.muted,textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:6}}>Project Image</label>
          <div style={{border:`1px dashed ${S.border2}`,borderRadius:4,padding:16,textAlign:'center',cursor:'pointer'}} onClick={()=>fileRef.current.click()}>
            {p.image ? <img src={p.image} style={{maxHeight:120,maxWidth:'100%',borderRadius:4}} alt=""/> :
              <div style={{color:S.muted,fontSize:13}}>{uploading?'Uploading...':'Click to upload image'}</div>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleImage(e.target.files[0])}/>
          {p.image&&<button style={{marginTop:8,fontSize:11,color:S.error,background:'none',border:'none',cursor:'pointer',padding:0}} onClick={()=>setP({...p,image:''})}>Remove image</button>}
        </div>

        {/* Toggles */}
        <div style={{display:'flex',gap:24,marginBottom:24}}>
          {[['visible','Show on Portfolio'],['clientVisible','Show to Clients']].map(([k,l])=>(
            <label key={k} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:13,color:S.muted}}>
              <input type="checkbox" checked={!!p[k]} onChange={e=>setP({...p,[k]:e.target.checked})} style={{accentColor:S.accent}}/>
              {l}
            </label>
          ))}
        </div>

        <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
          <button style={{...btn(S.muted,'none'),border:`1px solid ${S.border}`}} onClick={onClose}>Cancel</button>
          <button style={btn()} onClick={()=>onSave(p)}>Save Project</button>
        </div>
      </div>
    </div>
  )
}

// ── CLIENT MODAL ──────────────────────────────────────────
function ClientModal({client,projects,onSave,onClose}) {
  const [c,setC] = useState(client)
  const inp2 = { background:'#0A0A0A', border:'1px solid rgba(255,255,255,0.13)', borderRadius:4, padding:'10px 14px', color:'#F0EDE8', fontSize:13, width:'100%', outline:'none', fontFamily:"'DM Sans',sans-serif" }

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.8)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)'}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div style={{background:S.surface,border:`1px solid ${S.border2}`,borderRadius:8,padding:32,width:540,maxHeight:'85vh',overflowY:'auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700}}>Client</div>
          <button style={{background:'none',border:'none',color:S.muted,cursor:'pointer',fontSize:20}} onClick={onClose}>✕</button>
        </div>

        {[['name','Name'],['email','Email'],['phone','Phone / WhatsApp']].map(([k,l])=>(
          <div key={k} style={{marginBottom:14}}>
            <label style={{fontSize:11,color:S.muted,textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:6}}>{l}</label>
            <input style={inp2} value={c[k]||''} onChange={e=>setC({...c,[k]:e.target.value})}/>
          </div>
        ))}

        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,color:S.muted,textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:6}}>Notes</label>
          <textarea style={{...inp2,height:80,resize:'vertical'}} value={c.notes||''} onChange={e=>setC({...c,notes:e.target.value})}/>
        </div>

        {/* Assign projects */}
        <div style={{marginBottom:20}}>
          <label style={{fontSize:11,color:S.muted,textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:10}}>Assign Projects</label>
          <div style={{display:'grid',gap:8}}>
            {projects.map(p=>(
              <label key={p.id} style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer',fontSize:13,color:S.muted,padding:'8px 12px',background:S.surface2,borderRadius:4,border:`1px solid ${c.projectIds?.includes(p.id)?S.accent:S.border}`}}>
                <input type="checkbox" checked={c.projectIds?.includes(p.id)||false} style={{accentColor:S.accent}}
                  onChange={e=>{const ids=c.projectIds||[];setC({...c,projectIds:e.target.checked?[...ids,p.id]:ids.filter(x=>x!==p.id)})}}/>
                <span style={{color:S.text}}>{p.title}</span>
                <span style={{marginLeft:'auto',fontSize:11}}>{p.category}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{padding:'12px 16px',background:S.surface2,borderRadius:4,marginBottom:20,border:`1px solid ${S.border}`}}>
          <div style={{fontSize:11,color:S.muted,marginBottom:4}}>Client page link:</div>
          <div style={{fontSize:12,color:S.success}}>/client/{c.slug}</div>
        </div>

        <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
          <button style={{...btn(S.muted,'none'),border:`1px solid ${S.border}`}} onClick={onClose}>Cancel</button>
          <button style={btn()} onClick={()=>onSave(c)}>Save Client</button>
        </div>
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { Upload, User } from 'lucide-react'
import { SectionLabel, Field, ColorField } from '../ui/SharedUI'
import TeamSelect from '../ui/TeamSelect'
import CompetitionSelect from '../ui/CompetitionSelect'
import { MATCH_STAGES } from '../../lib/teamLogos'

function PlayerUpload({ label, value, onChange }) {
  const ref = useRef()
  const onFile = e => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = ev => {
      const bmp = new window.Image()
      bmp.onload = () => {
        const MAX = 1920
        let { naturalWidth: w, naturalHeight: h } = bmp
        if (w > MAX || h > MAX) {
          const ratio = Math.min(MAX / w, MAX / h)
          w = Math.round(w * ratio); h = Math.round(h * ratio)
        }
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = h
        canvas.getContext('2d').drawImage(bmp, 0, 0, w, h)
        onChange(canvas.toDataURL('image/jpeg', 0.88))
      }
      bmp.src = ev.target.result
    }
    r.readAsDataURL(f)
  }
  return (
    <div>
      <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">{label}</label>
      <div onClick={()=>ref.current.click()} className="border border-dashed border-white/[0.1] bg-white/[0.02] p-3 flex items-center gap-3 cursor-pointer hover:border-[#e0000a]/40 transition-colors">
        <div style={{width:44,height:44,overflow:'hidden',background:'#1c1c2a',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          {value?<img src={value} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/>:<User size={18} style={{color:'rgba(255,255,255,0.12)'}}/>}
        </div>
        <div className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/30 flex items-center gap-1.5">
          <Upload size={9}/>{value?'Change Photo':'Upload Player Photo'}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={onFile} className="hidden"/>
    </div>
  )
}

export default function MatchdayFlyerForm({ d, setD }) {
  const s = k => v => setD(p => ({ ...p, [k]: v }))
  const handleComp = ({ name, logo, bg }) => setD(p => ({ ...p, competition:name, competitionLogo:logo, bgColor:bg||p.bgColor }))
  const handleHome = ({ name, logo }) => setD(p => ({ ...p, homeTeam:name, homeTeamLogo:logo }))
  const handleAway = ({ name, logo }) => setD(p => ({ ...p, awayTeam:name, awayTeamLogo:logo }))
  return (
    <div className="flex flex-col gap-6">
      <div><SectionLabel>Competition (optional)</SectionLabel>
        <CompetitionSelect label="Select Competition" value={d.competition} onChange={handleComp} optional /></div>
      <div><SectionLabel>Match Details</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Stage / Round" value={d.stage} onChange={s('stage')} options={MATCH_STAGES} span2 />
          <Field label="Date" value={d.date} onChange={s('date')} />
          <Field label="Kick-off Time" value={d.time} onChange={s('time')} />
          <Field label="Venue" value={d.venue} onChange={s('venue')} span2 />
        </div></div>
      <div><SectionLabel>Home Team</SectionLabel>
        <TeamSelect label="Home Team" value={d.homeTeam} onChange={handleHome} colorValue="#6CABDD" onColorChange={()=>{}} side="home"/></div>
      <div><SectionLabel>Away Team</SectionLabel>
        <TeamSelect label="Away Team" value={d.awayTeam} onChange={handleAway} colorValue="#EF0107" onColorChange={()=>{}} side="away"/></div>
      <div><SectionLabel>Player Photos (optional)</SectionLabel>
        <div className="flex flex-col gap-3">
          <PlayerUpload label="Home Player" value={d.homePlayer} onChange={s('homePlayer')}/>
          <PlayerUpload label="Away Player" value={d.awayPlayer} onChange={s('awayPlayer')}/>
        </div></div>
      <div><SectionLabel>Background Color</SectionLabel>
        <ColorField label="Poster Background" value={d.bgColor||'#001230'} onChange={s('bgColor')}/></div>
    </div>
  )
}

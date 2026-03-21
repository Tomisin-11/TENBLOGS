import { useRef } from 'react'
import { Upload, Image } from 'lucide-react'
import { SectionLabel, Field } from '../ui/SharedUI'
import TeamSelect from '../ui/TeamSelect'
import CompetitionSelect from '../ui/CompetitionSelect'
import { MATCH_STAGES } from '../../lib/teamLogos'

function BgUpload({ value, onChange }) {
  const ref = useRef()
  const onFile = e => { const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>onChange(ev.target.result); r.readAsDataURL(f) }
  return (
    <div>
      <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Background Photo</label>
      <div onClick={()=>ref.current.click()} className="border border-dashed border-white/[0.1] bg-white/[0.02] p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-[#e0000a]/40 transition-colors">
        {value?<img src={value} className="w-full h-20 object-cover opacity-70 rounded"/>
          :<><Image size={24} style={{color:'rgba(255,255,255,0.15)'}}/><div className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/30 text-center">Upload match photo</div></>}
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={onFile} className="hidden"/>
      {value&&<button onClick={()=>onChange(null)} className="mt-1.5 text-[9px] font-bold tracking-[0.15em] uppercase text-white/25 hover:text-white/50 transition-colors">Remove</button>}
    </div>
  )
}

export default function ResultFlyerForm({ d, setD }) {
  const s = k => v => setD(p => ({ ...p, [k]: v }))
  const handleComp = ({ name, logoPath }) => setD(p => ({ ...p, competition:name, competitionLogo:logoPath }))
  const handleHome = ({ name, logoPath }) => setD(p => ({ ...p, homeTeam:name, homeTeamLogo:logoPath }))
  const handleAway = ({ name, logoPath }) => setD(p => ({ ...p, awayTeam:name, awayTeamLogo:logoPath }))
  return (
    <div className="flex flex-col gap-6">
      <div><SectionLabel>Background Photo</SectionLabel><BgUpload value={d.bgImage} onChange={s('bgImage')}/></div>
      <div><SectionLabel>Home Team</SectionLabel>
        <TeamSelect label="Home Team" value={d.homeTeam} onChange={handleHome} colorValue="#ffffff" onColorChange={()=>{}} side="home"/></div>
      <div><SectionLabel>Away Team</SectionLabel>
        <TeamSelect label="Away Team" value={d.awayTeam} onChange={handleAway} colorValue="#ffffff" onColorChange={()=>{}} side="away"/></div>
      <div><SectionLabel>Match Result</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Home Score" value={d.homeScore} onChange={s('homeScore')}/>
          <Field label="Away Score" value={d.awayScore} onChange={s('awayScore')}/>
          <Field label="Stage (optional)" value={d.stage} onChange={s('stage')} options={['', ...MATCH_STAGES]} span2/>
        </div></div>
      <div><SectionLabel>Competition (optional)</SectionLabel>
        <CompetitionSelect label="Select Competition" value={d.competition} onChange={handleComp} optional/></div>
    </div>
  )
}

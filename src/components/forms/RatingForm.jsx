import { useRef } from 'react'
import { User, Upload } from 'lucide-react'
import { SectionLabel, Field } from '../ui/SharedUI'

export default function RatingForm({ d, setD, img, setImg }) {
  const ref = useRef()
  const s = k => v => setD(p => ({ ...p, [k]: v }))
  const onFile = e => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader(); r.onload = ev => setImg(ev.target.result); r.readAsDataURL(f)
  }
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel>Player Photo</SectionLabel>
        <div onClick={() => ref.current.click()}
          className="border border-dashed border-white/[0.1] bg-white/[0.02] p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-[#e0000a]/40 hover:bg-[#e0000a]/[0.03] transition-all">
          <div style={{ width:60, height:60, borderRadius:'50%', overflow:'hidden', background:'#1c1c2a', border:`2px solid ${img?'rgba(224,0,10,0.4)':'rgba(255,255,255,0.08)'}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            {img ? <img src={img} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} /> : <User size={22} style={{ color:'rgba(255,255,255,0.12)' }} />}
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">
            <Upload size={10} />{img ? 'Change Photo' : 'Upload Player Photo'}
          </div>
        </div>
        <input ref={ref} type="file" accept="image/*" onChange={onFile} className="hidden" />
      </div>
      <div>
        <SectionLabel>Player Info</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Full Name" value={d.name} onChange={s('name')} span2 />
          <Field label="Club" value={d.club} onChange={s('club')} />
          <Field label="Position / Number" value={d.position} onChange={s('position')} />
          <Field label="Match" value={d.match} onChange={s('match')} span2 />
          <Field label="Competition" value={d.comp} onChange={s('comp')} />
          <Field label="Date" value={d.date} onChange={s('date')} />
        </div>
      </div>
      <div>
        <SectionLabel>Match Score</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Home Team" value={d.homeTeam} onChange={s('homeTeam')} />
          <Field label="Away Team" value={d.awayTeam} onChange={s('awayTeam')} />
          <Field label="Home Score" value={d.homeScore} onChange={s('homeScore')} />
          <Field label="Away Score" value={d.awayScore} onChange={s('awayScore')} />
        </div>
      </div>
      <div>
        <SectionLabel>Overall Rating</SectionLabel>
        <Field label="Rating (0.0 – 10.0)" value={d.rating} onChange={s('rating')} type="number" />
      </div>
      <div>
        <SectionLabel>Match Stats</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Goals"              value={d.goals}         onChange={s('goals')} />
          <Field label="Assists"            value={d.assists}       onChange={s('assists')} />
          <Field label="Shots"              value={d.shots}         onChange={s('shots')} />
          <Field label="Shots on Target"    value={d.shotsOnTarget} onChange={s('shotsOnTarget')} />
          <Field label="Duels Won"          value={d.duelsWon}      onChange={s('duelsWon')} />
          <Field label="Duels Total"        value={d.duelsTotal}    onChange={s('duelsTotal')} />
          <Field label="Touches"            value={d.touches}       onChange={s('touches')} />
          <Field label="Pass Accuracy %"    value={d.passAcc}       onChange={s('passAcc')} />
          <Field label="Pass Completed"     value={d.passComp}      onChange={s('passComp')} />
          <Field label="Pass Total"         value={d.passTotal}     onChange={s('passTotal')} />
          <Field label="Minutes"            value={d.minutes}       onChange={s('minutes')} />
          <Field label="Yellow Cards"       value={d.yellowCards}   onChange={s('yellowCards')} />
          <Field label="Dribbles Won"       value={d.dribblesWon}   onChange={s('dribblesWon')} />
          <Field label="Dribbles Total"     value={d.dribblesTotal} onChange={s('dribblesTotal')} />
          <Field label="Key Passes"         value={d.keyPasses}     onChange={s('keyPasses')} />
          <Field label="Expected Goals (xG)" value={d.xg}          onChange={s('xg')} />
        </div>
      </div>
    </div>
  )
}

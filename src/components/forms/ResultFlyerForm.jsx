import { useRef } from 'react'
import { Image } from 'lucide-react'
import { SectionLabel, Field, ColorField } from '../ui/SharedUI'
import TeamSelect from '../ui/TeamSelect'
import CompetitionSelect from '../ui/CompetitionSelect'
import { MATCH_STAGES } from '../../lib/teamLogos'

const STAGE_TYPES = ['FULL - TIME','GOAL!','MATCHDAY','HALF - TIME','FT RESULT','FINAL SCORE','KICK-OFF','AET','PENALTIES']

function BgUpload({ value, onChange }) {
  const ref = useRef()
  const onFile = e => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = ev => {
      // Resize + compress large images so html-to-image can decode them
      // instantly at download time (a raw 10MB JPEG → ~13MB base64 causes
      // capture timeouts; resizing to 1920px max at q=0.88 keeps full quality)
      const img = new Image()
      img.onload = () => {
        const MAX = 1920
        let { naturalWidth: w, naturalHeight: h } = img
        if (w > MAX || h > MAX) {
          const ratio = Math.min(MAX / w, MAX / h)
          w = Math.round(w * ratio)
          h = Math.round(h * ratio)
        }
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        onChange(canvas.toDataURL('image/jpeg', 0.88))
      }
      img.src = ev.target.result
    }
    r.readAsDataURL(f)
  }
  return (
    <div>
      <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">
        Background Photo (optional)
      </label>
      <div onClick={() => ref.current.click()}
        className="border border-dashed border-white/[0.1] bg-white/[0.02] p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-[#e0000a]/40 transition-colors">
        {value
          ? <img src={value} className="w-full h-20 object-cover rounded opacity-80" />
          : <><Image size={20} style={{ color:'rgba(255,255,255,0.15)' }} /><div className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/28">Upload match photo</div></>
        }
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={onFile} className="hidden" />
      {value && <button onClick={() => onChange(null)} className="mt-1 text-[9px] text-white/25 hover:text-white/50 transition-colors uppercase tracking-wider font-bold">Remove photo</button>}
    </div>
  )
}

export default function ResultFlyerForm({ d, setD }) {
  const s = k => v => setD(p => ({ ...p, [k]: v }))
  const handleComp = ({ name, logo }) => setD(p => ({ ...p, competition: name, competitionLogo: logo }))
  const handleHome = ({ name, logo }) => setD(p => ({ ...p, homeTeam: name, homeTeamLogo: logo }))
  const handleAway = ({ name, logo }) => setD(p => ({ ...p, awayTeam: name, awayTeamLogo: logo }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel>Background</SectionLabel>
        <BgUpload value={d.bgImage} onChange={s('bgImage')} />
        {!d.bgImage && (
          <div className="mt-2">
            <ColorField label="Background Color" value={d.bgColor || '#100808'} onChange={s('bgColor')} />
          </div>
        )}
      </div>
      <div>
        <SectionLabel>Stage / Header Text</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5">
          <Field label="Stage Type" value={d.stageType || 'FULL - TIME'} onChange={s('stageType')} options={STAGE_TYPES} />
          <Field label="Sub-text (optional)" value={d.stageSubtext || ''} onChange={s('stageSubtext')} />
          <Field label="Stage Name (optional, e.g. Round of 16)" value={d.stageName || ''} onChange={s('stageName')} />
        </div>
      </div>
      <div>
        <SectionLabel>Home Team</SectionLabel>
        <TeamSelect label="Home Team" value={d.homeTeam} onChange={handleHome}
          colorValue="#ffffff" onColorChange={() => {}} side="home" />
      </div>
      <div>
        <SectionLabel>Away Team</SectionLabel>
        <TeamSelect label="Away Team" value={d.awayTeam} onChange={handleAway}
          colorValue="#ffffff" onColorChange={() => {}} side="away" />
      </div>
      <div>
        <SectionLabel>Score</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Home Score" value={d.homeScore} onChange={s('homeScore')} />
          <Field label="Away Score" value={d.awayScore} onChange={s('awayScore')} />
        </div>
      </div>
      <div>
        <SectionLabel>Goalscorers (optional — one per line)</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5">
          <div>
            <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Home Scorers</label>
            <textarea value={d.homeScorers || ''} onChange={e => s('homeScorers')(e.target.value)}
              placeholder={"14' D. Welbeck\n56' D. Welbeck"} rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[13px] px-3 py-2 focus:border-[#e0000a] resize-none hover:border-white/[0.15] transition-colors" />
          </div>
          <div>
            <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Away Scorers</label>
            <textarea value={d.awayScorers || ''} onChange={e => s('awayScorers')(e.target.value)}
              placeholder={"30' M. Kerkez"} rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[13px] px-3 py-2 focus:border-[#e0000a] resize-none hover:border-white/[0.15] transition-colors" />
          </div>
        </div>
      </div>
      <div>
        <SectionLabel>Competition (optional)</SectionLabel>
        <CompetitionSelect label="Select Competition" value={d.competition} onChange={handleComp} optional />
      </div>
    </div>
  )
}

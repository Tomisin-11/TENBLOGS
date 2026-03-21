import { SectionLabel, Field } from '../ui/SharedUI'
import TeamSelect from '../ui/TeamSelect'
import { COMPETITION_NAMES } from '../../lib/teamLogos'

export default function PredictionForm({ d, setD }) {
  const s = k => v => setD(p => ({ ...p, [k]: v }))
  const handleHome = ({ name, logo }) => setD(p => ({ ...p, homeTeam: name, homeTeamLogo: logo }))
  const handleAway = ({ name, logo }) => setD(p => ({ ...p, awayTeam: name, awayTeamLogo: logo }))
  return (
    <div className="flex flex-col gap-6">
      <div><SectionLabel>Home Team</SectionLabel>
        <TeamSelect label="Home Team" value={d.homeTeam} onChange={handleHome} colorValue="#e0000a" onColorChange={()=>{}} side="home" /></div>
      <div><SectionLabel>Away Team</SectionLabel>
        <TeamSelect label="Away Team" value={d.awayTeam} onChange={handleAway} colorValue="#ffffff" onColorChange={()=>{}} side="away" /></div>
      <div><SectionLabel>Match</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Competition" value={d.comp} onChange={s('comp')} options={COMPETITION_NAMES} span2 />
          <Field label="Date / Time" value={d.date} onChange={s('date')} span2 />
        </div></div>
      <div><SectionLabel>My Prediction</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5">
          <Field label="Score (e.g. 2 – 1)" value={d.predictedScore} onChange={s('predictedScore')} />
          <Field label="Pick Note" value={d.pickNote} onChange={s('pickNote')} />
        </div></div>
      <div><SectionLabel>Fan Poll</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Home Win %" value={d.homeWinPct} onChange={s('homeWinPct')} type="number" />
          <Field label="Draw %" value={d.drawPct} onChange={s('drawPct')} type="number" />
          <Field label="Away Win %" value={d.awayWinPct} onChange={s('awayWinPct')} type="number" />
        </div></div>
    </div>
  )
}

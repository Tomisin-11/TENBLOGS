import { SectionLabel, Field } from '../ui/SharedUI'
import TeamSelect from '../ui/TeamSelect'
import { COMPETITION_NAMES } from '../../lib/teamLogos'

export default function H2HForm({ d, setD }) {
  const s = k => v => setD(p => ({ ...p, [k]: v }))
  const handleHomeTeam = ({ name, logoPath, homeColor }) =>
    setD(p => ({ ...p, homeTeam: name, homeTeamLogo: logoPath, homeTeamColor: homeColor }))
  const handleAwayTeam = ({ name, logoPath, awayColor }) =>
    setD(p => ({ ...p, awayTeam: name, awayTeamLogo: logoPath, awayTeamColor: awayColor }))
  return (
    <div className="flex flex-col gap-6">
      <div><SectionLabel>Home Team</SectionLabel>
        <TeamSelect label="Home Team" value={d.homeTeam} onChange={handleHomeTeam} colorValue={d.homeTeamColor||'#6CABDD'} onColorChange={s('homeTeamColor')} side="home" /></div>
      <div><SectionLabel>Away Team</SectionLabel>
        <TeamSelect label="Away Team" value={d.awayTeam} onChange={handleAwayTeam} colorValue={d.awayTeamColor||'#EF0107'} onColorChange={s('awayTeamColor')} side="away" /></div>
      <div><SectionLabel>Match Info</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Competition" value={d.comp} onChange={s('comp')} options={COMPETITION_NAMES} span2 />
          <Field label="Date" value={d.date} onChange={s('date')} span2 />
        </div></div>
      <div><SectionLabel>H2H Record</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Home Wins" value={d.homeWins} onChange={s('homeWins')} />
          <Field label="Draws" value={d.draws} onChange={s('draws')} />
          <Field label="Away Wins" value={d.awayWins} onChange={s('awayWins')} />
          <Field label="Home Goals" value={d.homeGoals} onChange={s('homeGoals')} />
          <Field label="Away Goals" value={d.awayGoals} onChange={s('awayGoals')} />
          <Field label="Home Poss %" value={d.homePoss} onChange={s('homePoss')} />
          <Field label="Home Shots/G" value={d.homeShots} onChange={s('homeShots')} />
          <Field label="Away Shots/G" value={d.awayShots} onChange={s('awayShots')} />
        </div></div>
      <div><SectionLabel>Recent Form</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5">
          <Field label="Home Form (WWDLW)" value={d.homeForm} onChange={s('homeForm')} />
          <Field label="Away Form" value={d.awayForm} onChange={s('awayForm')} />
        </div></div>
      <div><SectionLabel>Previous Meetings</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Date 1" value={d.r1date} onChange={s('r1date')} />
          <Field label="Result 1" value={d.r1result} onChange={s('r1result')} />
          <Field label="Date 2" value={d.r2date} onChange={s('r2date')} />
          <Field label="Result 2" value={d.r2result} onChange={s('r2result')} />
          <Field label="Date 3" value={d.r3date} onChange={s('r3date')} />
          <Field label="Result 3" value={d.r3result} onChange={s('r3result')} />
        </div></div>
    </div>
  )
}

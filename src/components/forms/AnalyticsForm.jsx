import { SectionLabel, Field } from '../ui/SharedUI'
import TeamSelect from '../ui/TeamSelect'
import { COMPETITION_NAMES } from '../../lib/teamLogos'

export default function AnalyticsForm({ d, setD }) {
  const s = k => v => setD(p => ({ ...p, [k]: v }))

  const handleHomeTeam = ({ name, logo, homeColor }) =>
    setD(p => ({ ...p, homeTeam: name, homeTeamLogo: logo, homeTeamColor: homeColor, homeDisplayName: p.homeDisplayName || '' }))
  const handleAwayTeam = ({ name, logo, awayColor }) =>
    setD(p => ({ ...p, awayTeam: name, awayTeamLogo: logo, awayTeamColor: awayColor, awayDisplayName: p.awayDisplayName || '' }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel>Home Team</SectionLabel>
        <TeamSelect label="Select Home Team" value={d.homeTeam}
          onChange={handleHomeTeam} colorValue={d.homeTeamColor||'#7BCBEB'}
          onColorChange={s('homeTeamColor')} side="home" />
        <div className="mt-2">
          <Field label="Display Name (optional — overrides auto-short)" value={d.homeDisplayName||''} onChange={s('homeDisplayName')} />
        </div>
      </div>
      <div>
        <SectionLabel>Away Team</SectionLabel>
        <TeamSelect label="Select Away Team" value={d.awayTeam}
          onChange={handleAwayTeam} colorValue={d.awayTeamColor||'#e0000a'}
          onColorChange={s('awayTeamColor')} side="away" />
        <div className="mt-2">
          <Field label="Display Name (optional)" value={d.awayDisplayName||''} onChange={s('awayDisplayName')} />
        </div>
      </div>
      <div>
        <SectionLabel>Match Info</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Home Score"  value={d.homeScore} onChange={s('homeScore')} />
          <Field label="Away Score"  value={d.awayScore} onChange={s('awayScore')} />
          <Field label="Status" value={d.status} onChange={s('status')} options={['FT','LIVE','HT']} />
          <Field label="Competition" value={d.comp} onChange={s('comp')} options={COMPETITION_NAMES} />
          <Field label="Venue" value={d.venue} onChange={s('venue')} span2 />
        </div>
      </div>
      <div>
        <SectionLabel>Match Stats</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Home Possession %" value={d.homePoss} onChange={s('homePoss')} />
          <Field label="Away Possession %" value={`${100-parseFloat(d.homePoss||50)}`} onChange={() => {}} readOnly />
          <Field label="Home Shots"   value={d.homeShots}   onChange={s('homeShots')} />
          <Field label="Away Shots"   value={d.awayShots}   onChange={s('awayShots')} />
          <Field label="Home SOT"     value={d.homeSOT}     onChange={s('homeSOT')} />
          <Field label="Away SOT"     value={d.awaySot}     onChange={s('awaySot')} />
          <Field label="Home Corners" value={d.homeCorners} onChange={s('homeCorners')} />
          <Field label="Away Corners" value={d.awayCorners} onChange={s('awayCorners')} />
          <Field label="Home Fouls"   value={d.homeFouls}   onChange={s('homeFouls')} />
          <Field label="Away Fouls"   value={d.awayFouls}   onChange={s('awayFouls')} />
          <Field label="Home Yellow"  value={d.homeYellow}  onChange={s('homeYellow')} />
          <Field label="Away Yellow"  value={d.awayYellow}  onChange={s('awayYellow')} />
          <Field label="Home Red"     value={d.homeRed}     onChange={s('homeRed')} />
          <Field label="Away Red"     value={d.awayRed}     onChange={s('awayRed')} />
        </div>
      </div>
      <div>
        <SectionLabel>Key Events (no emojis — e.g. "23' Haaland")</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Event 1" value={d.ev1}     onChange={s('ev1')} />
          <Field label="Side"    value={d.ev1side} onChange={s('ev1side')} options={['home','away']} />
          <Field label="Event 2" value={d.ev2}     onChange={s('ev2')} />
          <Field label="Side"    value={d.ev2side} onChange={s('ev2side')} options={['home','away']} />
          <Field label="Event 3" value={d.ev3}     onChange={s('ev3')} />
          <Field label="Side"    value={d.ev3side} onChange={s('ev3side')} options={['home','away']} />
          <Field label="Event 4" value={d.ev4}     onChange={s('ev4')} />
          <Field label="Side"    value={d.ev4side} onChange={s('ev4side')} options={['home','away']} />
        </div>
      </div>
    </div>
  )
}

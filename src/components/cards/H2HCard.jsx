import { CardBrand } from '../ui/SharedUI'
import { TEAMS } from '../../lib/teamLogos'
import { resolveTeamColors } from '../../lib/colorUtils'

// Resolve logo: use stored state value, or fall back to live TEAMS lookup
const getLogo = (storedLogo, teamName) =>
  storedLogo || TEAMS[teamName]?.logo || null



// Same shortening logic as analytics
const shortName = (custom, full) => {
  if (custom && custom.trim()) return custom.trim()
  if (!full) return ''
  if (full.length <= 14) return full
  const map = {
    'Manchester City':'Man City','Manchester United':'Man Utd',
    'Tottenham Hotspur':'Spurs','Borussia Dortmund':'Dortmund',
    'Nottingham Forest':'Nott\'m Forest','West Bromwich Albion':'West Brom',
    'Red Bull Salzburg':'RB Salzburg','Sheffield United':'Sheff Utd',
    'Sheffield Wednesday':'Sheff Wed','West Ham United':'West Ham',
    'Newcastle United':'Newcastle','Borussia M\'gladbach':'M\'gladbach',
    'Eintracht Frankfurt':'Frankfurt','Bayer Leverkusen':'Leverkusen',
    'Paris Saint-Germain':'PSG','RC Strasbourg Alsace':'Strasbourg',
  }
  return map[full] || full.slice(0, 13) + '.'
}

const DualBar = ({ hv, av, homeColor, awayColor }) => {
  const t = (parseFloat(hv)||0)+(parseFloat(av)||0)||1
  return (
    <div className="h-2 flex overflow-hidden" style={{ background:'rgba(255,255,255,0.05)' }}>
      <div style={{ width:`${(parseFloat(hv)||0)/t*100}%`, background:homeColor, transition:'width 0.7s', height:'100%' }} />
      <div style={{ width:`${(parseFloat(av)||0)/t*100}%`, background:awayColor, transition:'width 0.7s', height:'100%' }} />
    </div>
  )
}

const FormDot = ({ r }) => {
  const s = { W:'bg-green-600 text-white', D:'bg-white/[0.1] text-white/50 border border-white/[0.15]', L:'bg-red-600 text-white' }
  return <div className={`w-[22px] h-[22px] flex items-center justify-center text-[9px] font-bold ${s[r]||s.D}`}>{r}</div>
}

const TeamLogo = ({ logo, name, size = 44 }) => {
  if (logo) return <img src={logo} alt={name} style={{ width:size, height:size, objectFit:'contain' }} />
  return (
    <div style={{ width:size, height:size, background:'rgba(255,255,255,0.06)',
      display:'flex', alignItems:'center', justifyContent:'center' }}>
      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:size/4,
        color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em' }}>
        {name?.slice(0,3).toUpperCase()}
      </span>
    </div>
  )
}

export default function H2HCard({ d }) {
  const homeTeam = TEAMS[d.homeTeam]
  const awayTeam = TEAMS[d.awayTeam]
  const { home: homeColor, away: awayColor } = resolveTeamColors(
    d.homeTeamColor || '#7BCBEB',
    d.awayTeamColor || '#e0000a',
    homeTeam?.away, awayTeam?.home
  )
  const homeName  = shortName(d.homeDisplayName, d.homeTeam)
  const awayName  = shortName(d.awayDisplayName, d.awayTeam)

  const recent = [
    { date:d.r1date, result:d.r1result },
    { date:d.r2date, result:d.r2result },
    { date:d.r3date, result:d.r3result },
  ].filter(r => r.date || r.result)

  const hF = (d.homeForm||'').toUpperCase().replace(/[^WDL]/g,'').slice(0,5).split('')
  const aF = (d.awayForm||'').toUpperCase().replace(/[^WDL]/g,'').slice(0,5).split('')

  return (
    <div id="preview-h2h"
      style={{ width:460, background:'#0d0d14', border:'1px solid rgba(255,255,255,0.1)', maxWidth:'100%' }}>

      {/* Accent bar */}
      <div style={{ height:3, background:`linear-gradient(90deg,${homeColor},${awayColor})` }} />

      {/* Header */}
      <div className="flex justify-between items-start px-4 pt-3 pb-0">
        <span className="text-[9px] font-bold tracking-[0.26em] uppercase text-white/30">{d.comp}</span>
        <CardBrand />
      </div>

      {/* Teams — fixed grid so both sides stay symmetric */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr',
        alignItems:'center', padding:'12px 16px 12px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>

        {/* Home — logo + name on same row */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:4 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <TeamLogo logo={getLogo(d.homeTeamLogo, d.homeTeam)} name={d.homeTeam} size={40} />
            <div className="font-bebas text-[22px] leading-none text-white">{homeName.toUpperCase()}</div>
          </div>
          <div className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color:homeColor }}>Home</div>
        </div>

        {/* Center H2H badge */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'0 12px' }}>
          <div className="border px-4 py-1 text-[11px] font-bold tracking-[0.15em]"
            style={{ borderColor:`${homeColor}40`, background:`${homeColor}15`, color:homeColor }}>H2H</div>
          <div className="text-[9px] font-bold tracking-[0.08em] uppercase text-white/22 text-center whitespace-nowrap">{d.date}</div>
        </div>

        {/* Away — logo + name on same row */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div className="font-bebas text-[22px] leading-none text-white">{awayName.toUpperCase()}</div>
            <TeamLogo logo={getLogo(d.awayTeamLogo, d.awayTeam)} name={d.awayTeam} size={40} />
          </div>
          <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-right" style={{ color:awayColor }}>Away</div>
        </div>
      </div>

      {/* Color key — always visible so teams are identifiable even with similar colors */}
      <div style={{ display:'flex', justifyContent:'space-between', padding:'4px 16px',
        background:'rgba(0,0,0,0.2)', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <div style={{ width:10, height:10, borderRadius:'50%', background:homeColor, flexShrink:0 }} />
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
            color:'rgba(255,255,255,0.4)' }}>{homeName}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
            color:'rgba(255,255,255,0.4)' }}>{awayName}</span>
          <div style={{ width:10, height:10, borderRadius:'50%', background:awayColor, flexShrink:0 }} />
        </div>
      </div>

      {/* Win record */}
      <div className="grid grid-cols-3 border-b border-white/[0.06]">
        {[
          { lbl:'Home Wins', val:d.homeWins, color:homeColor },
          { lbl:'Draws',     val:d.draws,    color:'rgba(255,255,255,0.7)' },
          { lbl:'Away Wins', val:d.awayWins, color:awayColor },
        ].map(({ lbl, val, color }, i) => (
          <div key={i} className={`py-4 text-center ${i<2?'border-r border-white/[0.06]':''}`}>
            <div className="font-bebas text-[38px] leading-none" style={{ color }}>{val}</div>
            <div className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/28 mt-1">{lbl}</div>
          </div>
        ))}
      </div>

      {/* Stat bars */}
      <div className="px-4 py-4">
        {[
          { lbl:'Total Goals',      hv:d.homeGoals, av:d.awayGoals, dispHv:d.homeGoals, dispAv:d.awayGoals },
          { lbl:'Avg Possession',   hv:d.homePoss,  av:100-parseFloat(d.homePoss||50), dispHv:d.homePoss+'%', dispAv:(100-parseFloat(d.homePoss||50))+'%' },
          { lbl:'Attacking Threat', hv:d.homeAttackingThreat||0, av:d.awayAttackingThreat||0, dispHv:(d.homeAttackingThreat||0)+'%', dispAv:(d.awayAttackingThreat||0)+'%' },
        ].map(({ lbl, hv, av, dispHv, dispAv }) => (
          <div key={lbl} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bebas text-[18px] text-white">{dispHv}</span>
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/28">{lbl}</span>
              <span className="font-bebas text-[18px] text-white/38">{dispAv}</span>
            </div>
            <DualBar hv={parseFloat(hv)||0} av={parseFloat(av)||0} homeColor={homeColor} awayColor={awayColor} />
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="px-4 py-3 border-t border-white/[0.06]">
        <div className="text-[11px] text-center font-bold tracking-[0.2em] uppercase text-white/50 mb-3">
          Recent Form (Last 5)
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">{hF.map((r,i) => <FormDot key={i} r={r} />)}</div>
          <div className="flex gap-1 flex-row-reverse">{aF.map((r,i) => <FormDot key={i} r={r} />)}</div>
        </div>
      </div>

      {/* Previous meetings */}
      <div className="px-4 pb-4 border-t border-white/[0.06]">
        <div className="text-[13px] text-center font-bold tracking-[0.2em] uppercase text-white/50 mt-3 mb-3">
          Last 3 Meetings
        </div>
        {recent.map((r,i) => (
          <div key={i} className={`flex justify-between items-center py-2 ${i<recent.length-1?'border-b border-white/[0.04]':''}`}>
            <span className="text-[12px] text-white/30 min-w-[68px]">{r.date}</span>
            <span className="text-[14px] font-semibold text-white">{r.result}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06]"
        style={{ background:'rgba(0,0,0,0.3)' }}>
        <CardBrand />
        <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-white/18">@tenblogs</span>
      </div>
    </div>
  )
}

import { CardBrand } from '../ui/SharedUI'
import { TEAMS } from '../../lib/teamLogos'
import { resolveTeamColors } from '../../lib/colorUtils'

const getLogo = (storedLogo, teamName) =>
  storedLogo || TEAMS[teamName]?.logo || null

const shortName = (custom, full) => {
  if (custom && custom.trim()) return custom.trim()
  if (!full) return ''
  if (full.length <= 14) return full
  const map = {
    'Manchester City':'Man City','Manchester United':'Man Utd',
    'Tottenham Hotspur':'Spurs','Tottenham':'Spurs',
    'Borussia Dortmund':'Dortmund',"Borussia M'gladbach":"M'gladbach",
    'Nottingham Forest':"Nott'm Forest",'Crystal Palace':'Crystal Pal.',
    'West Bromwich Albion':'West Brom','Queens Park Rangers':'QPR',
    'Red Bull Salzburg':'RB Salzburg','RB Leipzig':'RB Leipzig',
    'Eintracht Frankfurt':'Frankfurt','Sheffield United':'Sheff Utd',
    'Sheffield Wednesday':'Sheff Wed','West Ham United':'West Ham',
    'Newcastle United':'Newcastle','Wolverhampton':'Wolves',
    'Brighton & Hove Albion':'Brighton','Bayer Leverkusen':'Leverkusen',
    'Bayern Munich':'Bayern','Athletic Club':'Athletic',
    'Atletico Madrid':'Atlético','Inter Milan':'Inter',
    'Paris Saint-Germain':'PSG','AS Monaco':'Monaco',
    'RC Strasbourg Alsace':'Strasbourg',
  }
  return map[full] || full.slice(0, 13) + '.'
}

/* Single tug-of-war bar — home fills from left, away fills from right.
   Both are % of total so they always sum to 100% of the bar.
   Home=60, Away=40 → home occupies left 60%, away occupies right 40%. */
const AnBar = ({ hv, av, homeColor, awayColor, gold }) => {
  const h = parseFloat(hv) || 0
  const a = parseFloat(av) || 0
  const total = h + a || 1
  const hPct = (h / total) * 100
  const aPct = (a / total) * 100
  const hColor = gold ? 'rgba(245,200,66,0.75)' : homeColor
  const aColor = gold ? 'rgba(245,200,66,0.35)' : awayColor
  return (
    <div style={{ height:6, display:'flex', overflow:'hidden', borderRadius:1,
      background:'rgba(255,255,255,0.05)' }}>
      <div style={{ width:`${hPct}%`, background:hColor, transition:'width 0.7s', height:'100%' }} />
      <div style={{ width:`${aPct}%`, background:aColor, transition:'width 0.7s', height:'100%' }} />
    </div>
  )
}

/* Possession: always home+away = 100%.
   Text color adapts so it's readable against any kit color. */
const PossBar = ({ hp, homeColor, awayColor }) => {
  const h = parseFloat(hp) || 50
  const a = 100 - h

  const isLight = (hex) => {
    try {
      const c = hex.replace('#','')
      const r = parseInt(c.slice(0,2),16)
      const g = parseInt(c.slice(2,4),16)
      const b = parseInt(c.slice(4,6),16)
      return (0.299*r + 0.587*g + 0.114*b) > 160
    } catch { return false }
  }

  const homeText = isLight(homeColor) ? '#111111' : '#ffffff'
  const awayText = isLight(awayColor) ? '#111111' : '#ffffff'

  return (
    <div className="h-7 flex overflow-hidden border border-white/[0.06]"
      style={{ background:'rgba(255,255,255,0.03)' }}>
      <div className="h-full flex items-center justify-end pr-2.5"
        style={{ width:`${h}%`, background:homeColor, transition:'width 1s' }}>
        <span className="font-bebas text-[13px] drop-shadow-sm" style={{ color: homeText }}>{h}%</span>
      </div>
      <div className="flex-1 flex items-center pl-2.5" style={{ background:awayColor }}>
        <span className="font-bebas text-[13px] drop-shadow-sm" style={{ color: awayText }}>{a}%</span>
      </div>
    </div>
  )
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

const CardBoxes = ({ yellow, red }) => {
  const y = parseInt(yellow)||0
  const r = parseInt(red)||0
  return (
    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
      {y > 0 && (
        <div style={{ display:'flex', alignItems:'center', gap:3 }}>
          <div style={{ width:10, height:13, background:'#F5D020', borderRadius:1.5 }} />
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, color:'rgba(255,255,255,0.8)' }}>{y}</span>
        </div>
      )}
      {r > 0 && (
        <div style={{ display:'flex', alignItems:'center', gap:3 }}>
          <div style={{ width:10, height:13, background:'#e0000a', borderRadius:1.5 }} />
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, color:'rgba(255,255,255,0.8)' }}>{r}</span>
        </div>
      )}
      {y === 0 && r === 0 && (
        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, color:'rgba(255,255,255,0.3)' }}>0</span>
      )}
    </div>
  )
}

export default function AnalyticsCard({ d }) {
  const homeTeam = TEAMS[d.homeTeam]
  const awayTeam = TEAMS[d.awayTeam]
  const { home: homeColor, away: awayColor } = resolveTeamColors(
    d.homeTeamColor || '#7BCBEB',
    d.awayTeamColor || '#e0000a',
    homeTeam?.away, awayTeam?.home
  )
  const homeName = shortName(d.homeDisplayName, d.homeTeam)
  const awayName = shortName(d.awayDisplayName, d.awayTeam)

  const isLive = d.status === 'LIVE'
  const stMap  = { FT:'Full Time', HT:'Half Time', LIVE:'● Live' }

  return (
    <div id="preview-analytics"
      style={{ width:460, background:'#0d0d14', border:'1px solid rgba(255,255,255,0.1)', maxWidth:'100%' }}>

      {/* Header */}
      <div className="flex justify-between items-start px-4 py-3 border-b border-white/[0.06]">
        <div className="text-[9px] font-bold tracking-[0.26em] uppercase text-white/30">Match Analytics</div>
        <CardBrand />
      </div>

      {/* Score hero */}
      <div className="border-b border-white/[0.06]"
        style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.02) 0%,transparent 60%)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', padding:'16px 20px' }}>

          {/* Home — logo + name on same row */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:4 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <TeamLogo logo={getLogo(d.homeTeamLogo, d.homeTeam)} name={d.homeTeam} size={40} />
              <div className="font-bebas text-[20px] leading-none text-white">{homeName.toUpperCase()}</div>
            </div>
            <div className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color:homeColor }}>Home</div>
          </div>

          {/* Score */}
          <div style={{ textAlign:'center', padding:'0 12px' }}>
            <div className="font-bebas text-[52px] leading-none text-white tracking-[0.04em]">
              {d.homeScore} – {d.awayScore}
            </div>
            <div className={`inline-flex items-center gap-1 border px-2.5 py-0.5 mt-1.5 text-[9px] font-bold tracking-[0.18em] uppercase ${
              isLive ? 'border-[#e0000a]/30 bg-[#e0000a]/10 text-[#e0000a]' : 'border-white/[0.1] bg-white/[0.04] text-white/35'
            }`}>
              {stMap[d.status]||'Full Time'}
            </div>
          </div>

          {/* Away — logo + name on same row */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div className="font-bebas text-[20px] leading-none text-white">{awayName.toUpperCase()}</div>
              <TeamLogo logo={getLogo(d.awayTeamLogo, d.awayTeam)} name={d.awayTeam} size={40} />
            </div>
            <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-right" style={{ color:awayColor }}>Away</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">

        {/* Color key legend */}
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12,
          padding:'4px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
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

        {/* Possession — always sums to 100%, text readable on any color */}
        <div className="mb-4">
          <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/28 mb-2">Possession</div>
          <PossBar hp={d.homePoss} homeColor={homeColor} awayColor={awayColor} />
        </div>

        {/* Stats — proportional bars (leader = full width, other = proportional) */}
        {[
          { lbl:'Shots',           hv:d.homeShots,   av:d.awayShots },
          { lbl:'Shots on Target', hv:d.homeSOT,     av:d.awaySot },
          { lbl:'Corners',         hv:d.homeCorners, av:d.awayCorners },
          { lbl:'Fouls',           hv:d.homeFouls,   av:d.awayFouls, gold:true },
        ].map(({ lbl, hv, av, gold }) => (
          <div key={lbl} className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-bebas text-[16px] text-white">{hv}</span>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/28">{lbl}</span>
              <span className="font-bebas text-[16px] text-white/38">{av}</span>
            </div>
            <AnBar hv={hv} av={av} homeColor={homeColor} awayColor={awayColor} gold={gold} />
          </div>
        ))}

        {/* Cards */}
        <div className="flex justify-between items-center pt-1 mb-1">
          <CardBoxes yellow={d.homeYellow} red={d.homeRed} />
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/28">Cards</span>
          <CardBoxes yellow={d.awayYellow} red={d.awayRed} />
        </div>
      </div>
    </div>
  )
}

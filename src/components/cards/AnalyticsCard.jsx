import { CardBrand } from '../ui/SharedUI'
import { TEAMS } from '../../lib/teamLogos'
import { resolveTeamColors } from '../../lib/colorUtils'

// Resolve logo: use stored state value, or fall back to live TEAMS lookup
const getLogo = (storedLogo, teamName) =>
  storedLogo || TEAMS[teamName]?.logo || null



// Helper: auto-shorten very long team names
const shortName = (custom, full) => {
  if (custom && custom.trim()) return custom.trim()
  if (!full) return ''
  if (full.length <= 14) return full
  // Common abbreviations
  const map = {
    'Manchester City':'Man City','Manchester United':'Man Utd',
    'Tottenham Hotspur':'Spurs','Tottenham':'Spurs',
    'Borussia Dortmund':'Dortmund','Borussia M\'gladbach':'M\'gladbach',
    'Nottingham Forest':'Nott\'m Forest','Crystal Palace':'Crystal Pal.',
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

const AnBar = ({ hv, av, homeColor, awayColor, gold }) => {
  const max = Math.max(parseFloat(hv)||0, parseFloat(av)||0)||1
  return (
    <div className="h-2 relative flex" style={{ background:'rgba(255,255,255,0.05)' }}>
      <div style={{ width:`${(parseFloat(hv)||0)/max*100}%`, height:'100%',
        background:gold?'rgba(245,200,66,0.55)':homeColor, transition:'width 0.7s' }} />
      <div className="absolute right-0 top-0 bottom-0"
        style={{ width:`${(parseFloat(av)||0)/max*100}%`,
          background:gold?'rgba(245,200,66,0.2)':awayColor, transition:'width 0.7s' }} />
    </div>
  )
}

const PossBar = ({ hp, homeColor, awayColor }) => {
  const h = parseFloat(hp)||50, a = 100-h
  return (
    <div className="h-7 flex overflow-hidden border border-white/[0.06]"
      style={{ background:'rgba(255,255,255,0.03)' }}>
      <div className="h-full flex items-center justify-end pr-2.5"
        style={{ width:`${h}%`, background:homeColor, transition:'width 1s' }}>
        <span className="font-bebas text-[13px] text-white drop-shadow-sm">{h}%</span>
      </div>
      <div className="flex-1 flex items-center pl-2.5" style={{ background:awayColor }}>
        <span className="font-bebas text-[13px] text-white drop-shadow-sm">{a}%</span>
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

// Visual card boxes: small coloured square + count
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
  const homeName  = shortName(d.homeDisplayName, d.homeTeam)
  const awayName  = shortName(d.awayDisplayName, d.awayTeam)

  const isLive = d.status === 'LIVE'
  const stMap  = { FT:'Full Time', HT:'Half Time', LIVE:'● Live' }

  // Split events into home and away for two-column timeline
  const allEvs = [
    { t:d.ev1, s:d.ev1side }, { t:d.ev2, s:d.ev2side },
    { t:d.ev3, s:d.ev3side }, { t:d.ev4, s:d.ev4side },
  ].filter(e => e.t?.trim())
  const homeEvs = allEvs.filter(e => e.s === 'home')
  const awayEvs = allEvs.filter(e => e.s === 'away')
  const maxEvRows = Math.max(homeEvs.length, awayEvs.length)

  return (
    <div id="preview-analytics"
      style={{ width:460, background:'#0d0d14', border:'1px solid rgba(255,255,255,0.1)', maxWidth:'100%' }}>

      {/* Accent bar */}
      <div style={{ height:3, background:`linear-gradient(90deg,${homeColor},${awayColor})` }} />

      {/* Header */}
      <div className="flex justify-between items-start px-4 py-3 border-b border-white/[0.06]">
        <div className="text-[9px] font-bold tracking-[0.26em] uppercase text-white/30">Match Analytics</div>
        <CardBrand />
      </div>

      {/* Score hero — fully centered layout */}
      <div className="border-b border-white/[0.06]"
        style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.02) 0%,transparent 60%)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center',
          padding:'16px 20px' }}>

          {/* Home — logo + name on same row */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:4 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <TeamLogo logo={getLogo(d.homeTeamLogo, d.homeTeam)} name={d.homeTeam} size={40} />
              <div className="font-bebas text-[20px] leading-none text-white">{homeName.toUpperCase()}</div>
            </div>
            <div className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color:homeColor }}>Home</div>
          </div>

          {/* Score — absolute center */}
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

        {/* Possession */}
        <div className="mb-4">
          <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/28 mb-2">Possession</div>
          <PossBar hp={d.homePoss} homeColor={homeColor} awayColor={awayColor} />
        </div>

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

        {/* Cards — no emojis, text only */}
        <div className="flex justify-between items-center pt-1 mb-1">
          <CardBoxes yellow={d.homeYellow} red={d.homeRed} />
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/28">Cards</span>
          <CardBoxes yellow={d.awayYellow} red={d.awayRed} />
        </div>
      </div>

      {/* Timeline — home events LEFT, away events RIGHT */}
      <div className="px-4 pb-4 border-t border-white/[0.06]">
        <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mt-3 mb-3">
          Match Timeline
        </div>

        {/* Visual timeline bar */}
        <div className="h-[3px] relative mb-4"
          style={{ background:`linear-gradient(90deg,${homeColor}40,${awayColor}40)` }}>
          {allEvs.map((ev, i) => {
            const min = parseInt(ev.t.match(/\d+/)?.[0]) || ((i+1)*20)
            return (
              <div key={i} className="absolute top-[-7px] w-[3px] h-[17px] -translate-x-1/2"
                style={{ left:`${Math.min((min/95)*100,97)}%`,
                  background: ev.s==='home' ? homeColor : awayColor }} />
            )
          })}
        </div>

        {/* Two-column scorer list: home LEFT, away RIGHT */}
        {maxEvRows > 0 && (
          <div className="flex flex-col gap-1.5">
            {Array.from({ length: maxEvRows }).map((_, i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                {/* Home event */}
                <div className="flex items-center gap-2">
                  {homeEvs[i] && (
                    <>
                      <span className="font-bebas text-[13px] min-w-[24px] shrink-0"
                        style={{ color: homeColor }}>
                        {parseInt(homeEvs[i].t.match(/\d+/)?.[0])||''}' 
                      </span>
                      <div className="w-1.5 h-1.5 shrink-0" style={{ background: homeColor }} />
                      <span className="text-[11px] font-semibold tracking-[0.04em] text-white/80 truncate">
                        {homeEvs[i].t.replace(/^\d+'\s*/, '')}
                      </span>
                    </>
                  )}
                </div>
                {/* Away event */}
                <div className="flex items-center gap-2 justify-end text-right">
                  {awayEvs[i] && (
                    <>
                      <span className="text-[11px] font-semibold tracking-[0.04em] text-white/38 truncate">
                        {awayEvs[i].t.replace(/^\d+'\s*/, '')}
                      </span>
                      <div className="w-1.5 h-1.5 shrink-0" style={{ background: awayColor }} />
                      <span className="font-bebas text-[13px] min-w-[24px] shrink-0 text-right"
                        style={{ color: awayColor }}>
                        {parseInt(awayEvs[i].t.match(/\d+/)?.[0])||''}'
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06]"
        style={{ background:'rgba(0,0,0,0.3)' }}>
        <CardBrand />
        <span className="text-[9px] text-white/18 tracking-[0.05em]">{d.venue}</span>
      </div>
    </div>
  )
}

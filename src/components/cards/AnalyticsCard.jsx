import { CardBrand } from '../ui/SharedUI'

const AnBar = ({ hv, av, homeColor, awayColor, gold }) => {
  const max = Math.max(parseFloat(hv)||0, parseFloat(av)||0)||1
  return (
    <div className="h-2 relative flex" style={{ background:'rgba(255,255,255,0.05)' }}>
      <div style={{ width:`${(parseFloat(hv)||0)/max*100}%`, height:'100%', background:gold?'rgba(245,200,66,0.55)':homeColor, transition:'width 0.7s' }} />
      <div className="absolute right-0 top-0 bottom-0"
        style={{ width:`${(parseFloat(av)||0)/max*100}%`, background:gold?'rgba(245,200,66,0.2)':awayColor, transition:'width 0.7s' }} />
    </div>
  )
}

const PossBar = ({ hp, homeColor, awayColor }) => {
  const h = parseFloat(hp)||50, a = 100-h
  return (
    <div className="h-7 flex overflow-hidden border border-white/[0.06]" style={{ background:'rgba(255,255,255,0.03)' }}>
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

// Uses data URL from state — zero CORS issues
const TeamLogo = ({ logo, name, size = 48 }) => {
  if (logo) {
    return <img src={logo} alt={name} style={{ width:size, height:size, objectFit:'contain' }} />
  }
  return (
    <div style={{ width:size, height:size, background:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:size/4, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em' }}>
        {name?.slice(0,3).toUpperCase()}
      </span>
    </div>
  )
}

export default function AnalyticsCard({ d }) {
  const homeColor = d.homeTeamColor || '#7BCBEB'
  const awayColor = d.awayTeamColor || '#e0000a'

  const evs = [
    { t:d.ev1, s:d.ev1side }, { t:d.ev2, s:d.ev2side },
    { t:d.ev3, s:d.ev3side }, { t:d.ev4, s:d.ev4side },
  ].filter(e => e.t?.trim())

  const isLive = d.status === 'LIVE'
  const stMap  = { FT:'Full Time', HT:'Half Time', LIVE:'● Live' }

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

      {/* Score hero */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]"
        style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.02) 0%,transparent 60%)' }}>
        <div>
          <div className="flex items-center gap-2.5">
            <TeamLogo logo={d.homeTeamLogo} name={d.homeTeam} size={48} />
            <div className="font-bebas text-[24px] leading-none text-white">{d.homeTeam.toUpperCase()}</div>
          </div>
          <div className="text-[9px] font-bold tracking-[0.15em] uppercase mt-1.5 ml-0.5" style={{ color:homeColor }}>Home</div>
        </div>

        <div className="text-center">
          <div className="font-bebas text-[52px] leading-none text-white tracking-[0.04em]">
            {d.homeScore} – {d.awayScore}
          </div>
          <div className={`inline-flex items-center gap-1 border px-2.5 py-0.5 mt-1.5 text-[9px] font-bold tracking-[0.18em] uppercase ${
            isLive ? 'border-[#e0000a]/30 bg-[#e0000a]/10 text-[#e0000a]' : 'border-white/[0.1] bg-white/[0.04] text-white/35'
          }`}>
            {stMap[d.status]||'Full Time'}
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2.5 justify-end">
            <div className="font-bebas text-[24px] leading-none text-white">{d.awayTeam.toUpperCase()}</div>
            <TeamLogo logo={d.awayTeamLogo} name={d.awayTeam} size={48} />
          </div>
          <div className="text-[9px] font-bold tracking-[0.15em] uppercase mt-1.5 text-right mr-0.5" style={{ color:awayColor }}>Away</div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="flex justify-between text-[9px] font-bold tracking-[0.2em] uppercase mb-4"
          style={{ color:'rgba(255,255,255,0.22)' }}>
          <span>{d.homeTeam.split(' ').pop()}</span>
          <span>{d.awayTeam.split(' ').pop()}</span>
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
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/28">{lbl}</span>
              <span className="font-bebas text-[16px] text-white/38">{av}</span>
            </div>
            <AnBar hv={hv} av={av} homeColor={homeColor} awayColor={awayColor} gold={gold} />
          </div>
        ))}

        {/* Cards */}
        <div className="flex justify-between items-center pt-1">
          <span className="font-bebas text-[16px] text-white">
            {d.homeYellow}🟨{parseInt(d.homeRed)>0?` ${d.homeRed}🟥`:''}
          </span>
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/28">Cards</span>
          <span className="font-bebas text-[16px] text-white/38">
            {d.awayYellow}🟨{parseInt(d.awayRed)>0?` ${d.awayRed}🟥`:''}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-4 pb-4 border-t border-white/[0.06]">
        <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mt-3 mb-3">Match Timeline</div>
        <div className="h-[3px] relative mb-3"
          style={{ background:`linear-gradient(90deg,${homeColor}40,${awayColor}40)` }}>
          {evs.map((ev,i) => {
            const min = parseInt(ev.t.match(/\d+/)?.[0])||((i+1)*20)
            return (
              <div key={i} className="absolute top-[-7px] w-[3px] h-[17px] -translate-x-1/2"
                style={{ left:`${Math.min((min/95)*100,97)}%`, background:ev.s==='home'?homeColor:awayColor }} />
            )
          })}
        </div>
        <div className="flex flex-col gap-1.5">
          {evs.map((ev,i) => {
            const min = parseInt(ev.t.match(/\d+/)?.[0])||((i+1)*20)
            const isHome = ev.s === 'home'
            return (
              <div key={i} className="flex items-center gap-2.5">
                <span className="font-bebas text-[13px] min-w-[24px]" style={{ color:isHome?homeColor:awayColor }}>{min}'</span>
                <div className="w-1.5 h-1.5 shrink-0" style={{ background:isHome?homeColor:awayColor }} />
                <span className="text-[11px] font-semibold tracking-[0.04em]"
                  style={{ color:isHome?'rgba(255,255,255,0.8)':'rgba(255,255,255,0.35)' }}>{ev.t}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06]"
        style={{ background:'rgba(0,0,0,0.3)' }}>
        <CardBrand />
        <span className="text-[9px] text-white/18 tracking-[0.05em]">{d.venue}</span>
      </div>
    </div>
  )
}

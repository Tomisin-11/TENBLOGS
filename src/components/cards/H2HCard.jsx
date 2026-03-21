import { CardBrand } from '../ui/SharedUI'

// Uses homeColor / awayColor applied per user's edits
const DualBar = ({ hv, av, homeColor, awayColor }) => {
  const t = (parseFloat(hv)||0)+(parseFloat(av)||0)||1
  return (
    <div className="h-2 flex overflow-hidden" style={{ background:'rgba(255,255,255,0.05)' }}>
      <div style={{ width:`${(parseFloat(hv)||0)/t*100}%`, background:homeColor, transition:'width 0.7s', height:'100%' }} />
      <div style={{ width:`${(parseFloat(av)||0)/t*100}%`, background:awayColor, transition:'width 0.7s', height:'100%' }} />
    </div>
  )
}

// W=green, D=gray, L=red per user's edit
const FormDot = ({ r }) => {
  const s = { W:'bg-green-600 text-white', D:'bg-white/[0.1] text-white/50 border border-white/[0.15]', L:'bg-red-600 text-white' }
  return <div className={`w-[22px] h-[22px] flex items-center justify-center text-[9px] font-bold ${s[r]||s.D}`}>{r}</div>
}

// Logo uses data URL from state — no external fetch at render time
const TeamLogo = ({ logo, name, size = 48 }) => {
  if (logo) {
    return (
      <img src={logo} alt={name}
        style={{ width:size, height:size, objectFit:'contain' }} />
    )
  }
  return (
    <div style={{ width:size, height:size, background:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:size/4, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em' }}>
        {name?.slice(0,3).toUpperCase()}
      </span>
    </div>
  )
}

export default function H2HCard({ d }) {
  const homeColor = d.homeTeamColor || '#7BCBEB'
  const awayColor = d.awayTeamColor || '#e0000a'

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

      {/* Teams row */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2.5">
            <TeamLogo logo={d.homeTeamLogo} name={d.homeTeam} size={48} />
            <div className="font-bebas text-[24px] leading-none text-white">{d.homeTeam.toUpperCase()}</div>
          </div>
          <div className="text-[9px] font-bold tracking-[0.15em] uppercase mt-1.5 ml-0.5" style={{ color:homeColor }}>Home</div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <div className="border px-4 py-1 text-[11px] font-bold tracking-[0.15em]"
            style={{ borderColor:`${homeColor}40`, background:`${homeColor}15`, color:homeColor }}>H2H</div>
          <div className="text-[9px] font-bold tracking-[0.08em] uppercase text-white/22 text-center">{d.date}</div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2.5 justify-end">
            <div className="font-bebas text-[24px] leading-none text-white">{d.awayTeam.toUpperCase()}</div>
            <TeamLogo logo={d.awayTeamLogo} name={d.awayTeam} size={48} />
          </div>
          <div className="text-[9px] font-bold tracking-[0.15em] uppercase mt-1.5 text-right mr-0.5" style={{ color:awayColor }}>Away</div>
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
          { lbl:'Total Goals',    hv:d.homeGoals, av:d.awayGoals },
          { lbl:'Avg Possession', hv:d.homePoss,  av:100-parseFloat(d.homePoss||50) },
          { lbl:'Shots / Game',   hv:d.homeShots, av:d.awayShots },
        ].map(({ lbl, hv, av }) => (
          <div key={lbl} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bebas text-[18px] text-white">{hv}</span>
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/28">{lbl}</span>
              <span className="font-bebas text-[18px] text-white/38">{av}</span>
            </div>
            <DualBar hv={hv} av={av} homeColor={homeColor} awayColor={awayColor} />
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="px-4 py-3 border-t border-white/[0.06]">
        <div className="text-[11px] text-center font-bold tracking-[0.2em] uppercase text-white/50 mb-3">Recent Form (Last 5)</div>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">{hF.map((r,i) => <FormDot key={i} r={r} />)}</div>
          <div className="flex gap-1 flex-row-reverse">{aF.map((r,i) => <FormDot key={i} r={r} />)}</div>
        </div>
      </div>

      {/* Recent meetings */}
      <div className="px-4 pb-4 border-t border-white/[0.06]">
        <div className="text-[13px] text-center font-bold tracking-[0.2em] uppercase text-white/50 mt-3 mb-3">Last 3 Meetings</div>
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

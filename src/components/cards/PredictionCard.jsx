import { CardBrand } from '../ui/SharedUI'
import { TEAMS } from '../../lib/teamLogos'

// Resolve logo: use stored state value, or fall back to live TEAMS lookup
const getLogo = (storedLogo, teamName) =>
  storedLogo || TEAMS[teamName]?.logo || null



export default function PredictionCard({ d }) {
  const p1   = parseFloat(d.homeWinPct)||0
  const p2   = parseFloat(d.drawPct)||0
  const p3   = parseFloat(d.awayWinPct)||0
  const maxP = Math.max(p1,p2,p3)||1

  return (
    <div id="preview-prediction"
      style={{ width:380, background:'#0d0d14', border:'1px solid rgba(255,255,255,0.1)', maxWidth:'100%' }}>

      <div style={{ height:3, background:'linear-gradient(90deg,#e0000a,#ff3040 40%,rgba(255,60,60,0.15) 100%)' }} />

      <div className="flex justify-between items-start px-4 py-3 border-b border-white/[0.06]" style={{ background:'rgba(0,0,0,0.3)' }}>
        <span className="text-[9px] font-bold tracking-[0.26em] uppercase text-white/30">Match Prediction</span>
        <CardBrand />
      </div>

      {/* Match info */}
      <div className="px-4 py-4 border-b border-white/[0.06]">
        <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-2.5">{d.comp}</div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <div className="flex items-center gap-2">
            {getLogo(d.homeTeamLogo, d.homeTeam) && <img src={getLogo(d.homeTeamLogo, d.homeTeam)} alt={d.homeTeam} style={{ width:28, height:28, objectFit:'contain' }} />}
            <span className="font-bebas text-[22px] tracking-[0.03em] text-white">{d.homeTeam?.toUpperCase()}</span>
          </div>
          <span className="text-[11px] text-white/18 font-bold">VS</span>
          <div className="flex items-center gap-2">
            <span className="font-bebas text-[22px] tracking-[0.03em] text-white">{d.awayTeam?.toUpperCase()}</span>
            {getLogo(d.awayTeamLogo, d.awayTeam) && <img src={getLogo(d.awayTeamLogo, d.awayTeam)} alt={d.awayTeam} style={{ width:28, height:28, objectFit:'contain' }} />}
          </div>
        </div>
        <div className="text-[10px] text-white/28 tracking-[0.05em]">{d.date}</div>
      </div>

      {/* Prediction */}
      <div className="px-4 py-4 border-b border-white/[0.06]"
        style={{ background:'linear-gradient(135deg,rgba(224,0,10,0.07),transparent)' }}>
        <div className="text-[9px] font-bold tracking-[0.22em] uppercase text-white/28 mb-2">My Prediction</div>
        <div className="font-bebas text-[58px] leading-none text-white tracking-[0.04em]">{d.predictedScore}</div>
        <div className="text-[11px] text-white/35 mt-1.5 italic">"{d.pickNote}"</div>
      </div>

      {/* Poll */}
      <div className="px-4 py-4 border-b border-white/[0.06]">
        <div className="text-[9px] font-bold tracking-[0.22em] uppercase text-white/28 mb-4">Fan Poll</div>
        <div className="flex gap-2 items-end h-[68px]">
          {[
            { pct:p1, lbl:d.homeTeam?.split(' ').pop(), win:p1===maxP },
            { pct:p2, lbl:'Draw',                       win:p2===maxP },
            { pct:p3, lbl:d.awayTeam?.split(' ').pop(), win:p3===maxP },
          ].map(({ pct:pv, lbl, win }) => (
            <div key={lbl} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full" style={{
                height:`${(pv/maxP)*56}px`,
                background:win?'linear-gradient(to top,rgba(224,0,10,0.65),rgba(224,0,10,0.3))':'rgba(255,255,255,0.07)',
                borderTop:`2px solid ${win?'#e0000a':'rgba(255,255,255,0.1)'}`,
                transition:'height 0.8s',
              }} />
              <span className={`font-bebas text-[16px] ${win?'text-white':'text-white/35'}`}>{pv}%</span>
              <span className="text-[8px] font-bold tracking-[0.1em] uppercase text-white/25 text-center truncate w-full">{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5" style={{ background:'rgba(0,0,0,0.3)' }}>
        <CardBrand />
        <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-white/18">@tenblogs</span>
      </div>
    </div>
  )
}

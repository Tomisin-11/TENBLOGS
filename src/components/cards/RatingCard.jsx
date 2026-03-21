import { ShieldCheck, Star, Target, Zap, Crosshair, Activity, BarChart2, Clock, AlertTriangle, TrendingUp, MessageSquare, Flame, User, Award } from 'lucide-react'
import { getVerdict, safePct } from '../../lib/verdicts'
import { RedTopBar, CardBrand, StatCell, StatsRow } from '../ui/SharedUI'

export default function RatingCard({ d, img }) {
  const verdict = getVerdict(d.rating)
  const rPct    = Math.min(100, (parseFloat(d.rating) / 10) * 100)

  return (
    <div id="preview-rating" style={{ width:460, background:'#0d0d14', border:'1px solid rgba(255,255,255,0.1)', maxWidth:'100%' }}>
      <RedTopBar />

      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]" style={{ background:'rgba(0,0,0,0.4)' }}>
        <div className="flex items-center gap-2 border border-[#e0000a]/25 bg-[#e0000a]/10 px-3 py-1.5 shrink-0">
          <ShieldCheck size={11} strokeWidth={2.5} className="text-[#e0000a]" />
          <span className="text-[11px] font-bold tracking-[0.06em] text-white">{d.position}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-white/40 hidden sm:block">{d.homeTeam}</span>
          <div className="flex items-center" style={{ background:'#181824', border:'1px solid rgba(255,255,255,0.1)' }}>
            <span className="font-bebas text-[20px] text-white tracking-wider px-3 py-0.5">{d.homeScore}</span>
            <span className="text-[12px] text-white/20 px-0.5">–</span>
            <span className="font-bebas text-[20px] text-white/35 tracking-wider px-3 py-0.5">{d.awayScore}</span>
          </div>
          <span className="text-[10px] font-bold text-white/28 hidden sm:block">{d.awayTeam}</span>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-white/[0.06]" style={{ background:'linear-gradient(135deg,rgba(224,0,10,0.06) 0%,transparent 50%)' }}>
        <div className="flex items-center gap-4">
          <div style={{ width:76, height:76, borderRadius:'50%', flexShrink:0, overflow:'hidden', background:'#1c1c2a', border:'2px solid rgba(224,0,10,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {img ? <img src={img} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
              : <User size={26} style={{ color:'rgba(255,255,255,0.12)' }} />}
          </div>
          <div className="flex-1 flex items-end gap-4 overflow-hidden">
            {[{ lbl:'RTG', val:parseFloat(d.rating||0).toFixed(1), big:true }, { lbl:'GLS', val:d.goals }, { lbl:'AST', val:d.assists }, { lbl:'SHT', val:d.shots }, { lbl:'KP', val:d.keyPasses }].map(({ lbl, val, big }) => (
              <div key={lbl} className="flex flex-col items-center shrink-0">
                <span className={`font-bebas leading-none ${big?'text-[34px] text-white':'text-[22px] text-white/80'}`}>{val}</span>
                <span className={`text-[8px] font-bold tracking-[0.2em] uppercase mt-0.5 ${big?'text-[#e0000a]':'text-white/30'}`}>{lbl}</span>
              </div>
            ))}
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
            <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/25">{d.comp}</span>
            <div className="text-[11px] font-semibold text-white/50 text-right leading-snug">
              {d.date.split(',').map((p,i) => <div key={i}>{p.trim()}</div>)}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between gap-3 mt-3.5">
          <div className="min-w-0">
            <div className="font-bebas text-[28px] leading-none tracking-[0.03em] text-white">{d.name.toUpperCase()}</div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <div className="w-1.5 h-1.5 bg-[#e0000a] shrink-0" />
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/50">{d.club}</span>
              <span className="text-white/10">·</span>
              <span className="text-[10px] text-white/28">{d.match}</span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 border px-2.5 py-1.5 shrink-0 ${verdict.tw}`}>
            <Award size={10} strokeWidth={2} />
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase">{verdict.label}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex-1 h-[3px] overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
            <div style={{ width:`${rPct}%`, height:'100%', background:`linear-gradient(90deg,#e0000a,${verdict.color})`, transition:'width 0.8s' }} />
          </div>
          <span className="font-bebas text-[14px] tracking-[0.05em] shrink-0" style={{ color:verdict.color }}>
            {parseFloat(d.rating||0).toFixed(1)} / 10
          </span>
        </div>
      </div>

      <div className="border-b border-white/[0.06]">
        <StatsRow><StatCell Icon={Star} label="RTG" value={parseFloat(d.rating||0).toFixed(1)} accent accentColor="#e0000a" /><StatCell Icon={Target} label="GLS" value={d.goals} /><StatCell Icon={Zap} label="AST" value={d.assists} /></StatsRow>
        <StatsRow><StatCell Icon={Crosshair} label="SHT" value={d.shots} sub={d.shotsOnTarget?`${d.shotsOnTarget} on tgt`:null} /><StatCell Icon={ShieldCheck} label="DUEL" value={`${d.duelsWon}-${d.duelsTotal}`} sub={d.duelsTotal?`${safePct(d.duelsWon,d.duelsTotal)}%`:null} wide /><StatCell Icon={Activity} label="TCH" value={d.touches} /></StatsRow>
        <StatsRow><StatCell Icon={BarChart2} label="PASS" value={`${d.passComp}-${d.passTotal}`} sub={d.passAcc?`${d.passAcc}%`:null} wide /><StatCell Icon={Clock} label="MIN" value={d.minutes} /><StatCell Icon={AlertTriangle} label="YC" value={d.yellowCards} /></StatsRow>
        <StatsRow last><StatCell Icon={TrendingUp} label="DRIB" value={`${d.dribblesWon}/${d.dribblesTotal}`} sub={d.dribblesTotal?`${safePct(d.dribblesWon,d.dribblesTotal)}%`:null} wide /><StatCell Icon={MessageSquare} label="KEY PASS" value={d.keyPasses} /><StatCell Icon={Flame} label="xG" value={parseFloat(d.xg||0).toFixed(1)} /></StatsRow>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5" style={{ background:'rgba(0,0,0,0.3)' }}>
        <CardBrand />
        <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-white/18">@tenblogs · tenblogs.com</span>
      </div>
    </div>
  )
}

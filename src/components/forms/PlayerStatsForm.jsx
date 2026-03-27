import { useRef } from 'react'
import { SectionLabel, Field } from '../ui/SharedUI'
import { POSITION_STATS } from '../cards/PlayerStatsCard'

const POSITIONS = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper']

const STAT_LABELS = {
  matchRating: 'Match Rating (e.g. 8.5)',
  goals: 'Goals',
  assists: 'Assists',
  shots: 'Shots',
  shotsOnTarget: 'Shots on Target',
  bigChancesCreated: 'Big Chances Created',
  xg: 'xG (expected goals)',
  touches: 'Touches',
  dribbles: 'Dribbles Won',
  keyPasses: 'Key Passes',
  passAccuracy: 'Pass Accuracy %',
  tackles: 'Tackles',
  interceptions: 'Interceptions',
  clearances: 'Clearances',
  blockedShots: 'Blocked Shots',
  duelsWon: 'Duels Won',
  aerialDuels: 'Aerial Duels Won',
  saves: 'Saves',
  savePct: 'Save Percentage',
  bigSaves: 'Big Saves',
  penaltiesSaved: 'Penalties Saved',
  cleanSheet: 'Clean Sheet (Yes/No)',
  distribution: 'Distribution %',
}

export default function PlayerStatsForm({ d, setD, img, setImg }) {
  const imgRef = useRef()
  const set = (k, v) => setD(prev => ({ ...prev, [k]: v }))

  const pos = d.position || 'Forward'
  const posStats = POSITION_STATS[pos] || POSITION_STATS.Forward
  const selectedKeys = d.selectedStats || posStats.slice(0, 6).map(s => s.key)

  const toggleStat = key => {
    const next = selectedKeys.includes(key)
      ? selectedKeys.filter(k => k !== key)
      : [...selectedKeys, key]
    // Max 6
    if (next.length <= 6) set('selectedStats', next)
  }

  const handleImg = e => {
    const f = e.target.files[0]
    if (!f) return
    const r2 = new FileReader(); r2.onload = ev => setImg(ev.target.result); r2.readAsDataURL(f)
  }

  return (
    <div className="flex flex-col gap-5">
      <SectionLabel>Player Image</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={() => imgRef.current?.click()}
          className="w-full border border-white/[0.08] bg-white/[0.03] hover:border-white/20 text-white/50 text-[12px] tracking-widest py-2.5 transition-colors uppercase"
        >
          {img ? '✓ Image Set — Change' : 'Upload Player Image'}
        </button>
        <input ref={imgRef} type="file" accept="image/*" onChange={handleImg} className="hidden" />
        {img && (
          <button onClick={() => setImg(null)} className="text-[10px] text-white/30 hover:text-red-400 transition-colors tracking-widest uppercase">
            Remove image
          </button>
        )}
      </div>

      <SectionLabel>Player Info</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        <Field label="Player Name" value={d.playerName || ''} onChange={v => set('playerName', v)} />
        <Field label="Club" value={d.club || ''} onChange={v => set('club', v)} />
        <Field label="Match (e.g. vs Arsenal)" value={d.match || ''} onChange={v => set('match', v)} />
      </div>

      <SectionLabel>Position</SectionLabel>
      <div className="flex gap-2 flex-wrap">
        {POSITIONS.map(p => (
          <button
            key={p}
            onClick={() => { set('position', p); set('selectedStats', POSITION_STATS[p].slice(0, 6).map(s => s.key)) }}
            className={`px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase border transition-all ${
              pos === p
                ? 'border-[#e0000a] bg-[#e0000a]/20 text-white'
                : 'border-white/10 bg-white/[0.03] text-white/40 hover:border-white/25'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <SectionLabel>Select Stats (max 6)</SectionLabel>
      <div className="flex flex-col gap-2">
        <div className="text-[9px] text-white/25 tracking-widest uppercase">{selectedKeys.length}/6 selected</div>
        <div className="flex flex-wrap gap-1.5">
          {posStats.map(stat => {
            const on = selectedKeys.includes(stat.key)
            return (
              <button
                key={stat.key}
                onClick={() => toggleStat(stat.key)}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-[0.1em] uppercase border transition-all ${
                  on
                    ? 'border-[#e0000a]/60 bg-[#e0000a]/15 text-[#e0000a]'
                    : 'border-white/[0.07] bg-white/[0.02] text-white/30 hover:border-white/20'
                } ${!on && selectedKeys.length >= 6 ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                {stat.label}
              </button>
            )
          })}
        </div>
      </div>

      <SectionLabel>Fill Stats</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        {posStats
          .filter(s => selectedKeys.includes(s.key))
          .map(stat => (
            <Field
              key={stat.key}
              label={STAT_LABELS[stat.key] || stat.label}
              value={d[stat.key] || ''}
              onChange={v => set(stat.key, v)}
            />
          ))}
      </div>
    </div>
  )
}

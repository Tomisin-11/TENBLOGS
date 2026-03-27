import { SectionLabel, Field, ColorField } from '../ui/SharedUI'

const DEFAULT_MATCHUP = { teamA: '', teamB: '', label: '', winner: '' }

export default function TournamentForm({ d, setD }) {
  const set = (k, v) => setD(prev => ({ ...prev, [k]: v }))

  const matchups = d.matchups || [
    { teamA: 'Bosnia', teamB: 'Italy', label: 'PATH A', winner: '' },
    { teamA: 'Sweden', teamB: 'Poland', label: 'PATH B', winner: '' },
    { teamA: 'Kosovo', teamB: 'Türkiye', label: 'PATH C', winner: '' },
    { teamA: 'Czechia', teamB: 'Denmark', label: 'PATH D', winner: '' },
  ]

  const updateMatchup = (i, key, val) => {
    const next = matchups.map((m, idx) => idx === i ? { ...m, [key]: val } : m)
    set('matchups', next)
  }

  const addMatchup = () => set('matchups', [...matchups, { ...DEFAULT_MATCHUP }])
  const removeMatchup = i => set('matchups', matchups.filter((_, idx) => idx !== i))

  return (
    <div className="flex flex-col gap-5">
      <SectionLabel>Tournament Info</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        <Field label="Title (e.g. UEFA PLAY-OFF FINALS)" value={d.title || ''} onChange={v => set('title', v)} />
        <Field label="Label above title (e.g. 2026 World Cup)" value={d.tournamentLabel || ''} onChange={v => set('tournamentLabel', v)} />
        <Field label="Date (optional, e.g. Tuesday, 31 March 2026)" value={d.date || ''} onChange={v => set('date', v)} />
        <ColorField label="Background Color" value={d.bgColor || '#060612'} onChange={v => set('bgColor', v)} />
      </div>

      <SectionLabel>Matchups</SectionLabel>
      <div className="flex flex-col gap-4">
        {matchups.map((m, i) => (
          <div key={i} className="border border-white/[0.07] p-3 flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Matchup {i + 1}</span>
              <button
                onClick={() => removeMatchup(i)}
                className="text-[9px] text-white/20 hover:text-red-400 transition-colors tracking-widest uppercase"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-1">Team A</label>
                <input
                  value={m.teamA}
                  onChange={e => updateMatchup(i, 'teamA', e.target.value)}
                  placeholder="e.g. Italy"
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[12px] px-2 py-1.5 focus:border-[#e0000a] focus:bg-[#e0000a]/5"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-1">Team B</label>
                <input
                  value={m.teamB}
                  onChange={e => updateMatchup(i, 'teamB', e.target.value)}
                  placeholder="e.g. Sweden"
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[12px] px-2 py-1.5 focus:border-[#e0000a] focus:bg-[#e0000a]/5"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-1">Path / Round Label</label>
                <input
                  value={m.label}
                  onChange={e => updateMatchup(i, 'label', e.target.value)}
                  placeholder="e.g. PATH A"
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[12px] px-2 py-1.5 focus:border-[#e0000a] focus:bg-[#e0000a]/5"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-1">Winner (A or B)</label>
                <select
                  value={m.winner}
                  onChange={e => updateMatchup(i, 'winner', e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[12px] px-2 py-1.5 focus:border-[#e0000a]"
                >
                  <option value="" className="bg-[#0d0d16]">— TBD —</option>
                  <option value="A" className="bg-[#0d0d16]">Team A</option>
                  <option value="B" className="bg-[#0d0d16]">Team B</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addMatchup}
          className="w-full border border-dashed border-white/[0.12] bg-white/[0.02] hover:border-[#e0000a]/40 text-white/30 hover:text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase py-2.5 transition-all"
        >
          + Add Matchup
        </button>
      </div>
    </div>
  )
}

import { CLUB_NAMES, COUNTRY_NAMES, TEAMS } from '../../lib/teamLogos'

/**
 * TeamSelect — shows clubs and national teams in separate optgroups.
 * Logos are local SVGs — no async fetching needed.
 */
export default function TeamSelect({ label, value, onChange, colorValue, onColorChange, side = 'home' }) {
  const team = TEAMS[value]

  const handleSelect = (name) => {
    const t = TEAMS[name]
    onChange({
      name,
      logo: t?.logo || null,
      homeColor: t?.home || '#e0000a',
      awayColor: t?.away || '#ffffff',
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">{label}</label>

      {/* Logo + name preview */}
      <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] px-3 py-2">
        <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-white/[0.06] p-1">
          {team?.logo
            ? <img src={team.logo} alt={value} style={{ width:32, height:32, objectFit:'contain' }} />
            : <span className="font-bebas text-[11px] text-white/40">{value?.slice(0,3).toUpperCase()}</span>
          }
        </div>
        <span className="text-[13px] font-semibold text-white/85 truncate">{value}</span>
      </div>

      {/* Grouped dropdown: Clubs → Countries */}
      <select value={value} onChange={e => handleSelect(e.target.value)}
        className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a]">
        <optgroup label="⚽  Clubs" style={{ background:'#0d0d16', color:'rgba(255,255,255,0.45)', fontWeight:700 }}>
          {CLUB_NAMES.map(n => (
            <option key={n} value={n} className="bg-[#0d0d16]">{n}</option>
          ))}
        </optgroup>
        <optgroup label="🌍  Countries" style={{ background:'#0d0d16', color:'rgba(255,255,255,0.45)', fontWeight:700 }}>
          {COUNTRY_NAMES.map(n => (
            <option key={n} value={n} className="bg-[#0d0d16]">{n}</option>
          ))}
        </optgroup>
      </select>

      {/* Kit color */}
      <div className="flex items-center gap-2">
        <label className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/25 shrink-0">Kit color</label>
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] px-2 py-1">
          <input type="color" value={colorValue || '#e0000a'} onChange={e => onColorChange(e.target.value)}
            className="w-6 h-5 cursor-pointer shrink-0" />
          <span className="text-[11px] text-white/40 font-mono">{(colorValue||'#e0000a').toUpperCase()}</span>
          {team && (
            <button type="button" onClick={() => onColorChange(team[side === 'home' ? 'home' : 'away'] || team.home)}
              className="ml-auto text-[8px] font-bold tracking-[0.1em] uppercase text-white/25 hover:text-white/55 transition-colors border border-white/[0.08] px-1.5 py-0.5">
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

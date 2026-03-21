import { COMPETITION_NAMES, COMPETITIONS } from '../../lib/teamLogos'

export default function CompetitionSelect({ label, value, onChange, optional }) {
  const comp = COMPETITIONS[value]

  const handleSelect = (name) => {
    if (!name) { onChange({ name: '', logo: null }); return }
    const c = COMPETITIONS[name]
    onChange({ name, logo: c?.logo || null, color: c?.color, bg: c?.bg })
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">{label}</label>

      {/* Logo preview */}
      <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] px-3 py-2 min-h-[52px]">
        <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-white/[0.06] p-1">
          {comp?.logo
            ? <img src={comp.logo} alt={value} style={{ width:32, height:32, objectFit:'contain' }} />
            : <span className="text-white/20 text-[10px]">—</span>
          }
        </div>
        <span className="text-[13px] font-semibold text-white/85 truncate">{value || 'None selected'}</span>
      </div>

      {/* Dropdown */}
      <select value={value || ''} onChange={e => handleSelect(e.target.value)}
        className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a]">
        {optional && <option value="" className="bg-[#0d0d16]">— None —</option>}
        {COMPETITION_NAMES.map(n => (
          <option key={n} value={n} className="bg-[#0d0d16]">{n}</option>
        ))}
      </select>
    </div>
  )
}

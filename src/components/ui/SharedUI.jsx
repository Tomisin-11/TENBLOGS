import { useState } from 'react'
import { Download, Loader2, CheckCircle } from 'lucide-react'
import { downloadCardAsPng } from '../../lib/download'

export const RedTopBar = () => (
  <div className="h-[3px] w-full shrink-0"
    style={{ background: 'linear-gradient(90deg,#e0000a,#ff3040 40%,rgba(255,60,60,0.15) 100%)' }} />
)

export const CardBrand = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-[2px] h-3 bg-[#e0000a]" />
    <span className="font-bebas text-[13px] tracking-[0.12em] text-white/20">
      <span style={{ color: 'rgba(224,0,10,0.5)' }}>TEN</span>BLOGS
    </span>
  </div>
)

export const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-[3px] h-4 bg-[#e0000a] shrink-0" />
    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">{children}</span>
    <div className="flex-1 h-px bg-white/[0.06]" />
  </div>
)

export const Field = ({ label, value, onChange, type = 'text', options, span2, readOnly }) => (
  <div className={span2 ? 'col-span-2' : ''}>
    <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">{label}</label>
    {options ? (
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a] focus:bg-[#e0000a]/5">
        {options.map(o => <option key={o} value={o} className="bg-[#0d0d16]">{o}</option>)}
      </select>
    ) : (
      <input type={type} value={value} readOnly={readOnly}
        onChange={e => !readOnly && onChange(e.target.value)}
        className={`w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a] focus:bg-[#e0000a]/5 ${readOnly ? 'opacity-30 cursor-not-allowed' : 'hover:border-white/[0.15]'}`} />
    )}
  </div>
)

export const ColorField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">{label}</label>
    <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-2 py-1.5 hover:border-white/[0.15] transition-colors">
      <input type="color" value={value} onChange={e => onChange(e.target.value)}
        className="w-8 h-6 cursor-pointer shrink-0" />
      <span className="text-[12px] text-white/60 font-mono tracking-wider">{value.toUpperCase()}</span>
    </div>
  </div>
)

export const StatCell = ({ Icon, label, value, sub, accent, wide, accentColor }) => {
  const color = accentColor || '#e0000a'
  return (
    <div className={`relative flex flex-col items-center justify-center py-4 px-2 overflow-hidden ${accent ? 'bg-gradient-to-b from-white/[0.04] to-transparent' : ''}`}>
      {accent && (
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }} />
      )}
      {sub && (
        <div className={`absolute top-2 right-2 text-[8px] font-bold tracking-[0.12em] ${accent ? 'text-white/50' : 'text-white/22'}`}>{sub}</div>
      )}
      {Icon && <Icon size={11} strokeWidth={2} className="mb-1.5 text-white/20" style={accent ? { color } : {}} />}
      <span className={`font-bebas leading-none tracking-wide ${wide ? 'text-[26px]' : 'text-[36px]'} ${accent ? 'text-white' : 'text-white/85'}`}>{value}</span>
      <span className="text-[8px] font-bold tracking-[0.22em] uppercase text-white/30 mt-1.5 text-center leading-tight">{label}</span>
    </div>
  )
}

export const StatsRow = ({ children, last }) => {
  const arr = Array.isArray(children) ? children : [children]
  return (
    <div className={`grid grid-cols-3 ${last ? '' : 'border-b border-white/[0.06]'}`}>
      {arr.map((c, i) => (
        <div key={i} className={i < arr.length - 1 ? 'border-r border-white/[0.06]' : ''}>{c}</div>
      ))}
    </div>
  )
}

export function DownloadButton({ targetId, filename, size = 'md', className = '' }) {
  const [st, setSt] = useState('idle')
  const handle = async () => {
    if (st === 'loading') return
    setSt('loading')
    try {
      await downloadCardAsPng(targetId, filename || targetId)
      setSt('done')
      setTimeout(() => setSt('idle'), 2500)
    } catch {
      setSt('error')
      setTimeout(() => setSt('idle'), 2500)
    }
  }
  const cfg = {
    idle:    { Icon: Download,    text: 'Download PNG',   cls: 'bg-[#e0000a] hover:bg-[#ff2535] border-transparent text-white' },
    loading: { Icon: Loader2,     text: 'Generating…',    cls: 'bg-[#e0000a]/20 border-[#e0000a]/40 text-[#e0000a] cursor-wait' },
    done:    { Icon: CheckCircle, text: 'Downloaded!',    cls: 'bg-green-600/20 border-green-500/40 text-green-400' },
    error:   { Icon: Download,    text: 'Retry',          cls: 'bg-white/[0.04] border-[#e0000a]/40 text-[#e0000a]' },
  }
  const { Icon, text, cls } = cfg[st]
  const pad = size === 'lg' ? 'px-8 py-3.5 text-[13px]' : 'px-5 py-2.5 text-[11px]'
  return (
    <button onClick={handle}
      className={`inline-flex items-center gap-2.5 border font-bold tracking-[0.2em] uppercase transition-all cursor-pointer select-none ${cls} ${pad} ${className}`}>
      <Icon size={size === 'lg' ? 15 : 13} strokeWidth={2} className={st === 'loading' ? 'animate-spin' : ''} />
      {text}
    </button>
  )
}

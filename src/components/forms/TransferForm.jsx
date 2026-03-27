import { useRef } from 'react'
import { SectionLabel, Field, ColorField } from '../ui/SharedUI'

const BADGE_TYPES = ['BREAKING', 'TRANSFER', 'RUMOUR', 'CONFIRMED', 'EXCLUSIVE']

export default function TransferForm({ d, setD, img, setImg }) {
  const bgRef = useRef()
  const imgRef = useRef()
  const set = (k, v) => setD(prev => ({ ...prev, [k]: v }))

  const handleBg = e => {
    const f = e.target.files[0]
    if (!f) return
    const r1 = new FileReader(); r1.onload = ev => set('bgImage', ev.target.result); r1.readAsDataURL(f)
  }

  const handleImg = e => {
    const f = e.target.files[0]
    if (!f) return
    const r2 = new FileReader(); r2.onload = ev => setImg(ev.target.result); r2.readAsDataURL(f)
  }

  return (
    <div className="flex flex-col gap-5">
      <SectionLabel>Background & Player Image</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Background Image</label>
          <button
            onClick={() => bgRef.current?.click()}
            className="w-full border border-white/[0.08] bg-white/[0.03] hover:border-white/20 text-white/50 text-[12px] tracking-widest py-2.5 transition-colors uppercase"
          >
            {d.bgImage ? '✓ Set — Change' : 'Upload Background'}
          </button>
          <input ref={bgRef} type="file" accept="image/*" onChange={handleBg} className="hidden" />
        </div>
        {d.bgImage && (
          <button onClick={() => set('bgImage', null)} className="text-[10px] text-white/30 hover:text-red-400 transition-colors tracking-widest uppercase">
            Remove background
          </button>
        )}
        <div>
          <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Player / Subject Image</label>
          <button
            onClick={() => imgRef.current?.click()}
            className="w-full border border-white/[0.08] bg-white/[0.03] hover:border-white/20 text-white/50 text-[12px] tracking-widest py-2.5 transition-colors uppercase"
          >
            {img ? '✓ Set — Change' : 'Upload Player Image'}
          </button>
          <input ref={imgRef} type="file" accept="image/*" onChange={handleImg} className="hidden" />
        </div>
        {img && (
          <button onClick={() => setImg(null)} className="text-[10px] text-white/30 hover:text-red-400 transition-colors tracking-widest uppercase">
            Remove player image
          </button>
        )}
        {!d.bgImage && <ColorField label="Background Color" value={d.bgColor || '#060612'} onChange={v => set('bgColor', v)} />}
      </div>

      <SectionLabel>Badge</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Badge Type</label>
          <div className="flex flex-wrap gap-2">
            {BADGE_TYPES.map(type => (
              <button
                key={type}
                onClick={() => set('badgeType', type)}
                className={`px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase border transition-all ${
                  (d.badgeType || 'BREAKING') === type
                    ? 'border-[#e0000a] bg-[#e0000a]/20 text-white'
                    : 'border-white/10 bg-white/[0.03] text-white/40 hover:border-white/25'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <Field label="Badge Subtext (e.g. NEWS, DONE DEAL)" value={d.badgeSubtext || 'NEWS'} onChange={v => set('badgeSubtext', v)} />
      </div>

      <SectionLabel>Text Content</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Main Text (large headline)</label>
          <textarea
            value={d.mainText || ''}
            onChange={e => set('mainText', e.target.value)}
            rows={3}
            className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a] focus:bg-[#e0000a]/5 resize-none"
            placeholder="E.g. BELLINGHAM TO REAL MADRID"
          />
        </div>
        <Field label="Main Text Font Size (px)" value={d.mainTextSize || '100'} onChange={v => set('mainTextSize', v)} />
        <div>
          <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Side / Detail Text</label>
          <textarea
            value={d.sideText || ''}
            onChange={e => set('sideText', e.target.value)}
            rows={2}
            className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a] focus:bg-[#e0000a]/5 resize-none"
            placeholder="E.g. Fee: £180m. 5-year contract."
          />
        </div>
        <Field label="Side Text Font Size (px)" value={d.sideTextSize || '34'} onChange={v => set('sideTextSize', v)} />
      </div>
    </div>
  )
}

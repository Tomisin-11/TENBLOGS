import { useRef } from 'react'
import { SectionLabel, Field, ColorField } from '../ui/SharedUI'

export default function NewsForm({ d, setD, img, setImg }) {
  const bgRef = useRef()
  const set = (k, v) => setD(prev => ({ ...prev, [k]: v }))

  const handleBg = e => {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader(); r.onload = ev => set('bgImage', ev.target.result); r.readAsDataURL(f)
  }

  return (
    <div className="flex flex-col gap-5">
      <SectionLabel>Background</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Background Image</label>
          <button
            onClick={() => bgRef.current?.click()}
            className="w-full border border-white/[0.08] bg-white/[0.03] hover:border-white/20 text-white/50 text-[12px] tracking-widest py-2.5 transition-colors uppercase"
          >
            {d.bgImage ? '✓ Image Set — Change' : 'Upload Image'}
          </button>
          <input ref={bgRef} type="file" accept="image/*" onChange={handleBg} className="hidden" />
        </div>
        {d.bgImage && (
          <button
            onClick={() => set('bgImage', null)}
            className="text-[10px] text-white/30 hover:text-red-400 transition-colors tracking-widest uppercase"
          >
            Remove image
          </button>
        )}
        {!d.bgImage && <ColorField label="Background Color" value={d.bgColor || '#0d0d14'} onChange={v => set('bgColor', v)} />}
      </div>

      <SectionLabel>Content</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        <Field label="Category Tag (e.g. TRANSFER, LATEST)" value={d.category || ''} onChange={v => set('category', v)} />
        <div>
          <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Headline</label>
          <textarea
            value={d.headline || ''}
            onChange={e => set('headline', e.target.value)}
            rows={3}
            className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a] focus:bg-[#e0000a]/5 resize-none"
          />
        </div>
        <Field label="Headline Font Size (px)" value={d.headlineSize || '96'} onChange={v => set('headlineSize', v)} />
        <div>
          <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Subtext (optional)</label>
          <textarea
            value={d.subtext || ''}
            onChange={e => set('subtext', e.target.value)}
            rows={2}
            className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a] focus:bg-[#e0000a]/5 resize-none"
          />
        </div>
        <Field label="Subtext Font Size (px)" value={d.subtextSize || '36'} onChange={v => set('subtextSize', v)} />
      </div>

      <SectionLabel>Source Reference</SectionLabel>
      <div className="grid grid-cols-1 gap-3">
        <Field label="Source Text (e.g. Sky Sports, BBC Sport)" value={d.source || ''} onChange={v => set('source', v)} />
        <Field
          label="Source Position"
          value={d.sourcePos || 'bottom-right'}
          onChange={v => set('sourcePos', v)}
          options={['bottom-right', 'bottom-left', 'top-center']}
        />
      </div>
    </div>
  )
}

import { useRef, useState } from 'react'
import { Image, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { SectionLabel, Field, ColorField } from '../ui/SharedUI'
import { RATIOS } from '../cards/EditorCard'

const GRADIENTS = [
  { label:'None',            value:'none' },
  { label:'Dark bottom',     value:'linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.9) 100%)' },
  { label:'Dark top',        value:'linear-gradient(to top,transparent 40%,rgba(0,0,0,0.9) 100%)' },
  { label:'Dark sides',      value:'linear-gradient(to right,rgba(0,0,0,0.7) 0%,transparent 40%,transparent 60%,rgba(0,0,0,0.7) 100%)' },
  { label:'Vignette',        value:'radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.8) 100%)' },
  { label:'Red accent',      value:'linear-gradient(135deg,rgba(224,0,10,0.3) 0%,transparent 50%)' },
]

function BgUpload({ value, onChange }) {
  const ref = useRef()
  const onFile = e => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader(); r.onload = ev => onChange(ev.target.result); r.readAsDataURL(f)
  }
  return (
    <div>
      <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">
        Background Image (optional)
      </label>
      <div onClick={() => ref.current.click()}
        className="border border-dashed border-white/[0.1] bg-white/[0.02] p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-[#e0000a]/40 transition-colors">
        {value
          ? <img src={value} className="w-full h-20 object-cover rounded opacity-80" />
          : <><Image size={20} style={{ color:'rgba(255,255,255,0.15)' }} /><div className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/28">Upload background image</div></>
        }
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={onFile} className="hidden" />
      {value && <button onClick={() => onChange(null)} className="mt-1 text-[9px] text-white/25 hover:text-white/50 transition-colors uppercase tracking-wider font-bold">Remove</button>}
    </div>
  )
}

function TextBlockEditor({ block, index, onChange, onRemove, onMove, total }) {
  const [open, setOpen] = useState(index === 0)
  const s = k => v => onChange({ ...block, [k]: v })

  return (
    <div className="border border-white/[0.08] bg-white/[0.02]">
      <div className="flex items-center justify-between px-3 py-2 cursor-pointer"
        onClick={() => setOpen(!open)}>
        <div className="text-[11px] font-bold text-white/60 truncate max-w-[160px]">
          {block.text || `Text Block ${index + 1}`}
        </div>
        <div className="flex items-center gap-1">
          {index > 0 && <button onClick={e => { e.stopPropagation(); onMove(index, -1) }} className="text-white/30 hover:text-white/60 p-0.5"><ChevronUp size={12} /></button>}
          {index < total - 1 && <button onClick={e => { e.stopPropagation(); onMove(index, 1) }} className="text-white/30 hover:text-white/60 p-0.5"><ChevronDown size={12} /></button>}
          <button onClick={e => { e.stopPropagation(); onRemove() }} className="text-white/25 hover:text-red-400 p-0.5 ml-1"><Trash2 size={12} /></button>
        </div>
      </div>
      {open && (
        <div className="px-3 pb-3 flex flex-col gap-2.5 border-t border-white/[0.06]" style={{ paddingTop:10 }}>
          <Field label="Main Text" value={block.text||''} onChange={s('text')} />
          <Field label="Label (above — optional)" value={block.label||''} onChange={s('label')} />
          <Field label="Sub-text (below — optional)" value={block.sub||''} onChange={s('sub')} />
          <div className="grid grid-cols-2 gap-2">
            <ColorField label="Text Color" value={block.color||'#ffffff'} onChange={s('color')} />
            <Field label="Vertical % (0-100)" value={block.top||50} onChange={v => s('top')(parseFloat(v)||50)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Font Size %" value={block.size||0.065} onChange={v => s('size')(parseFloat(v)||0.065)} />
            <Field label="Letter Spacing" value={block.letterSpacing||0.02} onChange={v => s('letterSpacing')(parseFloat(v)||0.02)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Align</label>
              <select value={block.align||'center'} onChange={e => s('align')(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[13px] px-3 py-2">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Font</label>
              <select value={block.font||'barlow'} onChange={e => s('font')(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[13px] px-3 py-2">
                <option value="barlow">Barlow</option>
                <option value="bebas">Bebas Neue</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 text-[11px] text-white/50">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={!!block.uppercase} onChange={e => s('uppercase')(e.target.checked)} className="accent-[#e0000a]" />
              Uppercase
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={!!block.italic} onChange={e => s('italic')(e.target.checked)} className="accent-[#e0000a]" />
              Italic
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={!!block.shadow} onChange={e => s('shadow')(e.target.checked)} className="accent-[#e0000a]" />
              Shadow
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default function EditorForm({ d, setD }) {
  const s = k => v => setD(p => ({ ...p, [k]: v }))

  const addTextBlock = () => {
    const blocks = [...(d.textBlocks || []), {
      text: 'Your Text Here', color:'#ffffff', size:0.065,
      top:50, align:'center', font:'bebas', uppercase:true, shadow:true,
    }]
    setD(p => ({ ...p, textBlocks: blocks }))
  }

  const updateBlock = (i, val) => {
    const blocks = [...(d.textBlocks || [])]
    blocks[i] = val
    setD(p => ({ ...p, textBlocks: blocks }))
  }

  const removeBlock = (i) => {
    const blocks = [...(d.textBlocks || [])]
    blocks.splice(i, 1)
    setD(p => ({ ...p, textBlocks: blocks }))
  }

  const moveBlock = (i, dir) => {
    const blocks = [...(d.textBlocks || [])]
    const j = i + dir
    if (j < 0 || j >= blocks.length) return
    ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
    setD(p => ({ ...p, textBlocks: blocks }))
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Aspect Ratio */}
      <div>
        <SectionLabel>Aspect Ratio</SectionLabel>
        <select value={d.ratio||'1:1'} onChange={e => s('ratio')(e.target.value)}
          className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[13px] px-3 py-2 mb-2 hover:border-white/[0.15] focus:border-[#e0000a] transition-colors">
          {Object.entries(RATIOS).map(([key, val]) => (
            <option key={key} value={key} className="bg-[#0d0d16]">{val.label}</option>
          ))}
        </select>
        {d.ratio === 'custom' && (
          <div className="grid grid-cols-2 gap-2">
            <Field label="Width (px)" value={d.customW||1080} onChange={s('customW')} />
            <Field label="Height (px)" value={d.customH||1080} onChange={s('customH')} />
          </div>
        )}
      </div>

      {/* Background */}
      <div>
        <SectionLabel>Background</SectionLabel>
        <BgUpload value={d.bgImage} onChange={s('bgImage')} />
        {!d.bgImage && (
          <div className="mt-2">
            <ColorField label="Background Color" value={d.bgColor||'#0d0d14'} onChange={s('bgColor')} />
          </div>
        )}
        {d.bgImage && (
          <div className="mt-2 grid grid-cols-1 gap-2">
            <Field label="Brightness (0.1–1)" value={d.bgBrightness||0.8} onChange={v => s('bgBrightness')(parseFloat(v)||0.8)} />
            <Field label="Saturation (0–2)" value={d.bgSaturate||1} onChange={v => s('bgSaturate')(parseFloat(v)||1)} />
            <div>
              <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Image Position</label>
              <select value={d.bgPosition||'center'} onChange={e => s('bgPosition')(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[13px] px-3 py-2">
                {['center','top','bottom','left','right','top left','top right','bottom left','bottom right'].map(p =>
                  <option key={p} value={p} className="bg-[#0d0d16]">{p}</option>
                )}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div>
        <SectionLabel>Overlay</SectionLabel>
        <div>
          <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Gradient Preset</label>
          <select value={d.overlayGradient||'none'} onChange={e => s('overlayGradient')(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 text-[13px] px-3 py-2 mb-2">
            {GRADIENTS.map(g => <option key={g.value} value={g.value} className="bg-[#0d0d16]">{g.label}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ColorField label="Solid Overlay Color" value={d.overlayColor||'#000000'} onChange={s('overlayColor')} />
          <Field label="Opacity % (0-100)" value={d.overlayOpacity||0} onChange={v => s('overlayOpacity')(parseInt(v)||0)} />
        </div>
      </div>

      {/* Text Blocks */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <SectionLabel>Text Blocks</SectionLabel>
          <button onClick={addTextBlock}
            className="flex items-center gap-1 text-[9px] font-bold tracking-[0.15em] uppercase text-[#e0000a] hover:text-white transition-colors border border-[#e0000a]/40 px-2 py-1">
            <Plus size={9} /> Add Text
          </button>
        </div>
        {(!d.textBlocks || d.textBlocks.length === 0) && (
          <div className="text-[11px] text-white/25 text-center py-4 border border-dashed border-white/[0.06]">
            No text blocks yet — click Add Text
          </div>
        )}
        <div className="flex flex-col gap-2">
          {(d.textBlocks || []).map((tb, i) => (
            <TextBlockEditor key={i} block={tb} index={i}
              total={(d.textBlocks||[]).length}
              onChange={v => updateBlock(i, v)}
              onRemove={() => removeBlock(i)}
              onMove={(idx, dir) => moveBlock(idx, dir)} />
          ))}
        </div>
      </div>

      {/* Extras */}
      <div>
        <SectionLabel>Extras</SectionLabel>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-[11px] text-white/50">
            <input type="checkbox" checked={d.accentBar !== false && !!d.accentBar}
              onChange={e => s('accentBar')(e.target.checked)} className="accent-[#e0000a]" />
            Bottom accent bar
          </label>
          {d.accentBar && <ColorField label="Accent Color" value={d.accentColor||'#e0000a'} onChange={s('accentColor')} />}
          <label className="flex items-center gap-2 cursor-pointer text-[11px] text-white/50">
            <input type="checkbox" checked={d.showBranding !== false}
              onChange={e => s('showBranding')(e.target.checked)} className="accent-[#e0000a]" />
            Show branding
          </label>
          {d.showBranding !== false && (
            <Field label="Branding text" value={d.brandingText||'TEN BLOGS'} onChange={s('brandingText')} />
          )}
        </div>
      </div>
    </div>
  )
}

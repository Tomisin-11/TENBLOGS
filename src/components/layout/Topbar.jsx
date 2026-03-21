import { Menu, Eye } from 'lucide-react'

const META = {
  dashboard:  { title:'Dashboard',       sub:'Overview & quick create' },
  rating:     { title:'Player Rating',   sub:'Fill stats · tap preview to download' },
  h2h:        { title:'Head to Head',    sub:'Team logos · colors · stats' },
  analytics:  { title:'Match Analytics', sub:'Team logos · colored bars · timeline' },
  prediction: { title:'Prediction',      sub:'Score pick · fan poll' },
  matchday:   { title:'Matchday Flyer',  sub:'Pre-match poster' },
  result:     { title:'Result Flyer',    sub:'Full-time poster · scorers' },
}

export default function Topbar({ active, mobileOpen, setMobileOpen, onPreview, isCard }) {
  const { title, sub } = META[active] || { title: active, sub: '' }

  return (
    <header className="h-[56px] flex items-center justify-between px-4 md:px-5 shrink-0 border-b border-white/[0.06] gap-3"
      style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.03) 0%,transparent 100%)' }}>

      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-all shrink-0">
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="font-bebas text-[20px] md:text-[24px] tracking-[0.06em] text-white leading-none">{title}</h1>
            <div className="hidden md:block w-px h-4 bg-white/[0.1]" />
            <span className="hidden md:block text-[10px] text-white/30 tracking-[0.06em] truncate">{sub}</span>
          </div>
        </div>
      </div>

      {/* Right: Preview & Download button (card pages only) */}
      <div className="flex items-center gap-2 shrink-0">
        {isCard && (
          <button onClick={onPreview}
            className="flex items-center gap-2 bg-[#e0000a] hover:bg-[#ff2535] text-white text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-2 transition-colors select-none">
            <Eye size={13} strokeWidth={2} />
            <span className="hidden xs:inline">Preview &amp; Download</span>
            <span className="xs:hidden">Preview</span>
          </button>
        )}
        <div className="hidden sm:flex items-center gap-2 ml-1">
          <div className="h-4 w-px bg-white/[0.08]" />
          <span className="font-bebas text-[14px] tracking-[0.1em] text-white/20">
            <span style={{ color:'rgba(224,0,10,0.45)' }}>TEN</span>BLOGS
          </span>
        </div>
      </div>
    </header>
  )
}

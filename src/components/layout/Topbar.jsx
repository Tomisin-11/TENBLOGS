import { Menu } from 'lucide-react'

const META = {
  dashboard:  { title:'Dashboard',       sub:'Overview & quick create' },
  rating:     { title:'Player Rating',   sub:'Fill stats · preview · download' },
  h2h:        { title:'Head to Head',    sub:'Team logos · colors · H2H stats' },
  analytics:  { title:'Match Analytics', sub:'Team logos · colors · live stats' },
  prediction: { title:'Prediction',      sub:'Score pick · fan poll' },
  matchday:   { title:'Matchday Flyer',  sub:'Pre-match poster · team logos · players' },
  result:     { title:'Result Flyer',    sub:'Full-time poster · background photo' },
}

export default function Topbar({ active, mobileOpen, setMobileOpen }) {
  const { title, sub } = META[active] || { title: active, sub: '' }
  return (
    <header className="h-[60px] flex items-center justify-between px-4 md:px-6 shrink-0 border-b border-white/[0.06]"
      style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.03) 0%,transparent 100%)' }}>
      <div className="flex items-center gap-4 min-w-0">
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-all shrink-0">
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="font-bebas text-[22px] md:text-[26px] tracking-[0.06em] text-white leading-none">{title}</h1>
            <div className="hidden md:block w-px h-5 bg-white/[0.12]" />
            <span className="hidden md:block text-[11px] text-white/35 tracking-[0.08em]">{sub}</span>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <div className="h-5 w-px bg-white/[0.1]" />
        <span className="font-bebas text-[16px] tracking-[0.1em] text-white/25">
          <span style={{ color:'rgba(224,0,10,0.5)' }}>TEN</span>BLOGS
        </span>
      </div>
    </header>
  )
}

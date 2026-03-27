import { Medal, Swords, PieChart, Crosshair, CalendarDays, Trophy, ArrowRight, Instagram, Youtube, Facebook, Music2, Download, Zap, Layers, Newspaper, BarChart3 } from 'lucide-react'

const CARD_GROUPS = [
  {
    label: 'Stats Cards',
    cards: [
      { id:'rating',     Icon:Medal,      label:'Player Rating',   desc:'Photo upload, 12-stat grid, dynamic verdict, rating bar.', tag:'Popular' },
      { id:'h2h',        Icon:Swords,     label:'Head to Head',    desc:'Team logos, color-coded bars, form dots, previous meetings.', tag:null },
      { id:'analytics',  Icon:PieChart,   label:'Match Analytics', desc:'Team logos, colored possession/stat bars, match timeline.', tag:null },
      { id:'prediction', Icon:Crosshair,  label:'Prediction',      desc:'Score pick, reasoning note, animated fan poll.', tag:null },
    ],
  },
  {
    label: 'Match Flyers',
    cards: [
      { id:'matchday', Icon:CalendarDays, label:'Matchday Flyer', desc:'Pre-match poster with team logos, player photos, competition badge.', tag:null },
      { id:'result',   Icon:Trophy,       label:'Result Flyer',   desc:'Full-time poster with background photo and team crests.', tag:null },
    ],
  },
  {
    label: 'Content Cards',
    cards: [
      { id:'news',        Icon:Newspaper,  label:'News Card',           desc:'Full-bleed background, bold headline, category tag, source reference.', tag:'New' },
      { id:'transfer',    Icon:Zap,        label:'Transfer / Breaking', desc:'Player image background, badge selector, large headline with side detail text.', tag:'New' },
      { id:'playerstats', Icon:BarChart3,  label:'Player Stats',        desc:'Full-bleed player photo, pick any 6 stats by position, centered bottom grid.', tag:'New' },
      { id:'tournament',  Icon:Trophy,     label:'Tournament Card',     desc:'Auto-loads country flags, matchup brackets, path labels and winner highlights.', tag:'New' },
    ],
  },
]
const CARDS = CARD_GROUPS.flatMap(g => g.cards)

const PLATFORMS = [
  { Icon:Instagram, label:'Instagram', tip:'1080×1080' },
  { Icon:Youtube,   label:'YouTube',   tip:'1280×720' },
  { Icon:Facebook,  label:'Facebook',  tip:'1200×630' },
  { Icon:Music2,    label:'TikTok',    tip:'Overlay' },
]

export default function Dashboard({ goTo }) {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">

      {/* Hero */}
      <div className="relative overflow-hidden border border-white/[0.06] p-6 sm:p-8"
        style={{ background:'linear-gradient(135deg,rgba(224,0,10,0.1) 0%,rgba(224,0,10,0.02) 40%,transparent 70%)' }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background:'linear-gradient(90deg,#e0000a 0%,rgba(224,0,10,0.3) 60%,transparent 100%)' }} />
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-5"
          style={{ background:'radial-gradient(circle,#e0000a,transparent)' }} />
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#e0000a] flex items-center justify-center shrink-0">
                <span className="font-bebas text-[15px] text-white">TB</span>
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/35">Ten Blogs Studio</span>
            </div>
            <h1 className="font-bebas text-[36px] sm:text-[48px] leading-none tracking-[0.04em] text-white mb-2">
              CREATE SPORTS<br /><span style={{ color:'#e0000a' }}>CONTENT CARDS</span>
            </h1>
            <p className="text-[13px] text-white/40 max-w-md leading-relaxed">
              Team logos auto-load. Pick colors to match each kit. Fill stats, preview live, download a 2× PNG.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { Icon:Zap,      text:'60+ club logos built-in' },
              { Icon:Layers,   text:'Team colors auto-apply' },
              { Icon:Download, text:'2× retina PNG download' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-5 h-5 bg-[#e0000a]/20 border border-[#e0000a]/30 flex items-center justify-center shrink-0">
                  <Icon size={10} style={{ color:'#e0000a' }} />
                </div>
                <span className="text-[11px] text-white/45 tracking-[0.04em]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards grid — grouped */}
      <div className="flex flex-col gap-6">
        {CARD_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-[3px] h-5 bg-[#e0000a]" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/35">{group.label}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.cards.map(({ id, Icon, label, desc, tag }) => (
                <button key={id} onClick={() => goTo(id)}
                  className="group relative text-left border border-white/[0.07] p-5 hover:border-[#e0000a]/40 transition-all duration-200 overflow-hidden"
                  style={{ background:'rgba(255,255,255,0.02)' }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background:'linear-gradient(135deg,rgba(224,0,10,0.07) 0%,transparent 60%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e0000a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="relative flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 border border-white/[0.08] bg-white/[0.04] flex items-center justify-center group-hover:border-[#e0000a]/40 group-hover:bg-[#e0000a]/10 transition-all">
                        <Icon size={17} strokeWidth={1.8} className="text-white/50 group-hover:text-[#e0000a] transition-colors" />
                      </div>
                      <span className="font-bebas text-[19px] tracking-[0.04em] text-white">{label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {tag && (
                        <span className="text-[7px] font-bold tracking-[0.15em] uppercase bg-[#e0000a]/15 border border-[#e0000a]/25 text-[#e0000a] px-2 py-0.5">{tag}</span>
                      )}
                      <ArrowRight size={13} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                  <p className="relative text-[11px] text-white/35 leading-relaxed">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="border border-white/[0.06] p-5 sm:p-6" style={{ background:'rgba(255,255,255,0.015)' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-[3px] h-5 bg-[#e0000a]" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/35">How It Works</span>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { n:'01', title:'Choose a card',     desc:'Player Rating, H2H, Analytics, Prediction or Flyer' },
            { n:'02', title:'Select teams',       desc:'Pick from 60+ clubs — logos and colors load automatically' },
            { n:'03', title:'Fill in the stats',  desc:'Card updates live as you type, no buttons needed' },
            { n:'04', title:'Download PNG',       desc:'2× retina quality, saves directly to your device' },
          ].map(({ n, title, desc }) => (
            <div key={n} className="flex flex-col gap-2">
              <div className="font-bebas text-[32px] leading-none" style={{ color:'rgba(224,0,10,0.3)' }}>{n}</div>
              <div className="font-bebas text-[16px] tracking-[0.04em] text-white">{title}</div>
              <p className="text-[11px] text-white/30 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="border border-white/[0.06] p-5 sm:p-6" style={{ background:'rgba(255,255,255,0.015)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[3px] h-5 bg-[#e0000a]" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/35">Supported Platforms</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PLATFORMS.map(({ Icon, label, tip }) => (
            <div key={label} className="flex items-center gap-3 border border-white/[0.06] bg-white/[0.02] p-3 hover:border-white/[0.12] transition-colors">
              <div className="w-8 h-8 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                <Icon size={15} strokeWidth={1.8} className="text-white/45" />
              </div>
              <div>
                <div className="text-[12px] font-bold text-white tracking-[0.04em]">{label}</div>
                <div className="text-[9px] text-white/28">{tip}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

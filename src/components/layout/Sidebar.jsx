import { LayoutDashboard, Medal, Swords, PieChart, Crosshair, CalendarDays, Trophy, ChevronLeft, ChevronRight, X, Newspaper, Zap, BarChart3 } from 'lucide-react'

const NAV_GROUPS = [
  {
    label: null,
    items: [{ id:'dashboard', Icon:LayoutDashboard, label:'Dashboard' }],
  },
  {
    label: 'Stats Cards',
    items: [
      { id:'rating',     Icon:Medal,      label:'Player Rating' },
      { id:'h2h',        Icon:Swords,     label:'Head to Head' },
      { id:'analytics',  Icon:PieChart,   label:'Match Analytics' },
      { id:'prediction', Icon:Crosshair,  label:'Prediction' },
    ],
  },
  {
    label: 'Match Flyers',
    items: [
      { id:'matchday',   Icon:CalendarDays, label:'Matchday Flyer' },
      { id:'result',     Icon:Trophy,       label:'Result Flyer' },
    ],
  },
  {
    label: 'Content Cards',
    items: [
      { id:'news',        Icon:Newspaper,  label:'News Card',           badge:'NEW' },
      { id:'transfer',    Icon:Zap,        label:'Transfer / Breaking', badge:'NEW' },
      { id:'playerstats', Icon:BarChart3,  label:'Player Stats',        badge:'NEW' },
      { id:'tournament',  Icon:Trophy,     label:'Tournament',          badge:'NEW' },
    ],
  },
]
const NAV = NAV_GROUPS.flatMap(g => g.items)

export default function Sidebar({ active, setActive, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const nav = id => { setActive(id); setMobileOpen(false) }

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)} />
      )}
      <aside className={[
        'fixed lg:relative inset-y-0 left-0 z-40 flex flex-col h-full transition-all duration-300 ease-in-out shrink-0',
        collapsed ? 'w-[64px]' : 'w-[240px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ].join(' ')}
        style={{ background:'linear-gradient(180deg,#0c0c12 0%,#080810 100%)', borderRight:'1px solid rgba(255,255,255,0.06)' }}>

        {/* Logo */}
        <div className="relative flex items-center justify-between px-4 h-[60px] shrink-0 border-b border-white/[0.06]"
          style={{ background:'linear-gradient(135deg,rgba(224,0,10,0.12) 0%,transparent 60%)' }}>
          {!collapsed && (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 bg-[#e0000a] flex items-center justify-center shrink-0">
                <span className="font-bebas text-[14px] text-white tracking-wider">TB</span>
              </div>
              <div>
                <div className="font-bebas text-[20px] leading-none tracking-[0.08em] text-white">
                  <span className="text-[#e0000a]">TEN</span>BLOGS
                </div>
                <div className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/30 mt-0.5">Studio</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 bg-[#e0000a] flex items-center justify-center">
                <span className="font-bebas text-[15px] text-white">TB</span>
              </div>
            </div>
          )}
          <button onClick={() => setMobileOpen(false)}
            className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-white/40 hover:text-white transition-colors">
            <X size={16} />
          </button>
          <button onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center text-white/50 hover:text-white transition-colors rounded-full border border-white/[0.1]"
            style={{ background:'#0c0c12' }}>
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 no-scrollbar">
          <div className="flex flex-col gap-0.5 px-2">
            {NAV_GROUPS.map((group, gi) => (
              <div key={gi}>
                {!collapsed && group.label && (
                  <div className="px-3 pt-3 pb-1 text-[8px] font-bold tracking-[0.3em] uppercase text-white/20">{group.label}</div>
                )}
                {group.items.map(({ id, Icon, label, badge }) => {
                  const on = active === id
                  return (
                    <button key={id} onClick={() => nav(id)} title={collapsed ? label : undefined}
                      className={[
                        'flex items-center gap-3 w-full transition-all duration-150 relative group',
                        collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5',
                        on ? 'text-white' : 'text-white/45 hover:text-white/80',
                      ].join(' ')}
                      style={on ? { background:'linear-gradient(90deg,rgba(224,0,10,0.18),rgba(224,0,10,0.04))', borderLeft:'2px solid #e0000a' } : { borderLeft:'2px solid transparent' }}>
                      {collapsed && on && (
                        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#e0000a]" />
                      )}
                      <Icon size={16} strokeWidth={on ? 2.5 : 1.8}
                        className={`shrink-0 ${on ? 'text-[#e0000a]' : 'text-white/35 group-hover:text-white/60'}`} />
                      {!collapsed && (
                        <>
                          <span className="text-[13px] font-semibold tracking-[0.04em] truncate flex-1 text-left">{label}</span>
                          {badge && (
                            <span className="text-[7px] font-bold tracking-[0.12em] bg-[#e0000a]/20 border border-[#e0000a]/30 text-[#e0000a] px-1.5 py-0.5 shrink-0">{badge}</span>
                          )}
                          {on && !badge && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#e0000a] shrink-0" />
                          )}
                        </>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </nav>

        {!collapsed && (
          <div className="px-4 py-3 border-t border-white/[0.06]">
            <div className="text-[9px] text-white/20 tracking-[0.08em]">© 2026 Ten Blogs</div>
          </div>
        )}
      </aside>
    </>
  )
}

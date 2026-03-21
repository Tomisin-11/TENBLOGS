import React, { useState, useCallback, useRef } from 'react'
import { X, Eye, Download, Loader2, CheckCircle } from 'lucide-react'

import Sidebar  from './components/layout/Sidebar'
import Topbar   from './components/layout/Topbar'
import Dashboard from './pages/Dashboard'

import RatingCard     from './components/cards/RatingCard'
import H2HCard        from './components/cards/H2HCard'
import AnalyticsCard  from './components/cards/AnalyticsCard'
import PredictionCard from './components/cards/PredictionCard'
import MatchdayFlyer  from './components/cards/MatchdayFlyer'
import ResultFlyer    from './components/cards/ResultFlyer'

import RatingForm        from './components/forms/RatingForm'
import H2HForm           from './components/forms/H2HForm'
import AnalyticsForm     from './components/forms/AnalyticsForm'
import PredictionForm    from './components/forms/PredictionForm'
import MatchdayFlyerForm from './components/forms/MatchdayFlyerForm'
import ResultFlyerForm   from './components/forms/ResultFlyerForm'

import { downloadCardAsPng } from './lib/download'
import {
  DEFAULT_RATING, DEFAULT_H2H, DEFAULT_ANALYTICS,
  DEFAULT_PREDICTION, DEFAULT_MATCHDAY, DEFAULT_RESULT,
} from './lib/defaults'

const DL_META = {
  rating:     { id:'modal-card', file:'tenblogs-player-rating' },
  h2h:        { id:'modal-card', file:'tenblogs-h2h' },
  analytics:  { id:'modal-card', file:'tenblogs-analytics' },
  prediction: { id:'modal-card', file:'tenblogs-prediction' },
  matchday:   { id:'modal-card', file:'tenblogs-matchday-flyer' },
  result:     { id:'modal-card', file:'tenblogs-result-flyer' },
}

const Divider = ({ label }) => (
  <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.06] shrink-0"
    style={{ background:'rgba(0,0,0,0.25)' }}>
    <div className="w-[2px] h-3.5 bg-[#e0000a] shrink-0" />
    <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/30">{label}</span>
  </div>
)

// ── Modal: full-screen card preview + download ─────────────────
function CardModal({ card, onClose, filename }) {
  const [dlState, setDlState] = useState('idle')

  const handleDownload = async () => {
    if (dlState === 'loading') return
    setDlState('loading')
    try {
      await downloadCardAsPng('modal-card', filename)
      setDlState('done')
      setTimeout(() => setDlState('idle'), 2500)
    } catch {
      setDlState('error')
      setTimeout(() => setDlState('idle'), 2500)
    }
  }

  const dlCfg = {
    idle:    { Icon: Download,    text: 'Download PNG',  cls: 'bg-[#e0000a] hover:bg-[#ff2535] border-transparent text-white' },
    loading: { Icon: Loader2,     text: 'Generating…',   cls: 'bg-[#e0000a]/30 border-[#e0000a]/40 text-[#e0000a] cursor-wait' },
    done:    { Icon: CheckCircle, text: 'Downloaded!',   cls: 'bg-green-600/20 border-green-500/40 text-green-400' },
    error:   { Icon: Download,    text: 'Retry',         cls: 'bg-white/[0.04] border-[#e0000a]/40 text-[#e0000a]' },
  }
  const { Icon, text, cls } = dlCfg[dlState]

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background:'rgba(0,0,0,0.92)', backdropFilter:'blur(8px)' }}
    >
      {/* Modal header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0 border-b border-white/[0.08]"
        style={{ background:'rgba(0,0,0,0.6)' }}>
        <div className="flex items-center gap-3">
          <div className="w-[2px] h-5 bg-[#e0000a]" />
          <span className="font-bebas text-[18px] sm:text-[22px] tracking-[0.06em] text-white">Card Preview</span>
          <span className="hidden sm:block text-[10px] text-white/30 tracking-[0.08em]">2× retina export</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Download button */}
          <button onClick={handleDownload}
            className={`inline-flex items-center gap-2 border px-4 sm:px-6 py-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-all cursor-pointer select-none ${cls}`}>
            <Icon size={13} strokeWidth={2} className={dlState === 'loading' ? 'animate-spin' : ''} />
            <span className="hidden xs:inline">{text}</span>
            <span className="xs:hidden">
              {dlState === 'loading' ? '…' : dlState === 'done' ? '✓' : '↓'}
            </span>
          </button>
          {/* Close */}
          <button onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-white/[0.12] text-white/50 hover:text-white hover:border-white/30 transition-all"
            aria-label="Close preview">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Card — fully visible, no overflow clipping, captured at this ID */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 sm:p-8"
        style={{ background:'radial-gradient(ellipse at 50% 30%,rgba(224,0,10,0.06) 0%,transparent 65%)' }}>
        {/* id="modal-card" is what download.js targets */}
        <div id="modal-card" style={{ display:'inline-block' }}>
          {card}
        </div>
      </div>

      {/* Footer hint */}
      <div className="px-4 py-2.5 shrink-0 flex items-center justify-between border-t border-white/[0.06]"
        style={{ background:'rgba(0,0,0,0.5)' }}>
        <div className="flex gap-2 flex-wrap">
          {['Instagram 1080×1080','YouTube 1280×720','Facebook 1200×630','TikTok'].map(p => (
            <span key={p} className="text-[8px] font-bold tracking-[0.1em] uppercase text-white/20 border border-white/[0.06] px-2 py-0.5">{p}</span>
          ))}
        </div>
        <button onClick={onClose}
          className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5">
          <X size={11} /> Close
        </button>
      </div>
    </div>
  )
}

// ── Small preview thumbnail (click to open modal) ──────────────
/**
 * ScaledCard: renders the card at its natural size inside an invisible
 * measurement div, then wraps it in a container that scales it down
 * using CSS transform so it always fits the available width.
 *
 * Cards have fixed pixel widths (460px, 400px etc). On small screens
 * we need to shrink them proportionally without changing their layout.
 */
function ScaledCard({ card, containerRef }) {
  const [scale, setScale] = React.useState(1)
  const wrapRef = React.useRef(null)

  React.useEffect(() => {
    const measure = () => {
      if (!containerRef?.current || !wrapRef.current) return
      const available = containerRef.current.clientWidth - 32 // 16px padding each side
      const cardW = wrapRef.current.firstChild?.offsetWidth || 460
      const s = Math.min(1, available / cardW)
      setScale(s)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef?.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [containerRef, card])

  return (
    <div ref={wrapRef}
      style={{
        transformOrigin: 'top center',
        transform: `scale(${scale})`,
        // When scaled down, collapse the empty space transform leaves behind
        // The card appears smaller but still occupies its natural height in the DOM
        // So we pull up by the difference
        marginBottom: scale < 1
          ? `${Math.round((scale - 1) * (wrapRef.current?.firstChild?.offsetHeight || 600))}px`
          : 0,
        transition: 'transform 0.15s ease',
        willChange: 'transform',
      }}>
      {card}
    </div>
  )
}

function PreviewThumb({ card, onOpen, containerRef }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div
        onClick={onOpen}
        className="cursor-pointer select-none w-full flex justify-center">
        <ScaledCard card={card} containerRef={containerRef} />
      </div>
      <div className="flex items-center gap-2 text-[10px] text-white/30 tracking-[0.08em]">
        <Eye size={11} />
        <span>Tap card to open full view &amp; download</span>
      </div>
    </div>
  )
}

export default function App() {
  const [active,     setActive]     = useState('dashboard')
  const [collapsed,  setCollapsed]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [modalOpen,  setModalOpen]  = useState(false)

  const [rD, setRD]     = useState(DEFAULT_RATING)
  const [rImg, setRImg] = useState(null)
  const [hD, setHD]     = useState(DEFAULT_H2H)
  const [aD, setAD]     = useState(DEFAULT_ANALYTICS)
  const [pD, setPD]     = useState(DEFAULT_PREDICTION)
  const [mD, setMD]     = useState(DEFAULT_MATCHDAY)
  const [resD, setResD] = useState(DEFAULT_RESULT)

  const isCard = active !== 'dashboard'
  const previewPanelRef = useRef(null)

  // The card rendered in the MODAL (not clipped by any overflow)
  const modalCardMap = {
    rating:     <RatingCard     d={rD}   img={rImg} />,
    h2h:        <H2HCard        d={hD} />,
    analytics:  <AnalyticsCard  d={aD} />,
    prediction: <PredictionCard d={pD} />,
    matchday:   <MatchdayFlyer  d={mD} />,
    result:     <ResultFlyer    d={resD} />,
  }

  // Same card in the inline preview (thumbnail)
  const previewMap = {
    rating:     <RatingCard     d={rD}   img={rImg} />,
    h2h:        <H2HCard        d={hD} />,
    analytics:  <AnalyticsCard  d={aD} />,
    prediction: <PredictionCard d={pD} />,
    matchday:   <MatchdayFlyer  d={mD} />,
    result:     <ResultFlyer    d={resD} />,
  }

  const formMap = {
    rating:     <RatingForm     d={rD}   setD={setRD}   img={rImg} setImg={setRImg} />,
    h2h:        <H2HForm        d={hD}   setD={setHD} />,
    analytics:  <AnalyticsForm  d={aD}   setD={setAD} />,
    prediction: <PredictionForm d={pD}   setD={setPD} />,
    matchday:   <MatchdayFlyerForm d={mD}  setD={setMD} />,
    result:     <ResultFlyerForm   d={resD} setD={setResD} />,
  }

  const meta = DL_META[active]

  return (
    <div className="flex h-screen overflow-hidden"
      style={{ background:'#050508', fontFamily:"'Barlow Condensed',sans-serif", color:'#f0f0f8' }}>

      <Sidebar
        active={active} setActive={setActive}
        collapsed={collapsed} setCollapsed={setCollapsed}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
      />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        {/* Topbar — includes Preview & Download button for card pages */}
        <Topbar
          active={active}
          mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
          onPreview={() => setModalOpen(true)}
          isCard={isCard}
        />

        <div className="flex-1 overflow-hidden">

          {/* Dashboard */}
          {!isCard && (
            <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
              <Dashboard goTo={setActive} />
            </div>
          )}

          {/* Card editor — form + preview side by side */}
          {isCard && (
            <div className="h-full flex flex-col lg:flex-row overflow-hidden">

              {/* Form panel: 45vh on mobile, full height on desktop */}
              <div className="form-panel w-full lg:w-[300px] lg:shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col overflow-hidden"
                style={{ background:'rgba(255,255,255,0.012)', height:'45%' }}>
                <Divider label="Fill in Stats" />
                <div style={{ flex:1, overflowY:'auto', padding:'16px' }}>
                  {formMap[active]}
                </div>
              </div>

              {/* ── Preview panel ── */}
              <div className="flex-1 flex flex-col overflow-hidden min-w-0"
                style={{ background:'radial-gradient(ellipse at 50% 0%,rgba(224,0,10,0.04) 0%,transparent 60%)' }}>
                <Divider label="Live Preview — tap to open full view & download" />
                <div ref={previewPanelRef} className="flex-1 overflow-y-auto flex flex-col items-center justify-start py-5 px-4">
                  <PreviewThumb
                    card={previewMap[active]}
                    onOpen={() => setModalOpen(true)}
                    containerRef={previewPanelRef}
                  />
                  <div className="h-4 shrink-0" />
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ── Full-screen modal — card is fully painted here, download targets it ── */}
      {modalOpen && isCard && (
        <CardModal
          card={modalCardMap[active]}
          filename={meta?.file || 'tenblogs-card'}
          onClose={() => setModalOpen(false)}
        />
      )}

    </div>
  )
}

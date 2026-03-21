import { useState } from 'react'
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

import { DownloadButton } from './components/ui/SharedUI'
import {
  DEFAULT_RATING, DEFAULT_H2H, DEFAULT_ANALYTICS,
  DEFAULT_PREDICTION, DEFAULT_MATCHDAY, DEFAULT_RESULT,
} from './lib/defaults'

const DL_META = {
  rating:     { id:'preview-rating',     file:'tenblogs-player-rating' },
  h2h:        { id:'preview-h2h',        file:'tenblogs-h2h' },
  analytics:  { id:'preview-analytics',  file:'tenblogs-analytics' },
  prediction: { id:'preview-prediction', file:'tenblogs-prediction' },
  matchday:   { id:'preview-matchday',   file:'tenblogs-matchday-flyer' },
  result:     { id:'preview-result',     file:'tenblogs-result-flyer' },
}

const Divider = ({ label }) => (
  <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] shrink-0"
    style={{ background:'rgba(0,0,0,0.25)' }}>
    <div className="w-[2px] h-4 bg-[#e0000a] shrink-0" />
    <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/30">{label}</span>
  </div>
)

function DownloadPanel({ active }) {
  const meta = DL_META[active]
  if (!meta) return null
  return (
    <div className="px-5 py-4 border-t border-white/[0.06] shrink-0"
      style={{ background:'linear-gradient(180deg,rgba(224,0,10,0.04) 0%,transparent 100%)' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="font-bebas text-[17px] tracking-[0.05em] text-white mb-0.5">Download Card</div>
          <div className="text-[11px] text-white/30">2× retina PNG · Saved directly to your device</div>
        </div>
        <DownloadButton targetId={meta.id} filename={meta.file} size="lg" />
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        {['Instagram 1080×1080','YouTube 1280×720','Facebook 1200×630','TikTok'].map(p => (
          <span key={p} className="text-[8px] font-bold tracking-[0.12em] uppercase text-white/18 border border-white/[0.06] px-2 py-0.5">{p}</span>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [active,     setActive]     = useState('dashboard')
  const [collapsed,  setCollapsed]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const [rD, setRD]     = useState(DEFAULT_RATING)
  const [rImg, setRImg] = useState(null)
  const [hD, setHD]     = useState(DEFAULT_H2H)
  const [aD, setAD]     = useState(DEFAULT_ANALYTICS)
  const [pD, setPD]     = useState(DEFAULT_PREDICTION)
  const [mD, setMD]     = useState(DEFAULT_MATCHDAY)
  const [resD, setResD] = useState(DEFAULT_RESULT)

  const isCard = active !== 'dashboard'

  const formMap = {
    rating:     <RatingForm     d={rD}   setD={setRD}   img={rImg} setImg={setRImg} />,
    h2h:        <H2HForm        d={hD}   setD={setHD} />,
    analytics:  <AnalyticsForm  d={aD}   setD={setAD} />,
    prediction: <PredictionForm d={pD}   setD={setPD} />,
    matchday:   <MatchdayFlyerForm d={mD}  setD={setMD} />,
    result:     <ResultFlyerForm   d={resD} setD={setResD} />,
  }

  const previewMap = {
    rating:     <RatingCard     d={rD}   img={rImg} />,
    h2h:        <H2HCard        d={hD} />,
    analytics:  <AnalyticsCard  d={aD} />,
    prediction: <PredictionCard d={pD} />,
    matchday:   <MatchdayFlyer  d={mD} />,
    result:     <ResultFlyer    d={resD} />,
  }

  return (
    <div className="flex h-screen overflow-hidden"
      style={{ background:'#050508', fontFamily:"'Barlow Condensed',sans-serif", color:'#f0f0f8' }}>

      <Sidebar
        active={active} setActive={setActive}
        collapsed={collapsed} setCollapsed={setCollapsed}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
      />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Topbar active={active} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <div className="flex-1 overflow-hidden">
          {!isCard && (
            <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
              <Dashboard goTo={setActive} />
            </div>
          )}

          {isCard && (
            <div className="h-full flex flex-col lg:flex-row overflow-hidden">

              {/* Form panel */}
              <div className="w-full lg:w-[300px] lg:shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col overflow-hidden"
                style={{ background:'rgba(255,255,255,0.012)', maxHeight:'45vh' }}>
                <Divider label="Fill in Stats" />
                <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                  {formMap[active]}
                </div>
              </div>

              {/* Preview + download */}
              <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <Divider label="Card Preview — updates as you type" />
                <div className="flex-1 overflow-y-auto flex flex-col items-center py-6 px-4"
                  style={{ background:'radial-gradient(ellipse at 50% 0%,rgba(224,0,10,0.04) 0%,transparent 60%)' }}>
                  <div className="w-full flex justify-center">
                    {previewMap[active]}
                  </div>
                  <div className="h-4 shrink-0" />
                </div>
                <DownloadPanel active={active} />
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

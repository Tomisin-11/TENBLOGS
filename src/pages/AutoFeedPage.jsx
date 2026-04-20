import React, { useState, useEffect, useRef, useCallback } from 'react'
import { RefreshCw, Copy, Check, ExternalLink, Clock, Zap, Newspaper, Trophy, AlertCircle, ChevronDown, ChevronUp, Eye, Filter } from 'lucide-react'
import NewsCard from '../components/cards/NewsCard'
import ResultFlyer from '../components/cards/ResultFlyer'
import TransferCard from '../components/cards/TransferCard'
import NewsForm from '../components/forms/NewsForm'
import ResultFlyerForm from '../components/forms/ResultFlyerForm'
import TransferForm from '../components/forms/TransferForm'
import { scanAndBuildFeed, SPORTS_CONFIG, DEFAULT_FILTERS } from '../lib/autoFeed'
import { downloadCardAsPng } from '../lib/download'

// ── Scaled card preview ───────────────────────────────────────
function ScaledPreview({ card, cardId, containerRef }) {
  const [scale, setScale] = React.useState(1)
  const wrapRef = React.useRef(null)
  React.useEffect(() => {
    const measure = () => {
      if (!containerRef?.current || !wrapRef.current) return
      const available = containerRef.current.clientWidth - 32
      const cardW = wrapRef.current.firstChild?.offsetWidth || 460
      setScale(Math.min(1, available / cardW))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef?.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [containerRef, card])
  return (
    <div ref={wrapRef} style={{
      transformOrigin: 'top center',
      transform: `scale(${scale})`,
      marginBottom: scale < 1 ? `${Math.round((scale - 1) * (wrapRef.current?.firstChild?.offsetHeight || 600))}px` : 0,
      transition: 'transform 0.15s ease',
    }}>
      <div id={cardId}>{card}</div>
    </div>
  )
}

// ── Caption block ─────────────────────────────────────────────
function CaptionBlock({ label, text }) {
  const [copied, setCopied] = useState(false)
  if (!text) return null
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30">{label}</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.15em] uppercase transition-colors px-2 py-1 border border-white/[0.08] hover:border-white/20"
          style={{ color: copied ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>
          {copied ? <Check size={9} /> : <Copy size={9} />}{copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="text-[11px] leading-relaxed text-white/60 border border-white/[0.06] p-3"
        style={{ background: 'rgba(255,255,255,0.02)', whiteSpace: 'pre-wrap' }}>
        {text}
      </div>
    </div>
  )
}

// ── Edit + Preview modal ──────────────────────────────────────
function CardEditModal({ item, onClose }) {
  const [dlState,  setDlState]  = useState('idle')
  const [cardData, setCardData] = useState({ ...item.cardData })
  const [transImg, setTransImg] = useState(item.cardData?.bgImage || null)
  const previewPanelRef = useRef(null)
  const cardId = `autofeed-edit-${item.id}`

  const cardEl = {
    news:     <NewsCard     d={cardData} />,
    result:   <ResultFlyer  d={cardData} />,
    transfer: <TransferCard d={cardData} img={transImg} />,
  }[item.cardType] || <NewsCard d={cardData} />

  const handleDownload = async () => {
    setDlState('loading')
    try { await downloadCardAsPng(cardId, `tenblogs-auto-${item.cardType}`, item.cardType); setDlState('done'); setTimeout(() => setDlState('idle'), 2500) }
    catch { setDlState('idle') }
  }

  const renderForm = () => {
    if (item.cardType === 'news')     return <NewsForm d={cardData} setD={setCardData} />
    if (item.cardType === 'result')   return <ResultFlyerForm d={cardData} setD={setCardData} />
    if (item.cardType === 'transfer') return <TransferForm d={cardData} setD={setCardData} img={transImg} setImg={setTransImg} />
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#050508', fontFamily: "'Barlow Condensed',sans-serif", color: '#f0f0f8' }}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0 border-b border-white/[0.08]" style={{ background: 'rgba(0,0,0,0.6)' }}>
        <div className="flex items-center gap-3">
          <div className="w-[2px] h-5 bg-[#e0000a]" />
          <span className="font-bebas text-[20px] sm:text-[22px] tracking-[0.06em] text-white">Edit & Preview</span>
          <span className="hidden sm:block text-[9px] text-white/25 tracking-[0.08em]">changes update live</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleDownload}
            className="inline-flex items-center gap-2 border px-4 sm:px-6 py-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-all cursor-pointer"
            style={{ background: dlState === 'done' ? 'rgba(74,222,128,0.1)' : '#e0000a', borderColor: dlState === 'done' ? 'rgba(74,222,128,0.4)' : 'transparent', color: dlState === 'done' ? '#4ade80' : '#fff' }}>
            {dlState === 'loading' && <RefreshCw size={13} strokeWidth={2} className="animate-spin" />}
            {dlState === 'done'    && <Check size={13} strokeWidth={2} />}
            {dlState === 'done' ? 'Downloaded!' : dlState === 'loading' ? 'Generating…' : '↓ Download PNG'}
          </button>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center border border-white/[0.12] text-white/50 hover:text-white hover:border-white/30 transition-all text-[16px]">✕</button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        <div className="form-panel w-full lg:w-[300px] lg:shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col overflow-hidden" style={{ background: 'rgba(255,255,255,0.012)', height: '45%' }}>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.06] shrink-0" style={{ background: 'rgba(0,0,0,0.25)' }}>
            <div className="w-[2px] h-3.5 bg-[#e0000a] shrink-0" />
            <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/30">Edit Card</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>{renderForm()}</div>
        </div>
        <div ref={previewPanelRef} className="flex-1 flex flex-col overflow-hidden min-w-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(224,0,10,0.04) 0%, transparent 60%)' }}>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.06] shrink-0" style={{ background: 'rgba(0,0,0,0.25)' }}>
            <div className="w-[2px] h-3.5 bg-[#e0000a] shrink-0" />
            <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/30">Live Preview</span>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start py-5 px-4">
            <ScaledPreview card={cardEl} cardId={cardId} containerRef={previewPanelRef} />
            <div className="h-4 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Filter Panel ──────────────────────────────────────────────
function FilterPanel({ filters, setFilters }) {
  const sportCfg = SPORTS_CONFIG[filters.sport] || SPORTS_CONFIG.football

  const Chip = ({ active, onClick, children }) => (
    <button onClick={onClick}
      className="px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase border transition-all shrink-0"
      style={{
        background:  active ? 'rgba(224,0,10,0.18)' : 'rgba(255,255,255,0.03)',
        borderColor: active ? 'rgba(224,0,10,0.5)'  : 'rgba(255,255,255,0.08)',
        color:       active ? '#e0000a'              : 'rgba(255,255,255,0.4)',
      }}>
      {children}
    </button>
  )

  return (
    <div className="flex flex-col gap-3 p-4 border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.014)' }}>

      {/* Sport */}
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30">Sport</span>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SPORTS_CONFIG).map(([key, cfg]) => (
            <Chip key={key} active={filters.sport === key}
              onClick={() => setFilters(f => ({ ...f, sport: key, league: 'all', newsType: 'all' }))}>
              {cfg.icon} {cfg.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* League / Competition */}
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30">League / Competition</span>
        <div className="flex flex-wrap gap-2">
          {sportCfg.leagues.map(l => (
            <Chip key={l.id} active={filters.league === l.id}
              onClick={() => setFilters(f => ({ ...f, league: l.id }))}>
              {l.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* News type */}
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30">News Type</span>
        <div className="flex flex-wrap gap-2">
          {sportCfg.newsTypes.map(t => (
            <Chip key={t.id} active={filters.newsType === t.id}
              onClick={() => setFilters(f => ({ ...f, newsType: t.id }))}>
              {t.label}
            </Chip>
          ))}
        </div>
      </div>

    </div>
  )
}

// ── Feed item ─────────────────────────────────────────────────
function FeedItem({ item, onLoadIntoStudio }) {
  const [expanded, setExpanded] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const typeLabel = { news: 'News Card', result: 'Result Flyer', transfer: 'Transfer Card' }
  const TypeIcon  = { news: Newspaper, result: Trophy, transfer: Zap }[item.cardType] || Newspaper
  const sportCfg  = SPORTS_CONFIG[item.sport] || SPORTS_CONFIG.football

  const timeAgo = (() => {
    const diff = Date.now() - new Date(item.publishedAt).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 2)  return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24)  return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  })()

  return (
    <>
      <div className="border border-white/[0.08] overflow-hidden" style={{ background: 'rgba(255,255,255,0.016)' }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3"
          style={{ background: 'rgba(224,0,10,0.04)', borderBottom: expanded ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
          <div className="w-6 h-6 bg-[#e0000a]/20 flex items-center justify-center shrink-0 text-[13px]">
            {sportCfg.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold text-white/85 leading-snug" style={{ wordBreak: 'break-word' }}>
              {item.originalTitle}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-[#e0000a]/70">{typeLabel[item.cardType]}</span>
              <span className="text-white/20">·</span>
              <span className="text-[8px] text-white/30 flex items-center gap-1"><Clock size={7} />{timeAgo}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setEditOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.12em] uppercase border border-white/[0.1] text-white/40 hover:text-white/70 hover:border-white/25 transition-all">
              <Eye size={9} /> View
            </button>
            <button onClick={() => setExpanded(e => !e)}
              className="w-7 h-7 flex items-center justify-center border border-white/[0.08] text-white/30 hover:text-white/60 transition-colors">
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>
        </div>

        {/* Expanded */}
        {expanded && (
          <div className="p-4 flex flex-col gap-4">
            {item.cardData?.bgImage && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30">Background Image</span>
                <div className="relative overflow-hidden border border-white/[0.08]" style={{ height: 200 }}>
                  <img src={item.cardData.bgImage} alt="bg" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} onError={e => { e.target.parentElement.style.display = 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                    <div className="text-[13px] font-bold text-white leading-snug">{item.cardData.headline || item.cardData.mainText || ''}</div>
                  </div>
                </div>
              </div>
            )}
            {(item.captions?.facebook || item.captions?.twitter) ? (
              <>
                <CaptionBlock label="📘 Facebook Caption" text={item.captions.facebook} />
                <CaptionBlock label="🐦 X / Twitter Caption" text={item.captions.twitter} />
              </>
            ) : (
              <div className="text-[11px] text-white/30 italic p-3 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                No AI captions — add a Groq key in Settings to enable them.
              </div>
            )}
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setEditOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold tracking-[0.15em] uppercase border transition-all"
                style={{ background: 'rgba(224,0,10,0.15)', borderColor: 'rgba(224,0,10,0.4)', color: '#e0000a' }}>
                <Eye size={10} /> View & Edit Card
              </button>
              <button onClick={() => onLoadIntoStudio(item)}
                className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold tracking-[0.15em] uppercase border border-white/[0.12] text-white/50 hover:text-white/80 hover:border-white/25 transition-all">
                <ExternalLink size={10} /> Load in Studio
              </button>
            </div>
          </div>
        )}
      </div>
      {editOpen && <CardEditModal item={item} onClose={() => setEditOpen(false)} />}
    </>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function AutoFeedPage({ onLoadIntoStudio }) {
  const [feed,        setFeed]        = useState([])
  const [status,      setStatus]      = useState('idle')
  const [errorMsg,    setErrorMsg]    = useState('')
  const [lastScan,    setLastScan]    = useState(null)
  const [nextScanIn,  setNextScanIn]  = useState(null)
  const [showFilters, setShowFilters] = useState(true)
  const [filters,     setFilters]     = useState(DEFAULT_FILTERS)
  const [interval,    setIntervalVal] = useState(180)

  const intervalRef  = useRef(null)
  const countdownRef = useRef(null)
  const countdownVal = useRef(0)

  const doScan = useCallback(async () => {
    setStatus('loading')
    setErrorMsg('')
    try {
      const items = await scanAndBuildFeed(filters, 6)
      if (!items.length) {
        setStatus('error')
        setErrorMsg('No new articles found for these filters. Try a broader league or different news type.')
        return
      }
      setFeed(prev => {
        const existingTitles = new Set(prev.map(i => i.originalTitle))
        const fresh = items.filter(i => !existingTitles.has(i.originalTitle))
        return [...fresh, ...prev].slice(0, 30)
      })
      setLastScan(new Date())
      setStatus('idle')
    } catch (e) {
      setStatus('error')
      setErrorMsg(e.message || 'Scan failed. Check your Netlify environment variables.')
    }
  }, [filters])

  useEffect(() => {
    if (intervalRef.current)  clearInterval(intervalRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
    if (interval === 0) { setNextScanIn(null); return }
    countdownVal.current = interval
    setNextScanIn(interval)
    intervalRef.current  = setInterval(() => { doScan(); countdownVal.current = interval }, interval * 1000)
    countdownRef.current = setInterval(() => { countdownVal.current -= 1; setNextScanIn(countdownVal.current) }, 1000)
    return () => { clearInterval(intervalRef.current); clearInterval(countdownRef.current) }
  }, [interval, doScan])

  const sportCfg   = SPORTS_CONFIG[filters.sport] || SPORTS_CONFIG.football
  const leagueLabel = sportCfg.leagues.find(l => l.id === filters.league)?.label || 'All'
  const typeLabel   = sportCfg.newsTypes.find(t => t.id === filters.newsType)?.label || 'All'

  return (
    <div className="h-full flex flex-col overflow-hidden">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] shrink-0"
        style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-[2px] h-3.5 bg-[#e0000a] shrink-0" />
          <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/30 shrink-0">Auto Feed</span>
          <div className="hidden sm:flex items-center gap-1.5 min-w-0">
            <span className="text-[8px] px-2 py-0.5 border border-white/[0.08] text-white/40 shrink-0">{sportCfg.icon} {sportCfg.label}</span>
            <span className="text-[8px] px-2 py-0.5 border border-white/[0.08] text-white/40 shrink-0">{leagueLabel}</span>
            <span className="text-[8px] px-2 py-0.5 border border-white/[0.08] text-white/40 shrink-0">{typeLabel}</span>
          </div>
          {lastScan && (
            <span className="text-[8px] text-white/20 flex items-center gap-1 shrink-0">
              <Clock size={7} />{lastScan.toLocaleTimeString()}
            </span>
          )}
          {nextScanIn !== null && status !== 'loading' && (
            <span className="text-[8px] text-white/20 shrink-0">· {nextScanIn}s</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Interval picker */}
          <select value={interval} onChange={e => setIntervalVal(Number(e.target.value))}
            className="border border-white/[0.1] text-white/40 text-[9px] px-2 py-1.5 focus:outline-none hidden sm:block"
            style={{ background: '#0c0c12' }}>
            <option value={120}>2 min</option>
            <option value={180}>3 min</option>
            <option value={300}>5 min</option>
            <option value={600}>10 min</option>
            <option value={0}>Manual</option>
          </select>
          <button onClick={() => setShowFilters(f => !f)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.12em] uppercase border transition-all"
            style={{
              borderColor: showFilters ? 'rgba(224,0,10,0.4)' : 'rgba(255,255,255,0.1)',
              background:  showFilters ? 'rgba(224,0,10,0.1)' : 'transparent',
              color:       showFilters ? '#e0000a' : 'rgba(255,255,255,0.4)',
            }}>
            <Filter size={9} /> Filters
          </button>
          <button onClick={doScan} disabled={status === 'loading'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold tracking-[0.12em] uppercase border transition-all"
            style={{
              background:  status === 'loading' ? 'rgba(224,0,10,0.08)' : 'rgba(224,0,10,0.18)',
              borderColor: 'rgba(224,0,10,0.5)',
              color: '#e0000a',
            }}>
            <RefreshCw size={9} className={status === 'loading' ? 'animate-spin' : ''} />
            {status === 'loading' ? 'Scanning…' : 'Scan Now'}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

        {showFilters && <FilterPanel filters={filters} setFilters={setFilters} />}

        {status === 'error' && errorMsg && (
          <div className="flex items-start gap-3 p-4 border border-[#e0000a]/25"
            style={{ background: 'rgba(224,0,10,0.07)' }}>
            <AlertCircle size={14} className="text-[#e0000a] shrink-0 mt-0.5" />
            <div className="text-[11px] text-white/60 leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {status === 'loading' && !feed.length && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <RefreshCw size={24} className="text-[#e0000a] animate-spin" />
            <div className="text-[11px] text-white/30 tracking-[0.1em]">Scanning {sportCfg.label} news…</div>
          </div>
        )}

        {!feed.length && status === 'idle' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <div className="text-[40px]">{sportCfg.icon}</div>
            <div>
              <div className="font-bebas text-[22px] tracking-[0.08em] text-white/50 mb-2">READY TO SCAN</div>
              <div className="text-[12px] text-white/30 max-w-[280px] leading-relaxed">
                Pick your filters above then hit Scan Now to get the latest {sportCfg.label} news.
              </div>
            </div>
          </div>
        )}

        {feed.map(item => (
          <FeedItem key={item.id} item={item} onLoadIntoStudio={onLoadIntoStudio} />
        ))}

      </div>
    </div>
  )
}

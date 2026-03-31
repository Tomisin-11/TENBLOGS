import { TEAMS, COMPETITIONS } from '../../lib/teamLogos'

const getLogo = (storedLogo, teamName) => storedLogo || TEAMS[teamName]?.logo || null

/** Result Flyer — 1080×1350 portrait, FULL-TIME poster style */
export default function ResultFlyer({ d }) {
  const hasBg      = !!d.bgImage
  const hasComp    = !!(d.competition || d.competitionLogo)
  const stageLabel = d.stageType || 'FULL - TIME'
  const isMatchday = stageLabel.toUpperCase() === 'MATCHDAY'
  const homeScorers = (d.homeScorers || '').split('\n').filter(Boolean)
  const awayScorers = (d.awayScorers || '').split('\n').filter(Boolean)

  return (
    <div id="preview-result"
      style={{ width: 1080, height: 1350, position: 'relative', overflow: 'hidden', fontFamily: "'Barlow Condensed',sans-serif", maxWidth: '100%', background: hasBg ? '#000' : (d.bgColor || '#100818') }}>

      {hasBg && (
        <img src={d.bgImage} alt="bg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
      )}

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.92) 100%)', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ position: 'absolute', top: 28, left: 36, zIndex: 2, fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)' }}>TEN BLOGS</div>

      {hasComp && (() => {
        const compLogoSrc = d.competitionLogo || COMPETITIONS[d.competition]?.logo
        if (!compLogoSrc) return null
        return (
          <>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 280, height: 200, background: 'radial-gradient(ellipse at top right, rgba(0,0,0,0.52) 0%, transparent 75%)', pointerEvents: 'none', zIndex: 1 }} />
            <div style={{ position: 'absolute', top: 20, right: 36, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <img src={compLogoSrc} alt={d.competition} style={{ height: 68, objectFit: 'contain' }} />
            </div>
          </>
        )
      })()}

      {/* Stage label */}
      <div style={{ position: 'absolute', top: '44%', left: 0, right: 0, zIndex: 2, textAlign: 'center', transform: 'translateY(-50%)' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 110, lineHeight: 1, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.92)', textShadow: '0 4px 50px rgba(0,0,0,0.8)', fontStyle: 'italic' }}>
          {stageLabel}
        </div>
        {d.stageSubtext && (
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 14 }}>
            {d.stageSubtext}
          </div>
        )}
      </div>

      {/* Score block — shows VS if MATCHDAY, otherwise score */}
      <div style={{ position: 'absolute', top: '52%', left: 0, right: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '0 40px' }}>
          {getLogo(d.homeTeamLogo, d.homeTeam)
            ? <img src={getLogo(d.homeTeamLogo, d.homeTeam)} alt={d.homeTeam} style={{ width: 160, height: 160, objectFit: 'contain' }} />
            : <div style={{ width: 160, height: 160, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, color: 'rgba(255,255,255,0.5)' }}>{d.homeTeam?.slice(0,3).toUpperCase()}</span>
              </div>
          }

          {/* Centre: VS for matchday, scoreline for results */}
          {isMatchday ? (
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 180, lineHeight: 1, letterSpacing: '0.04em', color: '#ffffff', textShadow: '0 4px 40px rgba(0,0,0,0.9)', margin: '0 16px' }}>
              VS
            </div>
          ) : (
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 180, lineHeight: 1, letterSpacing: '0.04em', color: '#ffffff', textShadow: '0 4px 40px rgba(0,0,0,0.9)', margin: '0 16px' }}>
              {d.homeScore} - {d.awayScore}
            </div>
          )}

          {getLogo(d.awayTeamLogo, d.awayTeam)
            ? <img src={getLogo(d.awayTeamLogo, d.awayTeam)} alt={d.awayTeam} style={{ width: 160, height: 160, objectFit: 'contain' }} />
            : <div style={{ width: 160, height: 160, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, color: 'rgba(255,255,255,0.5)' }}>{d.awayTeam?.slice(0,3).toUpperCase()}</span>
              </div>
          }
        </div>

        {(d.competition || d.stageName) && (
          <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 20, width: '80%' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
              {[d.competition, d.stageName].filter(Boolean).join(' · ')}
            </div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          </div>
        )}
      </div>

      {/* Scorers — only show when not matchday */}
      {!isMatchday && (homeScorers.length > 0 || awayScorers.length > 0) && (
        <div style={{ position: 'absolute', top: '76%', left: 80, right: 80, zIndex: 2, display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeScorers.map((s,i) => (
              <div key={i} style={{ fontSize: 24, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em', textAlign: 'left' }}>{s}</div>
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {awayScorers.map((s,i) => (
              <div key={i} style={{ fontSize: 24, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em', textAlign: 'right' }}>{s}</div>
            ))}
          </div>
        </div>
      )}

      {/* Branding */}
      <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'center', fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)' }}>
        T-BLOGS
      </div>
    </div>
  )
}

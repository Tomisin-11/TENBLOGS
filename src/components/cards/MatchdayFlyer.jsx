import { TEAMS, COMPETITIONS } from '../../lib/teamLogos'

const getLogo = (stored, name) => stored || TEAMS[name]?.logo || null
const getCompLogo = (stored, name) => stored || COMPETITIONS[name]?.logo || null

/** Matchday Flyer — 1080×1350 (Facebook/Instagram safe, no crop) */
export default function MatchdayFlyer({ d }) {
  const bgColor = d.bgColor || '#001230'

  return (
    <div id="preview-matchday"
      style={{
        width: 1080, height: 1350, background: bgColor,
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Barlow Condensed',sans-serif", maxWidth: '100%',
      }}>

      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -160, right: -160, width: 680, height: 680, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -60, right: -60, width: 380, height: 380, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -160, left: -160, width: 560, height: 560, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

      {/* Gradients */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 420, background: 'linear-gradient(180deg,rgba(0,0,0,0.55) 0%,transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 520, background: 'linear-gradient(0deg,rgba(0,0,0,0.9) 0%,transparent 100%)', pointerEvents: 'none' }} />

      {/* Competition logo + name */}
      {(d.competition || d.competitionLogo) && (
        <div style={{ position: 'absolute', top: 36, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {getCompLogo(d.competitionLogo, d.competition) && (
            <img src={getCompLogo(d.competitionLogo, d.competition)} alt={d.competition} style={{ height: 72, objectFit: 'contain' }} />
          )}
          {d.competition && (
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              {d.competition}
            </div>
          )}
        </div>
      )}

      {/* Stage */}
      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 120, lineHeight: 1, letterSpacing: '0.04em', color: '#ffffff', fontStyle: 'italic', textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}>
          {d.stage || 'Matchday'}
        </div>
      </div>

      {/* Teams + VS */}
      <div style={{ position: 'absolute', top: 340, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 60px' }}>

        {/* Home */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          {getLogo(d.homeTeamLogo, d.homeTeam)
            ? <img src={getLogo(d.homeTeamLogo, d.homeTeam)} alt={d.homeTeam} style={{ width: 200, height: 200, objectFit: 'contain' }} />
            : <div style={{ width: 200, height: 200, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: 'rgba(255,255,255,0.4)' }}>{d.homeTeam?.slice(0,3).toUpperCase()}</span>
              </div>
          }
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: '0.06em', color: '#ffffff', textAlign: 'center', maxWidth: 260, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
            {d.homeTeam?.toUpperCase()}
          </div>
        </div>

        {/* VS */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 130, lineHeight: 1, letterSpacing: '0.04em', color: '#ffffff', textShadow: '0 4px 40px rgba(0,0,0,0.9)' }}>VS</div>
          {d.venue && (
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.05)', padding: '6px 18px', border: '1px solid rgba(255,255,255,0.1)' }}>
              {d.venue}
            </div>
          )}
        </div>

        {/* Away */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          {getLogo(d.awayTeamLogo, d.awayTeam)
            ? <img src={getLogo(d.awayTeamLogo, d.awayTeam)} alt={d.awayTeam} style={{ width: 200, height: 200, objectFit: 'contain' }} />
            : <div style={{ width: 200, height: 200, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: 'rgba(255,255,255,0.4)' }}>{d.awayTeam?.slice(0,3).toUpperCase()}</span>
              </div>
          }
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: '0.06em', color: '#ffffff', textAlign: 'center', maxWidth: 260, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
            {d.awayTeam?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Date / Time */}
      <div style={{ position: 'absolute', top: 680, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30 }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 52, letterSpacing: '0.1em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>{d.date}</div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 52, letterSpacing: '0.1em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>{d.time}</div>
      </div>

      {/* Players */}
      <div style={{ position: 'absolute', top: 750, left: 0, right: 0, height: 600, display: 'flex' }}>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {d.homePlayer
            ? <img src={d.homePlayer} alt="home player" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            : <div style={{ width: '100%', height: '100%', border: '1px dashed rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Home Player</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.1)' }}>Upload photo in form</div>
              </div>
          }
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent 40%,rgba(0,0,0,0.65) 100%)', pointerEvents: 'none' }} />
        </div>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {d.awayPlayer
            ? <img src={d.awayPlayer} alt="away player" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transform: 'scaleX(-1)' }} />
            : <div style={{ width: '100%', height: '100%', border: '1px dashed rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Away Player</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.1)' }}>Upload photo in form</div>
              </div>
          }
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,transparent 40%,rgba(0,0,0,0.65) 100%)', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Branding */}
      <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'center', fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)' }}>
        T-BLOGS
      </div>
    </div>
  )
}

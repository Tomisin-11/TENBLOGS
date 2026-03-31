/** Transfer / Breaking News Card — 1080×1350 portrait */
export default function TransferCard({ d, img }) {
  const hasBg = !!d.bgImage

  const typeColors = {
    TRANSFER: '#00b4d8',
    BREAKING: '#e0000a',
    RUMOUR: '#f4a800',
    CONFIRMED: '#00c851',
    EXCLUSIVE: '#9b5de5',
  }
  const badgeType = d.badgeType || 'BREAKING'
  const badgeColor = typeColors[badgeType] || '#e0000a'

  return (
    <div
      id="preview-transfer"
      style={{
        width: 1080, height: 1350,
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Barlow Condensed',sans-serif",
        background: hasBg ? '#000' : (d.bgColor || '#060612'),
        maxWidth: '100%',
      }}
    >
      {/* Background image */}
      {hasBg && (
        <img
          src={d.bgImage} alt="bg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0.97) 100%)',
        zIndex: 1,
      }} />

      {/* Player/subject image */}
      {img && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <img
            src={img} alt="subject"
            style={{ width: '100%', height: '78%', objectFit: 'cover', objectPosition: 'center top' }}
          />
          {/* Bottom fade on player image */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.97))',
          }} />
        </div>
      )}

      {/* TEN BLOGS — top left */}
      <div style={{ position: 'absolute', top: 36, left: 36, zIndex: 5, fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
        TEN BLOGS
      </div>

      {/* Badge (BREAKING / TRANSFER etc) */}
      <div style={{
        position: 'absolute',
        bottom: 380,
        left: 60,
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
      }}>
        <div style={{
          background: badgeColor,
          color: '#fff',
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 32,
          letterSpacing: '0.22em',
          padding: '8px 30px',
        }}>
          {badgeType}
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          border: `1px solid ${badgeColor}`,
          borderLeft: 'none',
          color: 'rgba(255,255,255,0.55)',
          fontFamily: "'Barlow Condensed',sans-serif",
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: '0.12em',
          padding: '9px 22px',
          textTransform: 'uppercase',
        }}>
          {d.badgeSubtext || 'NEWS'}
        </div>
      </div>

      {/* Main text */}
      <div style={{ position: 'absolute', bottom: 140, left: 60, right: 60, zIndex: 5 }}>
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: parseInt(d.mainTextSize) || 100,
          lineHeight: 0.96,
          color: '#ffffff',
          letterSpacing: '0.02em',
          textShadow: '0 4px 40px rgba(0,0,0,0.9)',
          marginBottom: 24,
        }}>
          {d.mainText || 'MAIN NEWS TEXT HERE'}
        </div>

        {/* Side / detail text */}
        {d.sideText && (
          <div style={{
            fontSize: parseInt(d.sideTextSize) || 34,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.62)',
            letterSpacing: '0.04em',
            lineHeight: 1.3,
            borderLeft: `3px solid ${badgeColor}`,
            paddingLeft: 20,
          }}>
            {d.sideText}
          </div>
        )}
      </div>

      {/* T-BLOGS branding */}
      <div style={{
        position: 'absolute', bottom: 28, left: 0, right: 0, zIndex: 10,
        display: 'flex', justifyContent: 'center',
        fontFamily: "'Bebas Neue',sans-serif",
        fontSize: 26, letterSpacing: '0.22em',
        color: 'rgba(255,255,255,0.25)',
      }}>
        T-BLOGS
      </div>
    </div>
  )
}

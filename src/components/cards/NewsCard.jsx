/** News Card — 1080×1350 portrait */
export default function NewsCard({ d }) {
  const hasBg = !!d.bgImage
  const sourcePos = d.sourcePos || 'bottom-right'

  return (
    <div
      id="preview-news"
      style={{
        width: 1080, height: 1350,
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Barlow Condensed',sans-serif",
        background: hasBg ? '#000' : (d.bgColor || '#0d0d14'),
        maxWidth: '100%',
      }}
    >
      {/* Background image */}
      {hasBg && (
        <img
          src={d.bgImage} alt="bg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      )}

      {/* Gradient overlay — always bottom heavy */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.82) 75%, rgba(0,0,0,0.97) 100%)',
        zIndex: 1,
      }} />

      {/* TEN BLOGS — top left */}
      <div style={{ position: 'absolute', top: 36, left: 36, zIndex: 3, fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
        TEN BLOGS
      </div>

      {/* News text block */}
      <div style={{
        position: 'absolute',
        bottom: d.subtext ? 180 : 140,
        left: 60, right: 60,
        zIndex: 3,
      }}>
        {/* Category tag */}
        {d.category && (
          <div style={{
            display: 'inline-block',
            background: '#e0000a',
            color: '#fff',
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 22,
            letterSpacing: '0.22em',
            padding: '5px 22px',
            marginBottom: 24,
          }}>
            {d.category.toUpperCase()}
          </div>
        )}

        {/* Headline */}
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: parseInt(d.headlineSize) || 96,
          lineHeight: 1.0,
          color: '#ffffff',
          letterSpacing: '0.02em',
          textShadow: '0 2px 40px rgba(0,0,0,0.8)',
          marginBottom: d.subtext ? 28 : 0,
        }}>
          {d.headline || 'YOUR HEADLINE HERE'}
        </div>

        {/* Subtext */}
        {d.subtext && (
          <div style={{
            fontSize: parseInt(d.subtextSize) || 36,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.04em',
            lineHeight: 1.3,
          }}>
            {d.subtext}
          </div>
        )}
      </div>

      {/* Source reference */}
      {d.source && (
        <div style={{
          position: 'absolute',
          zIndex: 3,
          ...(sourcePos === 'bottom-right' ? { bottom: 90, right: 60 } : {}),
          ...(sourcePos === 'bottom-left' ? { bottom: 90, left: 60 } : {}),
          ...(sourcePos === 'top-center' ? { top: 36, left: 0, right: 0, textAlign: 'center' } : {}),
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.38)',
          textTransform: 'uppercase',
        }}>
          {d.source}
        </div>
      )}

      {/* T-BLOGS branding bottom center */}
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

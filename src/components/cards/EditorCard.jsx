/** Editor Card — configurable aspect ratio post designer */
const RATIOS = {
  '9:16':   { w:1080, h:1920, label:'9:16 — TikTok / Reels / Stories' },
  '16:9':   { w:1920, h:1080, label:'16:9 — YouTube / Twitter' },
  '1:1':    { w:1080, h:1080, label:'1:1 — Instagram Post' },
  '4:3':    { w:1080, h:810,  label:'4:3 — Classic' },
  '2:1':    { w:1080, h:540,  label:'2:1 — Twitter Banner' },
  '5:8':    { w:1080, h:1728, label:'5:8 — Pinterest' },
  '3:4':    { w:1080, h:1440, label:'3:4 — Portrait / Instagram' },
  '4:5':    { w:1080, h:1350, label:'4:5 — Instagram Tall Post' },
  '21:9':   { w:1920, h:823,  label:'21:9 — Ultrawide / Cinema' },
  'custom': { w:null, h:null,  label:'Custom' },
}

export { RATIOS }

export default function EditorCard({ d }) {
  const ratio = RATIOS[d.ratio] || RATIOS['1:1']
  const W = d.ratio === 'custom' ? (parseInt(d.customW) || 1080) : ratio.w
  const H = d.ratio === 'custom' ? (parseInt(d.customH) || 1080) : ratio.h

  const hasBg = !!d.bgImage
  const textBlocks = d.textBlocks || []

  // Text alignment helper
  const alignStyle = (align) => ({
    textAlign: align || 'center',
    alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
  })

  return (
    <div id="preview-editor"
      style={{
        width: W, height: H, position: 'relative', overflow: 'hidden',
        fontFamily: "'Barlow Condensed',sans-serif", maxWidth: '100%',
        background: hasBg ? '#000' : (d.bgColor || '#0d0d14'),
      }}>

      {/* Background image */}
      {hasBg && (
        <img src={d.bgImage} alt="bg"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'cover', objectPosition: d.bgPosition || 'center',
            filter:`brightness(${d.bgBrightness || 0.8}) saturate(${d.bgSaturate || 1})` }} />
      )}

      {/* Gradient overlay */}
      {d.overlayGradient && d.overlayGradient !== 'none' && (
        <div style={{ position:'absolute', inset:0, background: d.overlayGradient, pointerEvents:'none', zIndex:1 }} />
      )}

      {/* Solid overlay with opacity */}
      {d.overlayColor && d.overlayOpacity > 0 && (
        <div style={{ position:'absolute', inset:0, background:d.overlayColor,
          opacity: d.overlayOpacity / 100, pointerEvents:'none', zIndex:1 }} />
      )}

      {/* Text blocks */}
      {textBlocks.map((tb, i) => {
        if (!tb.text) return null
        const aStyle = alignStyle(tb.align)
        return (
          <div key={i} style={{
            position:'absolute',
            top: `${tb.top || 50}%`,
            left: `${tb.left || 0}%`,
            right: `${tb.right !== undefined ? tb.right : 0}%`,
            transform: tb.top !== undefined ? 'translateY(-50%)' : undefined,
            zIndex: 5,
            display:'flex', flexDirection:'column',
            padding:`0 ${Math.round(W * 0.04)}px`,
            ...aStyle,
          }}>
            {tb.label && (
              <div style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize: Math.round(W * (tb.labelSize || 0.018)),
                letterSpacing:'0.25em', textTransform:'uppercase',
                color: tb.labelColor || 'rgba(255,255,255,0.45)',
                marginBottom: Math.round(W * 0.008),
              }}>{tb.label}</div>
            )}
            <div style={{
              fontFamily: tb.font === 'bebas' ? "'Bebas Neue',sans-serif" : "'Barlow Condensed',sans-serif",
              fontSize: Math.round(W * (tb.size || 0.065)),
              fontWeight: tb.weight || 700,
              fontStyle: tb.italic ? 'italic' : 'normal',
              lineHeight: tb.lineHeight || 1.1,
              letterSpacing: `${tb.letterSpacing || 0.02}em`,
              color: tb.color || '#ffffff',
              textShadow: tb.shadow ? '0 4px 30px rgba(0,0,0,0.8)' : 'none',
              textTransform: tb.uppercase ? 'uppercase' : 'none',
            }}>{tb.text}</div>
            {tb.sub && (
              <div style={{
                fontSize: Math.round(W * (tb.subSize || 0.022)),
                fontWeight: 500,
                letterSpacing:'0.08em',
                color: tb.subColor || 'rgba(255,255,255,0.6)',
                marginTop: Math.round(W * 0.01),
              }}>{tb.sub}</div>
            )}
          </div>
        )
      })}

      {/* Accent bar */}
      {d.accentBar && (
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height: Math.round(H * 0.006),
          background: d.accentColor || '#e0000a', zIndex:6 }} />
      )}

      {/* Branding */}
      {d.showBranding !== false && (
        <div style={{ position:'absolute', bottom: Math.round(H * 0.016), left:0, right:0, zIndex:10,
          display:'flex', justifyContent:'center',
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize: Math.round(W * 0.022),
          letterSpacing:'0.22em', color:'rgba(255,255,255,0.3)' }}>
          {d.brandingText || 'TEN BLOGS'}
        </div>
      )}
    </div>
  )
}

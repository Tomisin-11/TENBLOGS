/** Result Flyer — competition logo is optional, no hardcoded text */
export default function ResultFlyer({ d }) {
  const hasBg   = !!d.bgImage
  const hasComp = !!(d.competition || d.competitionLogo)

  return (
    <div id="preview-result"
      style={{ width:400, height:580, position:'relative', overflow:'hidden',
        fontFamily:"'Barlow Condensed',sans-serif",
        background: hasBg ? '#000' : '#100808',
        maxWidth:'100%' }}>

      {/* Background photo */}
      {hasBg && (
        <img src={d.bgImage} alt="background"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'cover', objectPosition:'center 20%',
            filter:'brightness(0.5) saturate(0.75)' }} />
      )}

      {/* Gradient overlays */}
      <div style={{ position:'absolute', inset:0,
        background:'linear-gradient(180deg,rgba(0,0,0,0.35) 0%,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.72) 70%,rgba(0,0,0,0.94) 100%)',
        pointerEvents:'none' }} />

      {/* Top accent bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:4,
        background:'linear-gradient(90deg,#e0000a,rgba(224,0,10,0.3) 60%,transparent 100%)' }} />

      {/* Top branding */}
      <div style={{ position:'absolute', top:12, left:14,
        fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:'0.22em',
        color:'rgba(255,255,255,0.45)' }}>
        T-BLOGS
      </div>

      {/* ── Competition logo (optional) — top right ── */}
      {hasComp && (
        <div style={{ position:'absolute', top:10, right:14,
          display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
          {d.competitionLogo && (
            <img src={d.competitionLogo} alt={d.competition}
              style={{ height:32, objectFit:'contain' }} />
          )}
          {d.competition && !d.competitionLogo && (
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.4)', background:'rgba(255,255,255,0.06)',
              padding:'3px 8px', border:'1px solid rgba(255,255,255,0.1)' }}>
              {d.competition}
            </div>
          )}
        </div>
      )}

      {/* FULL-TIME text */}
      <div style={{ position:'absolute', top:hasBg ? '36%' : '32%', left:0, right:0,
        textAlign:'center', transform:'translateY(-50%)' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:58, lineHeight:1,
          letterSpacing:'0.06em', color:'rgba(255,255,255,0.92)',
          textShadow:'0 2px 30px rgba(0,0,0,0.8)', fontStyle:'italic' }}>
          FULL - TIME
        </div>
      </div>

      {/* Score block */}
      <div style={{ position:'absolute', bottom:130, left:0, right:0,
        display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}>

        {/* Logos + score */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14, padding:'0 20px' }}>
          {/* Home logo */}
          {d.homeTeamLogo
            ? <img src={d.homeTeamLogo} alt={d.homeTeam}
                style={{ width:76, height:76, objectFit:'contain' }} />
            : <div style={{ width:76, height:76, background:'rgba(255,255,255,0.1)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:19,
                  color:'rgba(255,255,255,0.5)' }}>
                  {d.homeTeam?.slice(0,3).toUpperCase()}
                </span>
              </div>
          }

          {/* Score */}
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:76, lineHeight:1,
            letterSpacing:'0.04em', color:'#ffffff',
            textShadow:'0 2px 20px rgba(0,0,0,0.9)' }}>
            {d.homeScore} - {d.awayScore}
          </div>

          {/* Away logo */}
          {d.awayTeamLogo
            ? <img src={d.awayTeamLogo} alt={d.awayTeam}
                style={{ width:76, height:76, objectFit:'contain' }} />
            : <div style={{ width:76, height:76, background:'rgba(255,255,255,0.1)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:19,
                  color:'rgba(255,255,255,0.5)' }}>
                  {d.awayTeam?.slice(0,3).toUpperCase()}
                </span>
              </div>
          }
        </div>

        {/* Stage label — only if competition or stage is set */}
        {(d.competition || d.stage) && (
          <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.2)', minWidth:40 }} />
            <div style={{ fontSize:13, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.6)' }}>
              {[d.competition, d.stage].filter(Boolean).join(' · ')}
            </div>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.2)', minWidth:40 }} />
          </div>
        )}
      </div>

      {/* Team names */}
      <div style={{ position:'absolute', bottom:60, left:0, right:0,
        display:'flex', justifyContent:'space-around', padding:'0 24px' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:'0.08em',
          color:'rgba(255,255,255,0.5)' }}>
          {d.homeTeam?.toUpperCase()}
        </div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:'0.08em',
          color:'rgba(255,255,255,0.5)' }}>
          {d.awayTeam?.toUpperCase()}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:38,
        display:'flex', alignItems:'center', justifyContent:'center',
        background:'rgba(0,0,0,0.55)', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, letterSpacing:'0.22em',
          color:'rgba(255,255,255,0.3)' }}>
          T-BLOGS · tenblogs.com
        </div>
      </div>
    </div>
  )
}

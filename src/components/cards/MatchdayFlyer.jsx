/** Matchday Flyer — all logos are data URLs from state, no CORS issues */
export default function MatchdayFlyer({ d }) {
  const bgColor = d.bgColor || '#001230'

  return (
    <div id="preview-matchday"
      style={{ width:400, height:580, background:bgColor, position:'relative', overflow:'hidden',
        fontFamily:"'Barlow Condensed',sans-serif", maxWidth:'100%' }}>

      {/* Decorative circles */}
      <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, borderRadius:'50%',
        border:'1px solid rgba(255,255,255,0.08)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:-30, right:-30, width:180, height:180, borderRadius:'50%',
        border:'1px solid rgba(255,255,255,0.12)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-80, left:-80, width:280, height:280, borderRadius:'50%',
        border:'1px solid rgba(255,255,255,0.06)', pointerEvents:'none' }} />

      {/* Top + bottom gradient overlays */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:200,
        background:'linear-gradient(180deg,rgba(0,0,0,0.5) 0%,transparent 100%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:220,
        background:'linear-gradient(0deg,rgba(0,0,0,0.85) 0%,transparent 100%)', pointerEvents:'none' }} />

      {/* Accent bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
        background:'linear-gradient(90deg,#e0000a 0%,rgba(224,0,10,0.3) 60%,transparent 100%)' }} />

      {/* Competition logo + name — only shown if competition selected */}
      {(d.competition || d.competitionLogo) && (
        <div style={{ position:'absolute', top:14, left:0, right:0,
          display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          {d.competitionLogo && (
            <img src={d.competitionLogo} alt={d.competition}
              style={{ height:32, objectFit:'contain' }} />
          )}
          {d.competition && (
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:10,
              letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)' }}>
              {d.competition}
            </div>
          )}
        </div>
      )}

      {/* Stage / round text */}
      <div style={{ position:'absolute', top:70, left:0, right:0, textAlign:'center' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:46, lineHeight:1,
          letterSpacing:'0.04em', color:'#ffffff', fontStyle:'italic',
          textShadow:'0 2px 20px rgba(0,0,0,0.8)' }}>
          {d.stage || 'Matchday'}
        </div>
      </div>

      {/* Teams + VS */}
      <div style={{ position:'absolute', top:135, left:0, right:0,
        display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 20px' }}>

        {/* Home team */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          {d.homeTeamLogo
            ? <img src={d.homeTeamLogo} alt={d.homeTeam}
                style={{ width:90, height:90, objectFit:'contain' }} />
            : <div style={{ width:90, height:90, background:'rgba(255,255,255,0.08)',
                display:'flex', alignItems:'center', justifyContent:'center', borderRadius:4 }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:'rgba(255,255,255,0.4)' }}>
                  {d.homeTeam?.slice(0,3).toUpperCase()}
                </span>
              </div>
          }
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:'0.06em',
            color:'#ffffff', textAlign:'center', maxWidth:110,
            textShadow:'0 1px 8px rgba(0,0,0,0.8)' }}>
            {d.homeTeam?.toUpperCase()}
          </div>
        </div>

        {/* VS */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:54, lineHeight:1,
            letterSpacing:'0.04em', color:'#ffffff', textShadow:'0 2px 20px rgba(0,0,0,0.9)' }}>
            VS
          </div>
          {d.venue && (
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.35)', background:'rgba(255,255,255,0.05)',
              padding:'3px 8px', border:'1px solid rgba(255,255,255,0.1)' }}>
              {d.venue}
            </div>
          )}
        </div>

        {/* Away team */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          {d.awayTeamLogo
            ? <img src={d.awayTeamLogo} alt={d.awayTeam}
                style={{ width:90, height:90, objectFit:'contain' }} />
            : <div style={{ width:90, height:90, background:'rgba(255,255,255,0.08)',
                display:'flex', alignItems:'center', justifyContent:'center', borderRadius:4 }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:'rgba(255,255,255,0.4)' }}>
                  {d.awayTeam?.slice(0,3).toUpperCase()}
                </span>
              </div>
          }
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:'0.06em',
            color:'#ffffff', textAlign:'center', maxWidth:110,
            textShadow:'0 1px 8px rgba(0,0,0,0.8)' }}>
            {d.awayTeam?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Date / time */}
      <div style={{ position:'absolute', top:315, left:0, right:0,
        display:'flex', justifyContent:'center', alignItems:'center', gap:14 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22,
          letterSpacing:'0.1em', color:'#ffffff', textShadow:'0 1px 8px rgba(0,0,0,0.8)' }}>
          {d.date}
        </div>
        <div style={{ width:4, height:4, borderRadius:'50%', background:'rgba(255,255,255,0.4)' }} />
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22,
          letterSpacing:'0.1em', color:'#ffffff', textShadow:'0 1px 8px rgba(0,0,0,0.8)' }}>
          {d.time}
        </div>
      </div>

      {/* Player images */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:230, display:'flex' }}>
        {/* Home player */}
        <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
          {d.homePlayer
            ? <img src={d.homePlayer} alt="home player"
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }} />
            : <div style={{ width:'100%', height:'100%',
                border:'1px dashed rgba(255,255,255,0.08)',
                display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:4 }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.18)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Home Player</div>
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.1)' }}>Upload photo in form</div>
              </div>
          }
          <div style={{ position:'absolute', inset:0,
            background:'linear-gradient(90deg,transparent 40%,rgba(0,0,0,0.6) 100%)', pointerEvents:'none' }} />
        </div>

        {/* Away player */}
        <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
          {d.awayPlayer
            ? <img src={d.awayPlayer} alt="away player"
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', transform:'scaleX(-1)' }} />
            : <div style={{ width:'100%', height:'100%',
                border:'1px dashed rgba(255,255,255,0.08)',
                display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:4 }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.18)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Away Player</div>
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.1)' }}>Upload photo in form</div>
              </div>
          }
          <div style={{ position:'absolute', inset:0,
            background:'linear-gradient(270deg,transparent 40%,rgba(0,0,0,0.6) 100%)', pointerEvents:'none' }} />
        </div>
      </div>

      {/* Branding */}
      <div style={{ position:'absolute', bottom:10, left:0, right:0, zIndex:10,
        display:'flex', justifyContent:'center',
        fontFamily:"'Bebas Neue',sans-serif", fontSize:13,
        letterSpacing:'0.22em', color:'rgba(255,255,255,0.3)' }}>
        T-BLOGS
      </div>
    </div>
  )
}

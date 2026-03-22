import { TEAMS, COMPETITIONS } from '../../lib/teamLogos'

const getLogo = (storedLogo, teamName) =>
  storedLogo || TEAMS[teamName]?.logo || null

/** Result Flyer — 400×580 portrait, FULL-TIME poster style */
export default function ResultFlyer({ d }) {
  const hasBg   = !!d.bgImage
  const hasComp = !!(d.competition || d.competitionLogo)
  const stageLabel = d.stageType || 'FULL - TIME'
  const homeScorers = (d.homeScorers || '').split('\n').filter(Boolean)
  const awayScorers = (d.awayScorers || '').split('\n').filter(Boolean)

  return (
    <div id="preview-result"
      style={{ width:450, height:500, position:'relative', overflow:'hidden',
        fontFamily:"'Barlow Condensed',sans-serif", maxWidth:'100%',
        background: hasBg ? '#000' : (d.bgColor || '#1008y8') }}>

      {/* Background photo */}
      {hasBg && (
        <img src={d.bgImage} alt="bg"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'cover', objectPosition:'center 15%',
              }} />
      )}

      {/* Bottom dark fade — keeps scores readable over any bg */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'65%',
        background:'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.88) 100%)',
        pointerEvents:'none', zIndex:1
      }} />

      {/* T-BLOGS branding */}
      <div style={{ position:'absolute', top:12, left:14, zIndex:2,
        fontFamily:"'Bebas Neue',sans-serif", fontSize:14,
        letterSpacing:'0.22em', color:'rgba(255,255,255,0.4)' }}>TEN BLOGS</div>

     {/* Top-right dark fade — behind competition logo */}
           {hasComp && (
             <div style={{
               position:'absolute', top:0, right:0, width:120, height:90,
               background:'radial-gradient(ellipse at top right, rgba(0,0,0,0.52) 0%, transparent 75%)',
               pointerEvents:'none', zIndex:1
             }} />
           )}
     
           {/* Competition logo top-right (optional) */}
           {hasComp && (
             <div style={{ position:'absolute', top:8, right:14, zIndex:2,
               display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
               {(d.competitionLogo || COMPETITIONS[d.competition]?.logo) && (
                 <img src={d.competitionLogo || COMPETITIONS[d.competition]?.logo} alt={d.competition}
                   style={{ height:30, objectFit:'contain' }} />
               )}
               {d.competition && !d.competitionLogo && !COMPETITIONS[d.competition]?.logo && (
                 <div style={{ fontSize:9, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase',
                   color:'rgba(255,255,255,0.4)', background:'rgba(255,255,255,0.06)',
                   padding:'3px 8px', border:'1px solid rgba(255,255,255,0.1)' }}>
                   {d.competition}
                 </div>
               )}
             </div>
           )}

      {/* Stage label */}
      <div style={{ position:'absolute', top:'48%', left:0, right:0, zIndex:2,
        textAlign:'center', transform:'translateY(-50%)' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:43, lineHeight:1,
          letterSpacing:'0.06em', color:'rgba(255,255,255,0.92)',
          textShadow:'0 2px 30px rgba(0,0,0,0.8)', fontStyle:'italic' }}>
          {stageLabel}
        </div>
        {d.stageSubtext && (
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.2em',
            textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginTop:6 }}>
            {d.stageSubtext}
          </div>
        )}
      </div>

      {/* Score block */}
      <div style={{ position:'absolute', top:'55%', left:0, right:0, zIndex:2,
        display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14, padding:'0 20px' }}>
          {getLogo(d.homeTeamLogo, d.homeTeam)
            ? <img src={getLogo(d.homeTeamLogo, d.homeTeam)} alt={d.homeTeam}
                style={{ width:72, height:72, objectFit:'contain' }} />
            : <div style={{ width:72, height:72, background:'rgba(255,255,255,0.1)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, color:'rgba(255,255,255,0.5)' }}>
                  {d.homeTeam?.slice(0,3).toUpperCase()}
                </span>
              </div>
          }
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:76, lineHeight:1,
            letterSpacing:'0.04em', color:'#ffffff',
            textShadow:'0 2px 20px rgba(0,0,0,0.9)', margin:'0 8px' }}>
            {d.homeScore} - {d.awayScore}
          </div>
          {getLogo(d.awayTeamLogo, d.awayTeam)
            ? <img src={getLogo(d.awayTeamLogo, d.awayTeam)} alt={d.awayTeam}
                style={{ width:72, height:72, objectFit:'contain' }} />
            : <div style={{ width:72, height:72, background:'rgba(255,255,255,0.1)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, color:'rgba(255,255,255,0.5)' }}>
                  {d.awayTeam?.slice(0,3).toUpperCase()}
                </span>
              </div>
          }
        </div>

        {(d.competition || d.stageName) && (
          <div className='bg-' style={{ marginTop:12, display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.2)', minWidth:30 }} />
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.55)' }}>
              {[d.competition, d.stageName].filter(Boolean).join(' · ')}
            </div>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.2)', minWidth:30 }} />
          </div>
        )}
      </div>

      {/* Scorers */}
      {(homeScorers.length > 0 || awayScorers.length > 0) && (
        <div style={{ position:'absolute', top:'78%', left:50, right:50, zIndex:2,
          display:'flex', justifyContent:'space-between', padding:'0 20px', gap:8 }}>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:4 }}>
            {homeScorers.map((s,i) => (
              <div key={i} style={{ fontSize:12, color:'rgba(255,255,255,0.65)',
                letterSpacing:'0.04em', textAlign:'left' }}>{s}</div>
            ))}
          </div>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:4 }}>
            {awayScorers.map((s,i) => (
              <div key={i} style={{ fontSize:12, color:'rgba(255,255,255,0.65)',
                letterSpacing:'0.04em', textAlign:'right' }}>{s}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

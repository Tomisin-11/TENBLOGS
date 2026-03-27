/** Player Stats Card — 1080×1350 portrait, Saka-style full-bleed */

const POSITION_STATS = {
  Forward: [
    { key: 'matchRating', label: 'Match Rating', format: v => parseFloat(v||0).toFixed(1) },
    { key: 'goals', label: 'Goals' },
    { key: 'assists', label: 'Assists' },
    { key: 'shots', label: 'Shots' },
    { key: 'shotsOnTarget', label: 'On Target' },
    { key: 'bigChancesCreated', label: 'Big Chances' },
    { key: 'xg', label: 'xG', format: v => parseFloat(v||0).toFixed(1) },
    { key: 'touches', label: 'Touches' },
    { key: 'dribbles', label: 'Dribbles' },
    { key: 'keyPasses', label: 'Key Passes' },
  ],
  Midfielder: [
    { key: 'matchRating', label: 'Match Rating', format: v => parseFloat(v||0).toFixed(1) },
    { key: 'goals', label: 'Goals' },
    { key: 'assists', label: 'Assists' },
    { key: 'keyPasses', label: 'Key Passes' },
    { key: 'bigChancesCreated', label: 'Big Chances' },
    { key: 'passAccuracy', label: 'Pass Acc %' },
    { key: 'touches', label: 'Touches' },
    { key: 'dribbles', label: 'Dribbles' },
    { key: 'tackles', label: 'Tackles' },
    { key: 'interceptions', label: 'Interceptions' },
  ],
  Defender: [
    { key: 'matchRating', label: 'Match Rating', format: v => parseFloat(v||0).toFixed(1) },
    { key: 'tackles', label: 'Tackles' },
    { key: 'interceptions', label: 'Interceptions' },
    { key: 'clearances', label: 'Clearances' },
    { key: 'blockedShots', label: 'Blocked Shots' },
    { key: 'duelsWon', label: 'Duels Won' },
    { key: 'passAccuracy', label: 'Pass Acc %' },
    { key: 'aerialDuels', label: 'Aerial Duels' },
    { key: 'goals', label: 'Goals' },
    { key: 'assists', label: 'Assists' },
  ],
  Goalkeeper: [
    { key: 'matchRating', label: 'Match Rating', format: v => parseFloat(v||0).toFixed(1) },
    { key: 'saves', label: 'Saves' },
    { key: 'savePct', label: 'Save %' },
    { key: 'goals', label: 'Goals Conceded' },
    { key: 'bigSaves', label: 'Big Saves' },
    { key: 'penaltiesSaved', label: 'Pens Saved' },
    { key: 'cleanSheet', label: 'Clean Sheet' },
    { key: 'passAccuracy', label: 'Pass Acc %' },
    { key: 'touches', label: 'Touches' },
    { key: 'distribution', label: 'Distribution' },
  ],
}

export { POSITION_STATS }

export default function PlayerStatsCard({ d, img }) {
  const pos = d.position || 'Forward'
  const allStats = POSITION_STATS[pos] || POSITION_STATS.Forward
  // User picks which stats to show (indices), default first 6
  const selectedKeys = d.selectedStats || allStats.slice(0, 6).map(s => s.key)
  const stats = allStats.filter(s => selectedKeys.includes(s.key))

  return (
    <div
      id="preview-playerstats"
      style={{
        width: 1080, height: 1350,
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Barlow Condensed',sans-serif",
        background: '#060612',
        maxWidth: '100%',
      }}
    >
      {/* Player background image — fills entire card */}
      {img ? (
        <img
          src={img} alt="player"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #1a1a2e, #060612)' }} />
      )}

      {/* Strong gradient fade at bottom for stats readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.97) 75%, #000 100%)',
        zIndex: 1,
      }} />

      {/* Subtle side gradients for depth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)',
        zIndex: 1,
      }} />

      {/* TEN BLOGS — top left */}
      <div style={{ position: 'absolute', top: 36, left: 36, zIndex: 3, fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
        TEN BLOGS
      </div>

      {/* Player name + club block */}
      <div style={{
        position: 'absolute',
        bottom: stats.length > 0 ? (stats.length > 4 ? 390 : 310) : 200,
        left: 60, right: 60,
        zIndex: 3,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 110,
          lineHeight: 0.9,
          color: '#ffffff',
          letterSpacing: '0.04em',
          textShadow: '0 4px 50px rgba(0,0,0,0.9)',
        }}>
          {(d.playerName || 'PLAYER NAME').toUpperCase()}
        </div>
        {(d.club || d.match) && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 14,
          }}>
            {d.club && (
              <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                {d.club}
              </span>
            )}
            {d.club && d.match && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 20 }}>·</span>}
            {d.match && (
              <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase' }}>
                {d.match}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats grid — bottom center */}
      {stats.length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 90,
          left: 60, right: 60,
          zIndex: 3,
        }}>
          {/* Thin top line */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', marginBottom: 28 }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`,
            gap: '2px',
          }}>
            {stats.map((stat, i) => {
              const raw = d[stat.key] ?? '—'
              const val = stat.format ? stat.format(raw) : (raw || '—')
              const isRating = stat.key === 'matchRating'
              return (
                <div key={stat.key} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '18px 10px',
                  background: isRating ? 'rgba(224,0,10,0.12)' : 'rgba(255,255,255,0.04)',
                  borderTop: isRating ? '2px solid #e0000a' : '2px solid rgba(255,255,255,0.08)',
                }}>
                  <span style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: isRating ? 72 : 58,
                    lineHeight: 1,
                    color: isRating ? '#e0000a' : '#ffffff',
                    letterSpacing: '0.02em',
                  }}>
                    {val}
                  </span>
                  <span style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    marginTop: 6,
                    textAlign: 'center',
                  }}>
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Thin bottom line */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginTop: 2 }} />
        </div>
      )}

      {/* T-BLOGS branding — very bottom */}
      <div style={{
        position: 'absolute', bottom: 20, left: 0, right: 0, zIndex: 10,
        display: 'flex', justifyContent: 'center',
        fontFamily: "'Bebas Neue',sans-serif",
        fontSize: 22, letterSpacing: '0.22em',
        color: 'rgba(255,255,255,0.2)',
      }}>
        T-BLOGS
      </div>
    </div>
  )
}

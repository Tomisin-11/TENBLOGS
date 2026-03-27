/** Tournament Bracket Card — 1080×1350 portrait */

const FLAG_CODES = {
  'Italy': 'IT', 'Northern Ireland': 'GB-NIR', 'Wales': 'GB-WLS', 'Bosnia': 'BA',
  'Ukraine': 'UA', 'Sweden': 'SE', 'Poland': 'PL', 'Albania': 'AL',
  'Turkey': 'TR', 'Türkiye': 'TR', 'Romania': 'RO', 'Slovakia': 'SK',
  'Kosovo': 'XK', 'Denmark': 'DK', 'North Macedonia': 'MK', 'Czech Republic': 'CZ',
  'Czechia': 'CZ', 'France': 'FR', 'Spain': 'ES', 'Germany': 'DE',
  'England': 'GB-ENG', 'Portugal': 'PT', 'Netherlands': 'NL', 'Belgium': 'BE',
  'Croatia': 'HR', 'Switzerland': 'CH', 'Austria': 'AT', 'Hungary': 'HU',
  'Greece': 'GR', 'Serbia': 'RS', 'Scotland': 'GB-SCT', 'Finland': 'FI',
  'Norway': 'NO', 'Iceland': 'IS', 'Ireland': 'IE', 'Slovenia': 'SI',
  'Montenegro': 'ME', 'Georgia': 'GE', 'Armenia': 'AM', 'Bulgaria': 'BG',
  'Argentina': 'AR', 'Brazil': 'BR', 'USA': 'US', 'Mexico': 'MX',
  'Morocco': 'MA', 'Senegal': 'SN', 'Nigeria': 'NG', 'Ghana': 'GH',
  'Egypt': 'EG', 'Algeria': 'DZ', 'Cameroon': 'CM', 'Japan': 'JP',
  'South Korea': 'KR', 'Australia': 'AU', 'Canada': 'CA', 'Colombia': 'CO',
  'Uruguay': 'UY', 'Ecuador': 'EC', 'Chile': 'CL', 'Peru': 'PE',
}

function FlagCircle({ team, size = 72 }) {
  const code = FLAG_CODES[team]
  const url = code ? `https://flagcdn.com/w80/${code.toLowerCase().replace('gb-', 'gb')}.png` : null
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      border: '3px solid rgba(255,255,255,0.18)',
      background: '#1a1a2e',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {url ? (
        <img src={url} alt={team} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ fontSize: size * 0.28, fontWeight: 900, color: 'rgba(255,255,255,0.5)', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.04em' }}>
          {(team || '?').slice(0, 3).toUpperCase()}
        </span>
      )}
    </div>
  )
}

function MatchupRow({ teamA, teamB, label, showConnector, winner }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
      {label && (
        <div style={{
          fontSize: 18, fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase', textAlign: 'center', marginBottom: 4,
        }}>
          {label}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <FlagCircle team={teamA} size={68} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <span style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 26, letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.45)',
          }}>VS</span>
        </div>
        <FlagCircle team={teamB} size={68} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4 }}>
        <span style={{ fontSize: 19, fontWeight: 700, color: winner === 'A' ? '#fff' : 'rgba(255,255,255,0.55)', letterSpacing: '0.04em', textTransform: 'uppercase', maxWidth: 140, textAlign: 'left' }}>
          {teamA || '—'}
        </span>
        <span style={{ fontSize: 19, fontWeight: 700, color: winner === 'B' ? '#fff' : 'rgba(255,255,255,0.55)', letterSpacing: '0.04em', textTransform: 'uppercase', maxWidth: 140, textAlign: 'right' }}>
          {teamB || '—'}
        </span>
      </div>
    </div>
  )
}

export default function TournamentCard({ d }) {
  const rounds = d.rounds || []
  const matchups = d.matchups || []

  return (
    <div
      id="preview-tournament"
      style={{
        width: 1080, height: 1080,
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Barlow Condensed',sans-serif",
        background: d.bgColor || '#060612',
        maxWidth: '100%',
      }}
    >
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 65%)',
        zIndex: 0,
      }} />

      {/* TEN BLOGS — top left */}
      <div style={{ position: 'absolute', top: 36, left: 50, zIndex: 3, fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
        TEN BLOGS
      </div>

      {/* Tournament name */}
      <div style={{
        position: 'absolute', top: 28, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 3,
      }}>
        {d.tournamentLabel && (
          <div style={{
            fontSize: 26, fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,215,0,0.7)',
            textTransform: 'uppercase', marginBottom: 2,
          }}>
            {d.tournamentLabel}
          </div>
        )}
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 70, letterSpacing: '0.05em', color: '#ffffff',
          lineHeight: 1,
        }}>
          {(d.title || 'TOURNAMENT').toUpperCase()}
        </div>
      </div>

      {/* Matchups grid */}
      <div style={{
        position: 'absolute',
        top: 160, left: 60, right: 60, bottom: 70,
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        justifyContent: 'flex-start',
      }}>
        {/* Separator */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 4 }} />

        {matchups.map((m, i) => (
          <div key={i}>
            <MatchupRow
              teamA={m.teamA}
              teamB={m.teamB}
              label={m.label}
              winner={m.winner}
            />
            {i < matchups.length - 1 && (
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginTop: 28 }} />
            )}
          </div>
        ))}

        {/* Date if provided */}
        {d.date && (
          <div style={{
            textAlign: 'center',
            fontSize: 24, fontWeight: 700,
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            marginTop: 8,
          }}>
            {d.date}
          </div>
        )}
      </div>

      {/* T-BLOGS branding */}
      <div style={{
        position: 'absolute', bottom: 24, left: 0, right: 0, zIndex: 10,
        display: 'flex', justifyContent: 'center',
        fontFamily: "'Bebas Neue',sans-serif",
        fontSize: 26, letterSpacing: '0.22em',
        color: 'rgba(255,255,255,0.22)',
      }}>
        T-BLOGS
      </div>
    </div>
  )
}

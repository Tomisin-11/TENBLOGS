/**
 * Color differentiation utilities.
 *
 * When home + away teams share similar kit colors (e.g. Man Utd vs Liverpool,
 * both red), we auto-pick a contrasting alternative so bars remain readable.
 */

/** Parse a hex color to { r, g, b } */
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0,2), 16),
    g: parseInt(h.slice(2,4), 16),
    b: parseInt(h.slice(4,6), 16),
  }
}

/** Perceived color distance (0–100 scale, 0 = identical) */
function colorDistance(hex1, hex2) {
  try {
    const a = hexToRgb(hex1)
    const b = hexToRgb(hex2)
    // Weighted euclidean — human eye is more sensitive to green
    const dr = (a.r - b.r) * 0.3
    const dg = (a.g - b.g) * 0.59
    const db = (a.b - b.b) * 0.11
    return Math.sqrt(dr*dr + dg*dg + db*db)
  } catch {
    return 100 // assume different if parse fails
  }
}

/**
 * Get a usable pair of colors that are visually distinct.
 *
 * Strategy:
 * 1. Try homeColor vs awayColor — if distinct enough, use them
 * 2. If too similar, try homeColor vs teamAwayKit
 * 3. If still too similar, force a contrasting fallback pair
 *
 * @param {string} homeColor    - selected home kit color
 * @param {string} awayColor    - selected away kit color
 * @param {string} teamHomeAlt  - team's alternate home kit (from TEAMS data)
 * @param {string} teamAwayAlt  - team's alternate away kit (from TEAMS data)
 * @returns {{ home: string, away: string }}
 */
export function resolveTeamColors(homeColor, awayColor, teamHomeAlt, teamAwayAlt) {
  const THRESHOLD = 40 // colors with distance < 40 look too similar

  // Try the selected colors first
  if (colorDistance(homeColor, awayColor) >= THRESHOLD) {
    return { home: homeColor, away: awayColor }
  }

  // Try swapping away to the team's alternate away kit
  if (teamAwayAlt && colorDistance(homeColor, teamAwayAlt) >= THRESHOLD) {
    return { home: homeColor, away: teamAwayAlt }
  }

  // Try swapping home to the team's alternate home kit
  if (teamHomeAlt && colorDistance(teamHomeAlt, awayColor) >= THRESHOLD) {
    return { home: teamHomeAlt, away: awayColor }
  }

  // Force fallback: keep home color, make away a strong contrast
  // Pick from a set of universally contrasting colors
  const fallbacks = ['#00B8D9','#36B37E','#FF991F','#6554C0','#FFAB00','#00C7E6','#57D9A3']
  for (const fb of fallbacks) {
    if (colorDistance(homeColor, fb) >= THRESHOLD) {
      return { home: homeColor, away: fb }
    }
  }

  // Last resort — if home is dark use white, else use black
  const { r,g,b } = hexToRgb(homeColor)
  const luminance = 0.299*r + 0.587*g + 0.114*b
  return { home: homeColor, away: luminance > 128 ? '#1a1a2e' : '#ffffff' }
}

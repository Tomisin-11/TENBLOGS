# Ten Blogs Studio v3

Sports content studio — React 18 + Vite 5 + Tailwind CSS 3.

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

## What's new in v3

- **60+ club logos** auto-load via football-data.org crests (no API key needed)
- **Team color pickers** — each team gets home/away kit color that applies across bars, timeline, and accents
- **Matchday Flyer** — pre-match poster with competition badge, team logos, optional player photos
- **Result Flyer** — full-time poster with background photo upload
- **Fixed download** — images are inlined to base64 before capture so logos appear in the PNG
- **Competition dropdown** — 15+ competitions with official badges

## Card Types

| Card | Key features |
|------|-------------|
| Player Rating | Photo, 12 stats, verdict badge, rating bar |
| Head to Head | Auto logos, color bars (home/away), form dots, meetings |
| Match Analytics | Auto logos, colored possession/stat bars, timeline |
| Prediction | Team logos, score pick, fan poll |
| Matchday Flyer | Poster-style, competition badge, player photos |
| Result Flyer | Full-time poster with background photo |

## Layout

- **Left panel (300px)** — form with team selectors, color pickers, stats
- **Right panel** — live card preview
- **Bottom bar** — Download PNG button (2× retina)

## Sidebar

- Desktop: `‹ ›` to collapse/expand
- Mobile: hamburger opens drawer

## Run in production

```bash
npm run build
npm run preview
```

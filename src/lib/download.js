import { toPng } from 'html-to-image'

/**
 * Downloads a card as a PNG.
 *
 * With all logos now served from /public/logos/ (local files),
 * html-to-image can capture them without any CORS issues.
 *
 * The only remaining issue is parent containers with overflow:hidden
 * clipping the capture. Fix: clone the card to a free-floating wrapper
 * on <body>, capture that, then remove it.
 */
export async function downloadCardAsPng(elementId, filename = 'tenblogs-card', scale = 2) {
  const node = document.getElementById(elementId)
  if (!node) { console.warn('[download] not found:', elementId); return }

  const rect  = node.getBoundingClientRect()
  const cardW = Math.round(rect.width)
  const cardH = Math.round(rect.height)

  if (cardW === 0 || cardH === 0) {
    alert('Card has zero size — scroll the card into view and try again.')
    return
  }

  // Free-floating off-screen wrapper, no parent overflow constraints
  const wrapper = document.createElement('div')
  Object.assign(wrapper.style, {
    position: 'fixed', top: '-99999px', left: '-99999px',
    width: cardW + 'px', height: cardH + 'px',
    overflow: 'visible', background: '#0d0d14',
    zIndex: '-9999', pointerEvents: 'none',
    transform: 'none', filter: 'none', opacity: '1',
  })

  const clone = node.cloneNode(true)
  Object.assign(clone.style, {
    position: 'static', width: cardW + 'px', maxWidth: 'none',
    margin: '0', outline: 'none', boxShadow: 'none', transform: 'none',
  })

  wrapper.appendChild(clone)
  document.body.appendChild(wrapper)

  // Brief paint delay
  await new Promise(r => setTimeout(r, 100))

  try {
    const dataUrl = await toPng(wrapper, {
      cacheBust: true,
      pixelRatio: scale,
      width: cardW,
      height: cardH,
      backgroundColor: '#0d0d14',
    })
    const a = document.createElement('a')
    a.download = `${filename}.png`
    a.href = dataUrl
    a.click()
  } catch (err) {
    console.error('[download] failed:', err)
    alert('Download failed — please try again.')
  } finally {
    document.body.removeChild(wrapper)
  }
}

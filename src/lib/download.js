import { toPng } from 'html-to-image'

// All full-res cards render at 1080px wide
const FULL_RES_CARDS = ['matchday', 'result', 'news', 'transfer', 'playerstats', 'tournament']

/**
 * Convert ANY image src (blob-URL, object-URL, or http) into a base64 data-URL
 * by drawing it on a canvas. This guarantees html-to-image can embed it on
 * the very first capture attempt.
 */
async function srcToDataUrl(src) {
  if (!src || src.startsWith('data:')) return src
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = img.naturalWidth  || img.width
      canvas.height = img.naturalHeight || img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      try {
        resolve(canvas.toDataURL('image/png'))
      } catch {
        resolve(src) // fallback to original if tainted
      }
    }
    img.onerror = () => resolve(src) // fallback
    img.src = src
  })
}

/**
 * Walk every <img> in the node and replace its src with an inlined data-URL.
 * This is the core fix for "background missing on first download".
 */
async function inlineAllImages(node) {
  const imgs = Array.from(node.querySelectorAll('img'))
  if (!imgs.length) return

  await Promise.all(imgs.map(async (img) => {
    const originalSrc = img.getAttribute('src') || img.src
    if (!originalSrc || originalSrc.startsWith('data:')) return
    const dataUrl = await srcToDataUrl(originalSrc)
    if (dataUrl && dataUrl !== originalSrc) {
      img.src = dataUrl
      // Wait for the browser to process the new src
      if (!img.complete || img.naturalWidth === 0) {
        await new Promise(res => {
          img.onload  = res
          img.onerror = res
          setTimeout(res, 500) // safety timeout
        })
      }
    }
  }))

  // Final settle — give browser a frame to repaint
  await new Promise(r => requestAnimationFrame(r))
  await new Promise(r => setTimeout(r, 60))
}

export async function downloadCardAsPng(elementId, filename = 'tenblogs-card', cardType = '') {
  const node = document.getElementById(elementId)
  if (!node) { console.warn('[download] not found:', elementId); return }

  // Let layout settle
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
  await new Promise(r => setTimeout(r, 120))

  // Inline all images — this makes the FIRST capture always work
  await inlineAllImages(node)

  const styleW = parseInt(node.style.width)  || 0
  const styleH = parseInt(node.style.height) || 0
  const rect   = node.getBoundingClientRect()
  const renderedW = Math.round(rect.width)
  const renderedH = Math.round(rect.height)

  if (renderedW === 0 || renderedH === 0) {
    alert('Card not visible — open the preview first, then download.')
    return
  }

  const isFullRes = FULL_RES_CARDS.includes(cardType)

  let captureW, captureH, pixelRatio
  if (isFullRes) {
    // Capture at true 1080px (or whatever the card's styled size is)
    captureW   = styleW  || renderedW
    captureH   = styleH  || renderedH
    pixelRatio = 1
  } else {
    // Stats cards: upscale 3× for retina quality
    captureW   = renderedW
    captureH   = renderedH
    pixelRatio = 3
  }

  const opts = {
    cacheBust:       true,
    pixelRatio,
    width:           captureW,
    height:          captureH,
    backgroundColor: '#0d0d14',
    style: {
      outline:   'none',
      boxShadow: 'none',
      maxWidth:  'none',
      transform: 'none',
    },
    skipFonts: false,
  }

  try {
    const dataUrl = await toPng(node, opts)

    const a    = document.createElement('a')
    a.download = `${filename}.png`
    a.href     = dataUrl
    a.click()
  } catch (err) {
    console.error('[download] failed:', err)
    alert('Download failed — please try again.')
  }
}

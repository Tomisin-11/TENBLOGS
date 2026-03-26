import { toPng } from 'html-to-image'

// Full-res cards already render at 1080px — no upscaling needed
const FULL_RES_CARDS = ['matchday', 'result']

/**
 * Preload ALL images inside node so html-to-image captures them on first attempt.
 * Fixes the "background missing on first download" bug for flyers.
 */
async function waitForImages(node) {
  const imgs = Array.from(node.querySelectorAll('img'))
  if (!imgs.length) return
  await Promise.all(imgs.map(img => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve()
    return new Promise(res => {
      img.onload  = res
      img.onerror = res
    })
  }))
  // Extra settle time after load events
  await new Promise(r => setTimeout(r, 100))
}

export async function downloadCardAsPng(elementId, filename = 'tenblogs-card', cardType = '') {
  const node = document.getElementById(elementId)
  if (!node) { console.warn('[download] not found:', elementId); return }

  // Wait for two animation frames + settle
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
  await new Promise(r => setTimeout(r, 150))

  // Preload all images (fixes flyer bg missing on first try)
  await waitForImages(node)

  // Get the card's INTRINSIC pixel dimensions from inline style
  // Cards set explicit width/height in style, use those for capture
  const styleW = parseInt(node.style.width) || 0
  const styleH = parseInt(node.style.height) || 0

  const rect = node.getBoundingClientRect()
  const renderedW = Math.round(rect.width)
  const renderedH = Math.round(rect.height)

  if (renderedW === 0 || renderedH === 0) {
    alert('Card not visible — open the preview first, then download.')
    return
  }

  const isFullRes = FULL_RES_CARDS.includes(cardType)

  // For full-res cards (1080px): capture at natural size, pixelRatio=1
  // For stats cards (460px): use styleW to get true size, scale to ~1380px
  let captureW, captureH, pixelRatio

  if (isFullRes) {
    // Flyers render at 1080px wide - capture exactly that
    captureW = styleW || renderedW
    captureH = styleH || renderedH
    pixelRatio = 1
  } else {
    // Stats cards: capture at rendered size but upscale 3x → ~1380px
    captureW = renderedW
    captureH = renderedH
    pixelRatio = 3
  }

  const opts = {
    cacheBust:   true,
    pixelRatio,
    width:       captureW,
    height:      captureH,
    backgroundColor: '#0d0d14',
    style: {
      outline:   'none',
      boxShadow: 'none',
      maxWidth:  'none',
      transform: 'none',  // strip any CSS scale transform
    },
    includeQueryParams: true,
    skipFonts: false,
  }

  try {
    // Pass 1: warm up font + image cache (result discarded)
    await toPng(node, opts)
    await new Promise(r => setTimeout(r, 80))

    // Pass 2: full quality capture
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

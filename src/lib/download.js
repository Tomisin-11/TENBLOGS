import { toPng } from 'html-to-image'

/**
 * Downloads the card as a maximum-quality PNG.
 *
 * pixelRatio: 3  →  a 460px card exports at 1380px wide (3× retina)
 * pixelRatio: 4  →  1840px wide — Instagram-ready at full resolution
 *
 * We run toPng TWICE — the first pass forces the browser to cache all
 * embedded resources (fonts, SVG logos); the second pass produces the
 * clean, fully-rendered output. This is a known html-to-image trick that
 * eliminates blurry text and missing glyphs on first capture.
 */
export async function downloadCardAsPng(elementId, filename = 'tenblogs-card') {
  const node = document.getElementById(elementId)
  if (!node) { console.warn('[download] not found:', elementId); return }

  // Wait for modal to fully paint
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
  await new Promise(r => setTimeout(r, 120))

  const rect = node.getBoundingClientRect()
  const w    = Math.round(rect.width)
  const h    = Math.round(rect.height)

  if (w === 0 || h === 0) {
    alert('Card not visible — open the preview first, then download.')
    return
  }

  const opts = {
    cacheBust:       true,
    pixelRatio:      4,          // 4× = ~1840px wide for a 460px card — maximum sharpness
    width:           w,
    height:          h,
    backgroundColor: '#0d0d14',
    style: {
      outline:   'none',
      boxShadow: 'none',
      maxWidth:  'none',
    },
    // Ensure fonts are fully embedded
    includeQueryParams: true,
    skipFonts: false,
  }

  try {
    // First pass — warms up font/SVG cache (result discarded)
    await toPng(node, opts)
    // Brief pause for browser to settle
    await new Promise(r => setTimeout(r, 50))
    // Second pass — full quality render
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

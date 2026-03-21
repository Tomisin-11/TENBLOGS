import { toPng } from 'html-to-image'

export async function downloadCardAsPng(elementId, filename = 'tenblogs-card', scale = 2) {
  const node = document.getElementById(elementId)
  if (!node) { console.warn('[download] not found:', elementId); return }

  // Wait for the modal to finish painting
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
  await new Promise(r => setTimeout(r, 60))

  const rect = node.getBoundingClientRect()
  const w    = Math.round(rect.width)
  const h    = Math.round(rect.height)

  if (w === 0 || h === 0) {
    alert('Card not visible — open the preview first, then download.')
    return
  }

  try {
    const dataUrl = await toPng(node, {
      cacheBust:       true,
      pixelRatio:      scale,
      width:           w,
      height:          h,
      backgroundColor: '#0d0d14',
      style: { outline: 'none', boxShadow: 'none', maxWidth: 'none' },
    })

    const a    = document.createElement('a')
    a.download = `${filename}.png`
    a.href     = dataUrl
    a.click()
  } catch (err) {
    console.error('[download] failed:', err)
    alert('Download failed — please try again.')
  }
}

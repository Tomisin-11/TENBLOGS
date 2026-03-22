import { toPng } from 'html-to-image'

export async function downloadCardAsPng(elementId, filename = 'tenblogs-card') {
  const node = document.getElementById(elementId)
  if (!node) { console.warn('[download] not found:', elementId); return }
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
    cacheBust:   true,
    pixelRatio:  1,
    width:       w,
    height:      h,
    backgroundColor: '#0d0d14',
    style: { outline: 'none', boxShadow: 'none', maxWidth: 'none' },
    includeQueryParams: true,
    skipFonts: false,
  }
  try {
    await toPng(node, opts)
    await new Promise(r => setTimeout(r, 50))
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

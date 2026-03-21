/**
 * Logo cache: converts external SVG/PNG logo URLs to base64 data URLs.
 * This solves cross-origin capture issues in html-to-image — once a logo
 * is a data URL, the download capture works perfectly with no CORS errors.
 */

const cache = new Map()

export async function fetchLogoAsDataUrl(url) {
  if (!url) return null
  if (cache.has(url)) return cache.get(url)

  const promise = (async () => {
    try {
      // Try with CORS first
      const res = await fetch(url, {
        mode: 'cors',
        cache: 'force-cache',
        headers: { Accept: 'image/svg+xml,image/png,image/*' },
      })
      if (!res.ok) return null
      const blob = await res.blob()
      return await blobToDataUrl(blob)
    } catch {
      // If CORS fails, try no-cors (gets opaque response — won't give us data)
      // Fall back to null so the card shows a text placeholder
      return null
    }
  })()

  cache.set(url, promise)
  return promise
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/** Prefetch multiple URLs in parallel */
export async function prefetchLogos(urls) {
  return Promise.all(urls.filter(Boolean).map(fetchLogoAsDataUrl))
}

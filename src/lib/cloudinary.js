/**
 * Cloudinary unsigned upload helper.
 * Uploads logo images for user-created teams/competitions.
 *
 * Setup (no backend needed):
 *  1. Create a free Cloudinary account → https://cloudinary.com
 *  2. Settings → Upload → Add an "Unsigned" upload preset (e.g. "tenblogs_logos")
 *  3. Set these in a .env file (or window globals for quick testing):
 *       VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
 *       VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-name
 */

const getKey = (envKey, windowKey) =>
  (typeof window !== 'undefined' && window[windowKey]) || import.meta.env[envKey] || ''

const CLOUD_NAME     = () => getKey('VITE_CLOUDINARY_CLOUD_NAME', '__TB_CLOUDINARY_CLOUD__')
const UPLOAD_PRESET  = () => getKey('VITE_CLOUDINARY_UPLOAD_PRESET', '__TB_CLOUDINARY_PRESET__')

export function isCloudinaryConfigured() {
  return !!(CLOUD_NAME() && UPLOAD_PRESET())
}

/**
 * Upload a File/Blob to Cloudinary and return the secure (https) URL.
 * Falls back to a local base64 data-URL if Cloudinary isn't configured,
 * so the app still works during local dev/testing — just won't persist
 * across devices.
 */
export async function uploadLogo(file) {
  if (!file) return null

  if (!isCloudinaryConfigured()) {
    console.warn('[cloudinary] not configured — falling back to local base64 (see src/lib/cloudinary.js)')
    return fileToDataUrl(file)
  }

  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET())
  // NOTE: no `folder` param here on purpose — newer Cloudinary accounts
  // default to "Dynamic Folder Mode", which rejects a raw folder param on
  // unsigned uploads unless the preset explicitly allows it, causing a
  // 400 Bad Request. If you want uploads organized into a folder, set an
  // "Asset Folder" on the upload preset itself in the Cloudinary dashboard
  // instead of passing it here.

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME()}/image/upload`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const body = await res.json()
      message = body?.error?.message || message
    } catch {
      // response wasn't JSON — fall back to status text
      message = res.statusText || message
    }
    throw new Error(`Cloudinary upload failed: ${message}`)
  }

  const data = await res.json()
  return data.secure_url
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

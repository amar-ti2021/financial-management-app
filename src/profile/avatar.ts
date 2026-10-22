import { supabase } from '@/lib/supabase'

// Public bucket from the create_avatars_bucket migration; each user writes only to <user id>/.
const avatars = () => supabase.storage.from('avatars')

// Avatars show at 80px at most, so 512px stays sharp on 3× screens and keeps files ~50 KB.
const SIZE = 512

/** Larger photos are refused before decoding, to spare the phone's memory. */
export const MAX_PHOTO_BYTES = 20 * 1024 * 1024

/**
 * Crops a picked photo to its centre square and scales it to 512×512 JPEG. Re-encoding also
 * strips EXIF data, such as the GPS location phones store in photos.
 */
export async function prepareAvatar(file: Blob) {
  const image = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const side = Math.min(image.width, image.height)
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas 2D is not available')
  // JPEG has no transparency: transparent PNGs get a white background instead of black.
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, SIZE, SIZE)
  context.drawImage(image, (image.width - side) / 2, (image.height - side) / 2, side, side, 0, 0, SIZE, SIZE)
  image.close()
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the photo'))), 'image/jpeg', 0.85)
  })
}

/**
 * Uploads a prepared photo under a new random name and returns its public URL. New names mean
 * no stale caches; the default 1-hour cache also keeps a removed photo from lingering long.
 */
export async function uploadAvatar(userId: string, photo: Blob) {
  const path = `${userId}/${crypto.randomUUID()}.jpg`
  const { error } = await avatars().upload(path, photo, { contentType: 'image/jpeg' })
  if (error) throw error
  return avatars().getPublicUrl(path).data.publicUrl
}

/**
 * Deletes a photo uploaded by `uploadAvatar`; other URLs (e.g. a Google photo) are left alone.
 * Best effort: a failure only leaves an unused file behind, so it is not reported.
 */
export async function removeAvatar(url: string) {
  const prefix = avatars().getPublicUrl('').data.publicUrl
  if (url.startsWith(prefix)) await avatars().remove([url.slice(prefix.length)])
}

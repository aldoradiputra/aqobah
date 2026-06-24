import { supabase } from './supabase'
import type { ActivityAttachment } from './types'

// File attachments for activity-feed comments. Bytes live in the private
// `activity-attachments` Storage bucket (supabase/migrations/014); rows in
// activity_events reference them via metadata.attachments[]. Files are served
// to staff through short-lived signed URLs (never public).

const BUCKET = 'activity-attachments'
export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024 // 10 MB (matches the bucket's server-side cap)

// Keep object keys readable but filesystem/URL-safe; collapse odd chars, cap length.
function safeName(name: string): string {
  const cleaned = name.replace(/[^\w.\-]+/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '')
  return (cleaned || 'file').slice(-120)
}

// Upload each file under `${entityType}/${entityId}/<uuid>-<name>` and return the
// metadata to persist on the comment. Throws on the first oversize/failed file.
export async function uploadActivityAttachments(
  entityType: string,
  entityId: string,
  files: File[],
): Promise<ActivityAttachment[]> {
  const out: ActivityAttachment[] = []
  for (const file of files) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      throw new Error(`"${file.name}" melebihi batas 10 MB.`)
    }
    const path = `${entityType}/${entityId}/${crypto.randomUUID()}-${safeName(file.name)}`
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    })
    if (error) throw error
    out.push({ path, name: file.name, size: file.size, type: file.type })
  }
  return out
}

// Mint a 60-second signed URL for viewing/downloading a stored attachment.
export async function signedAttachmentUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60)
  if (error) throw error
  return data.signedUrl
}

// Treat an attachment as an image (for inline thumbnails) by MIME first, name second.
export function isImageAttachment(att: { type?: string; name: string }): boolean {
  if (att.type) return att.type.startsWith('image/')
  return /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i.test(att.name)
}

// Human-readable file size, e.g. "843 KB" / "2,1 MB".
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toLocaleString('id-ID', { maximumFractionDigits: 1 })} MB`
}

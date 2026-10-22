// Client-side checks so obvious mistakes are explained before a round trip to Supabase.
// Each returns an Indonesian message, or undefined when the value is fine.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const PASSWORD_MIN_LENGTH = 8

export function nameError(value: string) {
  const name = value.trim()
  if (!name) return 'Masukkan nama lengkapmu.'
  if (name.length > 100) return 'Nama maksimal 100 karakter.'
}

export function emailError(value: string) {
  const email = value.trim()
  if (!email) return 'Masukkan alamat email.'
  if (!EMAIL.test(email)) return 'Format email belum benar, contoh: nama@email.com.'
}

/** `isNew` adds the length rules for choosing a password (sign-up), not for signing in. */
export function passwordError(value: string, { isNew = false } = {}) {
  if (!value) return 'Masukkan kata sandi.'
  if (isNew && value.length < PASSWORD_MIN_LENGTH) return `Kata sandi minimal ${PASSWORD_MIN_LENGTH} karakter.`
  // Supabase hashes passwords with bcrypt, which only uses the first 72 bytes.
  if (isNew && new TextEncoder().encode(value).length > 72) return 'Kata sandi terlalu panjang (maksimal 72 karakter).'
}

/**
 * Reads a phone number as typed (`0812-3456-7890`, `62812…`, `+62 812…`) into E.164
 * (`+6281234567890`), the format `profiles.phone` stores. Undefined if it isn't one.
 */
export function parsePhone(value: string) {
  const digits = value.replace(/[\s().-]/g, '')
  const e164 = digits.startsWith('+')
    ? digits
    : digits.startsWith('0')
      ? `+62${digits.slice(1)}`
      : digits.startsWith('62')
        ? `+${digits}`
        : `+62${digits}`
  return /^\+[1-9][0-9]{7,14}$/.test(e164) ? e164 : undefined
}

/** Optional field: empty is fine. */
export function phoneError(value: string) {
  if (value.trim() && !parsePhone(value)) return 'Nomor HP belum benar, contoh: 0812 3456 7890.'
}

export function passwordConfirmationError(password: string, confirmation: string) {
  if (!confirmation) return 'Ketik ulang kata sandi barumu.'
  if (confirmation !== password) return 'Kata sandi tidak sama.'
}

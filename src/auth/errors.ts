import { isAuthImplicitGrantRedirectError, isAuthRetryableFetchError, type AuthError } from '@supabase/supabase-js'

// Supabase Auth error codes → messages users can act on.
const messages: Record<string, string> = {
  invalid_credentials: 'Email atau kata sandi salah.',
  email_not_confirmed: 'Email belum dikonfirmasi. Buka tautan yang kami kirim ke emailmu.',
  user_already_exists: 'Email ini sudah terdaftar. Silakan masuk.',
  email_exists: 'Email ini sudah terdaftar. Silakan masuk.',
  weak_password: 'Kata sandi terlalu mudah ditebak. Gabungkan huruf, angka, dan simbol.',
  same_password: 'Kata sandi baru harus berbeda dari kata sandi lama.',
  reauthentication_needed: 'Demi keamanan, keluar lalu masuk lagi sebelum mengganti kata sandi.',
  over_email_send_rate_limit: 'Terlalu banyak email dikirim. Tunggu beberapa menit, lalu coba lagi.',
  over_request_rate_limit: 'Terlalu banyak percobaan. Tunggu sebentar, lalu coba lagi.',
  signup_disabled: 'Pendaftaran akun baru sedang ditutup.',
  email_address_invalid: 'Alamat email tidak valid.',
  // Supabase's built-in mailer only delivers to the project's team members.
  email_address_not_authorized: 'Email konfirmasi belum bisa dikirim ke alamat ini. Server email aplikasi belum diatur.',
  otp_expired: 'Tautan sudah kedaluwarsa. Silakan minta tautan baru.',
  provider_disabled: 'Metode masuk ini belum diaktifkan.',
  validation_failed: 'Data yang diisi belum lengkap atau tidak valid.',
}

export const EMAIL_TAKEN_MESSAGE = messages.email_exists

export function authErrorMessage(error: AuthError) {
  if (isAuthRetryableFetchError(error)) return 'Tidak bisa terhubung. Periksa koneksi internetmu, lalu coba lagi.'
  return (error.code && messages[error.code]) || 'Terjadi kesalahan. Coba lagi sebentar lagi.'
}

/** Errors that come back in the redirect URL (Google cancelled, expired email link, …). */
export function callbackErrorMessage(error: AuthError) {
  if (isAuthImplicitGrantRedirectError(error)) {
    const { error: kind, code } = error.details ?? { error: '', code: '' }
    if (code === 'otp_expired') return 'Tautan konfirmasi sudah kedaluwarsa atau sudah dipakai. Silakan masuk, atau daftar ulang untuk mendapat tautan baru.'
    if (kind === 'access_denied') return 'Masuk dengan Google dibatalkan.'
  }
  return authErrorMessage(error)
}

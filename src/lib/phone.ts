export const EGYPT_COUNTRY_CODE = '20'
export const LOCAL_PHONE_LENGTH = 10

/** Keep digits only, capped at Egyptian local length (e.g. 1159100996). */
export function sanitizeLocalPhone(value: string): string {
  return value.replace(/\D/g, '').slice(0, LOCAL_PHONE_LENGTH)
}

/** Egyptian mobile local number: exactly 10 digits starting with 1. */
export function isValidLocalPhone(value: string): boolean {
  return /^1\d{9}$/.test(value)
}

/** Full international number, e.g. +201159100996 */
export function toFullPhone(localPhone: string): string {
  return `+${EGYPT_COUNTRY_CODE}${localPhone}`
}

/** Payload encoded in the QR so scanners can open dialer. */
export function toTelUri(localPhone: string): string {
  return `tel:${toFullPhone(localPhone)}`
}

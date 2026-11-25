import { ISRAEL_TZ } from '../constants'

const at = (d) => new Date(`${d}T12:00:00Z`)

export const shortDate = (d) =>
  at(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })

export const longDate = (d) =>
  at(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export const checkedTime = (iso) =>
  new Date(iso).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: ISRAEL_TZ,
  })

export const joinNames = (names) =>
  names.length < 2 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`

// Text colour that stays readable on a party colour (avatars). Party colours are never text.
export function inkOn(hex) {
  const n = parseInt(hex.slice(1), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const L = 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]
  return (1.05) / (L + 0.05) >= 4.5 ? '#FFFFFF' : '#0D1530'
}

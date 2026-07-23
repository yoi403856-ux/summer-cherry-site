import { cookies } from 'next/headers'
import { T } from './dict'

// Current language, read from the `lang` cookie (server components only).
export function getLocale() {
  const v = cookies().get('lang')?.value
  return v === 'en' ? 'en' : 'ru'
}

// Server-side dictionary for the current locale.
export function getDict() {
  return T[getLocale()]
}

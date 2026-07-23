'use client'

import { createContext, useContext } from 'react'
import { T } from '@/lib/dict'

const LocaleContext = createContext('ru')

// Seeded with the server-read locale; updates via router.refresh() when the
// language cookie changes (the layout re-reads it and passes a new prop).
export function LocaleProvider({ locale, children }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

export function useDict() {
  return T[useLocale()]
}

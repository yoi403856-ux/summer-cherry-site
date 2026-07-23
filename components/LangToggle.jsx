'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from './LocaleProvider'

// RU / EN switch. Writes the `lang` cookie and refreshes server components,
// which re-render the whole site (and CMS content) in the chosen language.
export default function LangToggle({ className = '' }) {
  const locale = useLocale()
  const router = useRouter()

  const set = (l) => {
    if (l === locale) return
    document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`
    router.refresh()
  }

  return (
    <div className={`flex items-center gap-1 font-sans text-[12px] tracking-[0.16em] ${className}`}>
      <button
        onClick={() => set('ru')}
        className={`px-1.5 py-0.5 uppercase transition-colors ${locale === 'ru' ? 'text-ink' : 'text-ink/40 hover:text-ink/70'}`}
        aria-label="Русский"
      >
        RU
      </button>
      <span className="text-ink/25">/</span>
      <button
        onClick={() => set('en')}
        className={`px-1.5 py-0.5 uppercase transition-colors ${locale === 'en' ? 'text-ink' : 'text-ink/40 hover:text-ink/70'}`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}

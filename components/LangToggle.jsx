'use client'

import { usePathname } from 'next/navigation'
import { useLocale } from './LocaleProvider'

/*
  RU / EN switch. Navigates to the locale-prefixed URL (/en/...) rather than
  just swapping a cookie — each language needs its own crawlable address
  (see middleware.js + lib/i18n.js for why).

  Uses a plain <a> instead of next/link: root layout and the (site) layout
  wrap every route with no distinct segment per locale, so Next's client-side
  router treats them as unchanged across a same-tree navigation and won't
  re-run their locale detection — the address bar updates but the rendered
  language doesn't, until a real page load happens. A plain anchor forces
  that real load every time.
*/
export default function LangToggle({ className = '' }) {
  const locale = useLocale()
  const pathname = usePathname() || '/'
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  const bare = isEn ? pathname.slice(3) || '/' : pathname
  const ruHref = bare
  const enHref = bare === '/' ? '/en' : `/en${bare}`

  return (
    <div className={`flex items-center gap-1 font-sans text-[12px] tracking-[0.16em] ${className}`}>
      <a
        href={ruHref}
        className={`px-1.5 py-0.5 uppercase transition-colors ${locale === 'ru' ? 'text-ink' : 'text-ink/40 hover:text-ink/70'}`}
        aria-label="Русский"
      >
        RU
      </a>
      <span className="text-ink/25">/</span>
      <a
        href={enHref}
        className={`px-1.5 py-0.5 uppercase transition-colors ${locale === 'en' ? 'text-ink' : 'text-ink/40 hover:text-ink/70'}`}
        aria-label="English"
      >
        EN
      </a>
    </div>
  )
}

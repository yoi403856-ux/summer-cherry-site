'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from './LocaleProvider'

// RU / EN switch. Navigates to the locale-prefixed URL (/en/...) rather than
// just swapping a cookie — each language needs its own crawlable address
// (see middleware.js + lib/i18n.js for why).
export default function LangToggle({ className = '' }) {
  const locale = useLocale()
  const pathname = usePathname() || '/'
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  const bare = isEn ? pathname.slice(3) || '/' : pathname
  const ruHref = bare
  const enHref = bare === '/' ? '/en' : `/en${bare}`

  return (
    <div className={`flex items-center gap-1 font-sans text-[12px] tracking-[0.16em] ${className}`}>
      <Link
        href={ruHref}
        className={`px-1.5 py-0.5 uppercase transition-colors ${locale === 'ru' ? 'text-ink' : 'text-ink/40 hover:text-ink/70'}`}
        aria-label="Русский"
      >
        RU
      </Link>
      <span className="text-ink/25">/</span>
      <Link
        href={enHref}
        className={`px-1.5 py-0.5 uppercase transition-colors ${locale === 'en' ? 'text-ink' : 'text-ink/40 hover:text-ink/70'}`}
        aria-label="English"
      >
        EN
      </Link>
    </div>
  )
}

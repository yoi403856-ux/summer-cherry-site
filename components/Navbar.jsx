'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ContactLink from './ContactLink'
import LangToggle from './LangToggle'
import { useDict, useLocale } from './LocaleProvider'
import { pick } from '@/lib/dict'
import { withLocale } from '@/lib/locale'

const links = [
  { href: '/', key: 'home', settingsKey: 'navHome' },
  { href: '/about', key: 'about', settingsKey: 'navAbout' },
  { href: '/kittens', key: 'kittens', settingsKey: 'navKittens' },
  { href: '/studs', key: 'studs', settingsKey: 'navStuds' },
]

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const d = useDict()

  const navLabel = (key, settingsKey) =>
    pick(locale, settings?.[settingsKey], settings?.[`${settingsKey}En`]) || d.nav[key]
  const contactLabel = pick(locale, settings?.navContact, settings?.navContactEn) || d.nav.contact

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // strip the /en prefix before comparing against the unprefixed nav hrefs
  const bare = pathname === '/en' ? '/' : pathname?.startsWith('/en/') ? pathname.slice(3) : pathname
  const isActive = (href) => (href === '/' ? bare === '/' : bare?.startsWith(href))

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-parchment/90 backdrop-blur-md border-b border-ink/10 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href={withLocale('/', locale)} className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
            <span className="font-display text-[19px] sm:text-[22px] font-semibold tracking-[0.22em] text-ink">
              SUMMER&nbsp;CHERRY
            </span>{' '}
            <span className="mt-1 font-sans text-[9px] sm:text-[10px] tracking-[0.5em] text-golddim">
              MAINE&nbsp;COON&nbsp;CATTERY
            </span>
          </Link>

          <nav className="hidden items-center gap-9 xl:flex">
            {links.map((l) => (
              <span key={l.href}>
                <Link
                  href={withLocale(l.href, locale)}
                  className={`link-underline font-sans text-[13px] tracking-[0.24em] uppercase transition-colors duration-300 ${
                    isActive(l.href) ? 'text-golddim' : 'text-ink/75 hover:text-ink'
                  }`}
                >
                  {navLabel(l.key, l.settingsKey)}
                </Link>{' '}
              </span>
            ))}
            <ContactLink className="ml-2 border border-ink/25 px-5 py-2.5 font-sans text-[12px] uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-ink hover:text-parchment">
              {contactLabel}
            </ContactLink>
            <LangToggle className="ml-1" />
          </nav>

          <div className="flex items-center gap-4 xl:hidden">
            <LangToggle />
            <button
              className="text-ink"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-parchment xl:hidden"
          >
            <div className="mt-28 flex flex-col items-center gap-8 px-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                >
                  <Link
                    href={withLocale(l.href, locale)}
                    onClick={() => setOpen(false)}
                    className={`font-serif text-3xl ${isActive(l.href) ? 'text-golddim italic' : 'text-ink'}`}
                  >
                    {navLabel(l.key, l.settingsKey)}
                  </Link>{' '}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

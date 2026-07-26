import Link from 'next/link'
import { Phone, Facebook } from 'lucide-react'
import { PineMark } from './ui'
import { WhatsApp, Vk } from './icons'
import { T, pick } from '@/lib/dict'
import { withLocale } from '@/lib/locale'

const DEFAULTS = {
  phone: '+7 911 732-58-02',
  whatsapp: 'https://wa.me/79117325802',
  facebook: 'https://www.facebook.com/share/19UAQCUcGF/?mibextid=wwXIfr',
  vk: 'https://vk.ru/summercherryspb',
}

export default function Footer({ settings, locale = 'ru' }) {
  const d = T[locale].footer
  const nav = T[locale].nav
  const blurb = pick(locale, settings?.footerBlurb, settings?.footerBlurbEn) || d.blurb
  const navLabel = (key, settingsKey) => pick(locale, settings?.[settingsKey], settings?.[`${settingsKey}En`]) || nav[key]
  const phone = settings?.phone || DEFAULTS.phone
  const tel = `tel:${(settings?.phone || DEFAULTS.phone).replace(/[^\d+]/g, '')}`
  const whatsapp = settings?.whatsapp || DEFAULTS.whatsapp
  const facebook = settings?.facebook || DEFAULTS.facebook
  const vk = settings?.vk || DEFAULTS.vk

  const socials = [
    { icon: Facebook, label: 'Facebook', href: facebook },
    { icon: Vk, label: 'VK', href: vk },
    { icon: WhatsApp, label: 'WhatsApp', href: whatsapp },
  ]

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink/85 backdrop-blur-md text-birch">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <PineMark className="w-6 h-6 text-gold" />
              <span className="font-display text-2xl tracking-[0.2em]">SUMMER CHERRY</span>
            </div>
            <p className="mt-6 max-w-sm font-serif text-xl italic leading-relaxed text-birch/80">{blurb}</p>
            <div className="mt-8 flex gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center border border-birch/25 text-birch/80 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Icon size={18} />
                </a>
              ))}
              <a
                href={tel}
                aria-label={phone}
                className="flex h-11 w-11 items-center justify-center border border-birch/25 text-birch/80 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-gold">{d.sections}</h4>
            <ul className="mt-6 space-y-3 font-sans text-sm tracking-[0.12em] text-birch/75">
              {[
                { href: '/', label: navLabel('home', 'navHome') },
                { href: '/about', label: navLabel('about', 'navAbout') },
                { href: '/kittens', label: navLabel('kittens', 'navKittens') },
                { href: '/studs', label: navLabel('studs', 'navStuds') },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={withLocale(l.href, locale)} className="link-underline transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-gold">{d.contacts}</h4>
            <ul className="mt-6 space-y-4 font-sans text-sm tracking-[0.08em] text-birch/75">
              <li>
                <a href={tel} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Phone size={16} className="text-gold" /> {phone}
                </a>
              </li>
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <WhatsApp size={16} className="text-gold" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Facebook size={16} className="text-gold" /> Facebook
                </a>
              </li>
              <li>
                <a href={vk} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Vk size={16} className="text-gold" /> VK
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-birch/15 pt-8 text-[11px] tracking-[0.2em] text-birch/45 sm:flex-row">
          <span>© {new Date().getFullYear()} SUMMER CHERRY · {d.rights}</span>
          <span className="uppercase">{d.standard}</span>
        </div>
      </div>
    </footer>
  )
}

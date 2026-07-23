import Link from 'next/link'
import { Phone, Facebook } from 'lucide-react'
import { PineMark } from './ui'
import { T } from '@/lib/dict'

const DEFAULTS = {
  phone: '+7 911 732-58-02',
  whatsapp: 'https://wa.me/79117325802',
  facebook: 'https://www.facebook.com/share/19UAQCUcGF/?mibextid=wwXIfr',
  vk: 'https://vk.ru/summercherryspb',
}

function WhatsApp({ size = 18, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function Vk({ size = 18, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M.53.53C0 1.06 0 1.92 0 3.63v16.74c0 1.71 0 2.57.53 3.1S1.92 24 3.63 24h16.74c1.71 0 2.57 0 3.1-.53s.53-1.39.53-3.1V3.63c0-1.71 0-2.57-.53-3.1S22.08 0 20.37 0H3.63C1.92 0 1.06 0 .53.53Zm3.75 7.13h2.67c.09 4.69 2.17 6.69 3.81 7.1V7.66h2.51v3.86c1.62-.17 3.33-2.02 3.9-3.86h2.51c-.44 2.27-2.29 4.12-3.6 4.88 1.31.62 3.42 2.23 4.22 5.04h-2.76c-.63-1.95-2.19-3.46-4.27-3.66v3.66h-.3c-4.98 0-7.82-3.42-7.94-9.11Z" />
    </svg>
  )
}

export default function Footer({ settings, locale = 'ru' }) {
  const d = T[locale].footer
  const nav = T[locale].nav
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
            <p className="mt-6 max-w-sm font-serif text-xl italic leading-relaxed text-birch/80">{d.blurb}</p>
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
                { href: '/', label: nav.home },
                { href: '/about', label: nav.about },
                { href: '/kittens', label: nav.kittens },
                { href: '/studs', label: nav.studs },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline transition-colors hover:text-gold">
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

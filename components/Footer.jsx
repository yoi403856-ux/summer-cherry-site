import Link from 'next/link'
import { Phone, Send } from 'lucide-react'
import { PineMark } from './ui'

const DEFAULTS = {
  phone: '+7 911 732-58-02',
  tel: 'tel:+79117325802',
  telegram: 'https://t.me/+79117325802',
  whatsapp: 'https://wa.me/79117325802',
}

function WhatsApp({ size = 18, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function Footer({ settings }) {
  const phone = settings?.phone || DEFAULTS.phone
  const tel = `tel:${(settings?.phone || DEFAULTS.phone).replace(/[^\d+]/g, '')}`
  const telegram = settings?.telegram || DEFAULTS.telegram
  const whatsapp = settings?.whatsapp || DEFAULTS.whatsapp

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
            <p className="mt-6 max-w-sm font-serif text-xl italic leading-relaxed text-birch/80">
              Питомник мейн-кунов родом из туманного северного леса. Крупные,
              статные, с характером — и всегда с родословной.
            </p>
            <div className="mt-8 flex gap-4">
              {[
                { icon: Send, label: 'Telegram', href: telegram, ext: true },
                { icon: WhatsApp, label: 'WhatsApp', href: whatsapp, ext: true },
                { icon: Phone, label: 'Телефон', href: tel, ext: false },
              ].map(({ icon: Icon, label, href, ext }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex h-11 w-11 items-center justify-center border border-birch/25 text-birch/80 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-gold">Разделы</h4>
            <ul className="mt-6 space-y-3 font-sans text-sm tracking-[0.12em] text-birch/75">
              {[
                { href: '/', label: 'Главная' },
                { href: '/about', label: 'О нас' },
                { href: '/kittens', label: 'Котята' },
                { href: '/studs', label: 'Производители' },
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
            <h4 className="eyebrow text-gold">Контакты</h4>
            <ul className="mt-6 space-y-4 font-sans text-sm tracking-[0.08em] text-birch/75">
              <li>
                <a href={tel} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Phone size={16} className="text-gold" /> {phone}
                </a>
              </li>
              <li>
                <a href={telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Send size={16} className="text-gold" /> Telegram
                </a>
              </li>
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <WhatsApp size={16} className="text-gold" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-birch/15 pt-8 text-[11px] tracking-[0.2em] text-birch/45 sm:flex-row">
          <span>© {new Date().getFullYear()} SUMMER CHERRY · Питомник мейн-кунов</span>
          <span className="uppercase">Разведение по стандарту WCF</span>
        </div>
      </div>
    </footer>
  )
}

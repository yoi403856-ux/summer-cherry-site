import { urlForImageCrop } from '@/sanity/image'
import { resolveContacts } from './contacts'
import { siteUrl } from './site'

// Social-preview image (og:image / Twitter card). Falls back to a branded
// default (the forest background) until an editor uploads their own in
// Настройки сайта → «Превью для соцсетей».
export function resolveOgImage(settings) {
  const custom = settings?.ogImage ? urlForImageCrop(settings.ogImage, 1200, 630) : null
  return custom || `${siteUrl}/og-default.jpg`
}

// Organization structured data (schema.org JSON-LD) — no physical address is
// asserted (this is a home cattery, not a public storefront), so
// `Organization` is used rather than `LocalBusiness`, which expects one.
export function organizationJsonLd(settings) {
  const contacts = resolveContacts(settings)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Summer Cherry',
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: resolveOgImage(settings),
    telephone: contacts.phone,
    sameAs: [contacts.facebook, contacts.vk, contacts.whatsapp].filter(Boolean),
  }
}

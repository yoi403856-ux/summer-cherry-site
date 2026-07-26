import SiteBackground from '@/components/SiteBackground'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LocaleProvider } from '@/components/LocaleProvider'
import { getSettings } from '@/lib/api'
import { getLocale } from '@/lib/i18n'
import { urlForImage } from '@/sanity/image'
import { resolveOgImage, organizationJsonLd } from '@/lib/seo'

// og:image applies to every site page unless a page's own generateMetadata
// overrides `openGraph.images` — Next.js merges layout + page metadata, so
// this default only needs to live here once.
export async function generateMetadata() {
  const settings = await getSettings()
  const image = resolveOgImage(settings)
  return { openGraph: { images: [image] }, twitter: { card: 'summary_large_image', images: [image] } }
}

export default async function SiteLayout({ children }) {
  const settings = await getSettings()
  const locale = getLocale()
  const forest = settings?.forestBackground ? urlForImage(settings.forestBackground, 2400) : null
  return (
    <LocaleProvider locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(settings)) }}
      />
      <SiteBackground photoUrl={forest} />
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} locale={locale} />
    </LocaleProvider>
  )
}

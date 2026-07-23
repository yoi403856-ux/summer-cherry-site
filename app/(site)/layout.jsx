import SiteBackground from '@/components/SiteBackground'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LocaleProvider } from '@/components/LocaleProvider'
import { getSettings } from '@/lib/api'
import { getLocale } from '@/lib/i18n'
import { urlForImage } from '@/sanity/image'

export default async function SiteLayout({ children }) {
  const settings = await getSettings()
  const locale = getLocale()
  const forest = settings?.forestBackground ? urlForImage(settings.forestBackground, 2400) : null
  return (
    <LocaleProvider locale={locale}>
      <SiteBackground photoUrl={forest} />
      <Navbar />
      <main>{children}</main>
      <Footer settings={settings} locale={locale} />
    </LocaleProvider>
  )
}

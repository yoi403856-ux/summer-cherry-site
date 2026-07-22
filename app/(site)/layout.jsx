import SiteBackground from '@/components/SiteBackground'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getSettings } from '@/lib/api'
import { urlForImage } from '@/sanity/image'

// re-read content from Sanity at most once a minute (ISR)
export const revalidate = 60

export default async function SiteLayout({ children }) {
  const settings = await getSettings()
  const forest = settings?.forestBackground ? urlForImage(settings.forestBackground, 2400) : null
  return (
    <>
      <SiteBackground photoUrl={forest} />
      <Navbar />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}

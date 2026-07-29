import './globals.css'
import { getLocale } from '@/lib/i18n'
import { siteUrl } from '@/lib/site'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Summer Cherry — питомник мейн-кунов',
  description:
    'Summer Cherry — питомник мейн-кунов. Крупные, здоровые котята из тумана северного леса. Котята, производители, история питомника.',
  openGraph: {
    title: 'Summer Cherry — питомник мейн-кунов',
    description: 'Крупные, здоровые котята из тумана северного леса. Котята, производители, история питомника.',
    siteName: 'Summer Cherry',
  },
  verification: {
    google: 'qjuGhi8lywjsGdImFxONaPiU7_PKkBfiy76co1RQ4Gk',
    yandex: 'b832107eb99d231e',
  },
}

export default function RootLayout({ children }) {
  const locale = getLocale()
  return (
    <html lang={locale}>
      <body className="font-sans">{children}</body>
    </html>
  )
}

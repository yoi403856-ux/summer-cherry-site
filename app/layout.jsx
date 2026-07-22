import './globals.css'
import { Cinzel, Cormorant_Garamond, Jost } from 'next/font/google'

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cinzel', display: 'swap' })
const cormorant = Cormorant_Garamond({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-cormorant', display: 'swap' })
const jost = Jost({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '600'], variable: '--font-jost', display: 'swap' })

export const metadata = {
  title: 'Summer Cherry — питомник мейн-кунов',
  description:
    'Summer Cherry — питомник мейн-кунов. Крупные, здоровые котята из тумана северного леса. Котята, производители, история питомника.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}

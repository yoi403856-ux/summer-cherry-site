import { getKittenSlugs, getStudSlugs } from '@/lib/api'
import { siteUrl } from '@/lib/site'

// Every page gets both its Russian (unprefixed) and English (/en/...) URL
// listed as separate entries, each carrying the full alternates block
// (including itself) — this is how search engines discover the /en/ pages
// at all, since the only in-page link between languages is the RU/EN
// toggle in the nav.
function entries(path) {
  const ru = path === '/' ? '/' : path
  const en = path === '/' ? '/en' : `/en${path}`
  const languages = { 'ru-RU': `${siteUrl}${ru}`, 'en-US': `${siteUrl}${en}` }
  return [
    { url: `${siteUrl}${ru}`, alternates: { languages } },
    { url: `${siteUrl}${en}`, alternates: { languages } },
  ]
}

export default async function sitemap() {
  const [kittenSlugs, studSlugs] = await Promise.all([getKittenSlugs(), getStudSlugs()])

  const staticPaths = ['/', '/about', '/kittens', '/studs']
  const kittenPaths = kittenSlugs.map((slug) => `/kittens/${slug}`)
  const studPaths = studSlugs.map((slug) => `/studs/${slug}`)

  return [...staticPaths, ...kittenPaths, ...studPaths].flatMap(entries)
}

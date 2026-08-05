import { unstable_cache } from 'next/cache'
import { client } from '@/sanity/client'
import { T } from './dict'
import { CACHE_TAGS } from './cacheTags'

// `cache: 'no-store'` here is intentional even though every getXContent
// function below is wrapped in `unstable_cache` — see the matching comment
// on safeFetch in lib/api.js for why.
async function fetchDoc(type) {
  if (!client) return null
  try {
    return await client.fetch(`*[_type == $type][0]`, { type }, { cache: 'no-store' })
  } catch {
    return null
  }
}

// prefers the locale-specific field (EN falls back to RU field), then the
// hardcoded dict default — so the site is never broken by an empty field
function f(doc, base, key, locale) {
  if (!doc) return base[key]
  const val = locale === 'en' ? (doc[`${key}En`] || doc[key]) : doc[key]
  return val || base[key]
}

function mergeList(doc, docKey, base, baseKey, locale, mapItem) {
  const arr = doc?.[docKey]
  const baseArr = base[baseKey]
  if (!arr || !arr.length) return baseArr
  return arr.map((item, i) => mapItem(item, baseArr[i] || {}, locale))
}

async function homeContentImpl(locale) {
  const doc = await fetchDoc('homeContent')
  const base = T[locale].home
  if (!doc) return base
  return {
    ...base,
    eyebrow: f(doc, base, 'eyebrow', locale),
    lead: f(doc, base, 'lead', locale),
    aboutEyebrow: f(doc, base, 'aboutEyebrow', locale),
    aboutH2a: f(doc, base, 'aboutH2a', locale),
    aboutH2b: f(doc, base, 'aboutH2b', locale),
    p1: f(doc, base, 'p1', locale),
    p2: f(doc, base, 'p2', locale),
    p3: f(doc, base, 'p3', locale),
    stats: mergeList(doc, 'stats', base, 'stats', locale, (item, fallback, loc) => ({
      n: item.n || fallback.n || '',
      l: (loc === 'en' ? item.lEn || item.l : item.l) || fallback.l || '',
    })),
    residentsEyebrow: f(doc, base, 'residentsEyebrow', locale),
    residentsH2: f(doc, base, 'residentsH2', locale),
    whyEyebrow: f(doc, base, 'whyEyebrow', locale),
    whyH2: f(doc, base, 'whyH2', locale),
    values: mergeList(doc, 'values', base, 'values', locale, (item, fallback, loc) => ({
      t: (loc === 'en' ? item.tEn || item.t : item.t) || fallback.t || '',
      d: (loc === 'en' ? item.dEn || item.d : item.d) || fallback.d || '',
    })),
    quote: f(doc, base, 'quote', locale),
    quoteBy: f(doc, base, 'quoteBy', locale),
    ctaH2a: f(doc, base, 'ctaH2a', locale),
    ctaH2b: f(doc, base, 'ctaH2b', locale),
    ctaH2c: f(doc, base, 'ctaH2c', locale),
    ctaLead: f(doc, base, 'ctaLead', locale),
  }
}

export const getHomeContent = unstable_cache(homeContentImpl, ['getHomeContent'], {
  tags: [CACHE_TAGS.homeContent],
})

async function aboutContentImpl(locale) {
  const doc = await fetchDoc('aboutContent')
  const base = T[locale].about
  if (!doc) return base
  const line1 = locale === 'en' ? doc.heroTitleLine1En || doc.heroTitleLine1 : doc.heroTitleLine1
  const line2 = locale === 'en' ? doc.heroTitleLine2En || doc.heroTitleLine2 : doc.heroTitleLine2
  const paragraphs = locale === 'en' ? doc.paragraphsEn?.length ? doc.paragraphsEn : doc.paragraphs : doc.paragraphs
  return {
    ...base,
    heroTitle: [line1 || base.heroTitle[0], line2 || base.heroTitle[1]],
    heroLead: f(doc, base, 'heroLead', locale),
    philEyebrow: f(doc, base, 'philEyebrow', locale),
    philH2a: f(doc, base, 'philH2a', locale),
    philH2b: f(doc, base, 'philH2b', locale),
    philH2c: f(doc, base, 'philH2c', locale),
    pp: paragraphs?.length ? paragraphs : base.pp,
    quote: f(doc, base, 'quote', locale),
    features: mergeList(doc, 'features', base, 'features', locale, (item, fallback, loc) => ({
      t: (loc === 'en' ? item.tEn || item.t : item.t) || fallback.t || '',
      d: (loc === 'en' ? item.dEn || item.d : item.d) || fallback.d || '',
    })),
    pathEyebrow: f(doc, base, 'pathEyebrow', locale),
    pathH2: f(doc, base, 'pathH2', locale),
    timeline: mergeList(doc, 'timeline', base, 'timeline', locale, (item, fallback, loc) => ({
      year: item.year || fallback.year || '',
      title: (loc === 'en' ? item.titleEn || item.title : item.title) || fallback.title || '',
      text: (loc === 'en' ? item.textEn || item.text : item.text) || fallback.text || '',
    })),
  }
}

export const getAboutContent = unstable_cache(aboutContentImpl, ['getAboutContent'], {
  tags: [CACHE_TAGS.aboutContent],
})

async function kittensContentImpl(locale) {
  const doc = await fetchDoc('kittensContent')
  const base = T[locale].kittens
  if (!doc) return base
  return {
    ...base,
    heroEyebrow: f(doc, base, 'heroEyebrow', locale),
    heroTitle: f(doc, base, 'heroTitle', locale),
    heroLead: f(doc, base, 'heroLead', locale),
    howEyebrow: f(doc, base, 'howEyebrow', locale),
    howH2: f(doc, base, 'howH2', locale),
    steps: mergeList(doc, 'steps', base, 'steps', locale, (item, fallback, loc) => ({
      n: fallback.n || '',
      t: (loc === 'en' ? item.tEn || item.t : item.t) || fallback.t || '',
      d: (loc === 'en' ? item.dEn || item.d : item.d) || fallback.d || '',
    })),
  }
}

export const getKittensContent = unstable_cache(kittensContentImpl, ['getKittensContent'], {
  tags: [CACHE_TAGS.kittensContent],
})

async function studsContentImpl(locale) {
  const doc = await fetchDoc('studsContent')
  const base = T[locale].studs
  if (!doc) return base
  return {
    ...base,
    heroEyebrow: f(doc, base, 'heroEyebrow', locale),
    heroTitle: f(doc, base, 'heroTitle', locale),
    heroLead: f(doc, base, 'heroLead', locale),
    respEyebrow: f(doc, base, 'respEyebrow', locale),
    respText: f(doc, base, 'respText', locale),
  }
}

export const getStudsContent = unstable_cache(studsContentImpl, ['getStudsContent'], {
  tags: [CACHE_TAGS.studsContent],
})

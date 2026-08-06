import { unstable_cache } from 'next/cache'
import { client } from '@/sanity/client'
import { CACHE_TAGS, CACHE_TTL_SECONDS } from './cacheTags'

const PARENT = `{ _id, name, nameEn, call, callEn, "slug": slug.current, role, color, colorEn, images }`
const KITTEN = `_id, name, nameEn, "slug": slug.current, litter, litterEn, color, colorEn, polydactyl, polydactylEn, sex, born, status, description, descriptionEn, images, order, father->${PARENT}, mother->${PARENT}`
const STUD = `_id, name, nameEn, call, callEn, "slug": slug.current, role, color, colorEn, polydactyl, polydactylEn, weight, weightEn, titles, titlesEn, tests, testsEn, images, order`

/*
  Never throws during build/render — a Sanity outage degrades to an empty page
  rather than a failed build.

  `fallback` is only ever an empty value. Placeholder demo content used to live
  here so an empty dataset still looked populated during development, but on a
  live, indexed site that is actively harmful: six invented kittens were served
  to visitors and crawled by Google while the dataset held none. An empty
  dataset must now render as empty — the pages already handle that (see the
  "no kittens yet" state in components/KittensGrid.jsx).

  `cache: 'no-store'` here is intentional even though every exported function
  below is wrapped in `unstable_cache`: the tag-based cache lives at the
  wrapper level, so the raw request underneath must not also be cached by
  Next's own fetch layer — that would just stack a second, harder to
  invalidate cache underneath the first one.
*/
async function safeFetch(query, params, fallback) {
  if (!client) return fallback
  try {
    const data = await client.fetch(query, params || {}, { cache: 'no-store' })
    return data ?? fallback
  } catch {
    return fallback
  }
}

// Kitten listings/details dereference father/mother (see KITTEN above), so
// editing a stud can change what a kitten page shows — both tags apply.
export const getKittens = unstable_cache(
  () => safeFetch(`*[_type == "kitten"] | order(order asc, born desc){${KITTEN}}`, {}, []),
  ['getKittens'],
  { tags: [CACHE_TAGS.kitten, CACHE_TAGS.stud], revalidate: CACHE_TTL_SECONDS }
)

export const getKitten = unstable_cache(
  (slug) => safeFetch(`*[_type == "kitten" && slug.current == $slug][0]{${KITTEN}}`, { slug }, null),
  ['getKitten'],
  { tags: [CACHE_TAGS.kitten, CACHE_TAGS.stud], revalidate: CACHE_TTL_SECONDS }
)

// Only kittens with at least one photo are published: the listing hides
// photo-less ones, so their detail pages must not be pre-rendered or
// sitemapped either, or search engines index pages nothing links to.
export const getKittenSlugs = unstable_cache(
  () =>
    safeFetch(
      `*[_type == "kitten" && defined(slug.current) && count(images) > 0].slug.current`,
      {},
      []
    ),
  ['getKittenSlugs'],
  { tags: [CACHE_TAGS.kitten], revalidate: CACHE_TTL_SECONDS }
)

export const getStuds = unstable_cache(
  () => safeFetch(`*[_type == "stud"] | order(order asc){${STUD}}`, {}, []),
  ['getStuds'],
  { tags: [CACHE_TAGS.stud], revalidate: CACHE_TTL_SECONDS }
)

export const getStud = unstable_cache(
  (slug) => safeFetch(`*[_type == "stud" && slug.current == $slug][0]{${STUD}}`, { slug }, null),
  ['getStud'],
  { tags: [CACHE_TAGS.stud], revalidate: CACHE_TTL_SECONDS }
)

export const getStudSlugs = unstable_cache(
  () => safeFetch(`*[_type == "stud" && defined(slug.current)].slug.current`, {}, []),
  ['getStudSlugs'],
  { tags: [CACHE_TAGS.stud], revalidate: CACHE_TTL_SECONDS }
)

// kittens fathered/mothered by this stud — powers the "Котята" block on a
// producer's page. Depends on both types: which kittens match depends on
// kitten docs, but the block only makes sense in the context of a stud page.
export const getKittensByStud = unstable_cache(
  async (studId) => {
    if (!studId) return []
    return safeFetch(
      `*[_type == "kitten" && (father._ref == $id || mother._ref == $id)] | order(order asc, born desc){
        _id, name, nameEn, "slug": slug.current, color, colorEn, status, images
      }`,
      { id: studId },
      []
    )
  },
  ['getKittensByStud'],
  { tags: [CACHE_TAGS.kitten, CACHE_TAGS.stud], revalidate: CACHE_TTL_SECONDS }
)

export const getSettings = unstable_cache(
  // fetched by fixed document id, not just _type: an old stray "siteSettings"
  // document (created before the Studio singleton wiring existed) sorts
  // unpredictably otherwise, sometimes winning over the real one and hiding
  // every field editors actually filled in
  () => safeFetch(`*[_id == "siteSettings"][0]`, {}, null),
  ['getSettings'],
  { tags: [CACHE_TAGS.siteSettings], revalidate: CACHE_TTL_SECONDS }
)

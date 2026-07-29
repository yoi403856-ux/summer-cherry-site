import { client } from '@/sanity/client'

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

export async function getKittens() {
  return safeFetch(`*[_type == "kitten"] | order(order asc, born desc){${KITTEN}}`, {}, [])
}

export async function getKitten(slug) {
  return safeFetch(`*[_type == "kitten" && slug.current == $slug][0]{${KITTEN}}`, { slug }, null)
}

// Only kittens with at least one photo are published: the listing hides
// photo-less ones, so their detail pages must not be pre-rendered or
// sitemapped either, or search engines index pages nothing links to.
export async function getKittenSlugs() {
  return safeFetch(
    `*[_type == "kitten" && defined(slug.current) && count(images) > 0].slug.current`,
    {},
    []
  )
}

export async function getStuds() {
  return safeFetch(`*[_type == "stud"] | order(order asc){${STUD}}`, {}, [])
}

export async function getStud(slug) {
  return safeFetch(`*[_type == "stud" && slug.current == $slug][0]{${STUD}}`, { slug }, null)
}

export async function getStudSlugs() {
  return safeFetch(`*[_type == "stud" && defined(slug.current)].slug.current`, {}, [])
}

// kittens fathered/mothered by this stud — powers the "Котята" block on a producer's page
export async function getKittensByStud(studId) {
  if (!studId) return []
  return safeFetch(
    `*[_type == "kitten" && (father._ref == $id || mother._ref == $id)] | order(order asc, born desc){
      _id, name, nameEn, "slug": slug.current, color, colorEn, status, images
    }`,
    { id: studId },
    []
  )
}

export async function getSettings() {
  // fetched by fixed document id, not just _type: an old stray "siteSettings"
  // document (created before the Studio singleton wiring existed) sorts
  // unpredictably otherwise, sometimes winning over the real one and hiding
  // every field editors actually filled in
  return safeFetch(`*[_id == "siteSettings"][0]`, {}, null)
}

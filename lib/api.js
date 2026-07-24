import { client } from '@/sanity/client'
import { sampleKittens, sampleStuds } from './sampleData'

const PARENT = `{ _id, name, nameEn, call, callEn, "slug": slug.current, role, color, images }`
const KITTEN = `_id, name, nameEn, "slug": slug.current, litter, litterEn, color, sex, born, status, description, descriptionEn, images, order, father->${PARENT}, mother->${PARENT}`
const STUD = `_id, name, nameEn, call, callEn, "slug": slug.current, role, color, weight, weightEn, titles, titlesEn, tests, testsEn, images, order`

// safe fetch: never throw during build/render — fall back to whatever is given
async function safeFetch(query, params, fallback) {
  if (!client) return fallback
  try {
    const data = await client.fetch(query, params || {})
    if (Array.isArray(fallback)) return data?.length ? data : fallback
    return data ?? fallback
  } catch {
    return fallback
  }
}

// While the Sanity dataset is still empty, keep showing sample content
// so the site never looks broken. Real data takes over as soon as it exists.
export async function getKittens() {
  return safeFetch(`*[_type == "kitten"] | order(order asc, born desc){${KITTEN}}`, {}, sampleKittens)
}

export async function getKitten(slug) {
  const fallback = sampleKittens.find((k) => k.slug === slug) || null
  return safeFetch(`*[_type == "kitten" && slug.current == $slug][0]{${KITTEN}}`, { slug }, fallback)
}

export async function getKittenSlugs() {
  const fallback = sampleKittens.map((k) => k.slug)
  return safeFetch(`*[_type == "kitten" && defined(slug.current)].slug.current`, {}, fallback)
}

export async function getStuds() {
  return safeFetch(`*[_type == "stud"] | order(order asc){${STUD}}`, {}, sampleStuds)
}

export async function getStud(slug) {
  const fallback = sampleStuds.find((s) => s.slug === slug) || null
  const doc = await safeFetch(`*[_type == "stud" && slug.current == $slug][0]{${STUD}}`, { slug }, null)
  return doc || fallback
}

export async function getStudSlugs() {
  const fallback = sampleStuds.map((s) => s.slug)
  return safeFetch(`*[_type == "stud" && defined(slug.current)].slug.current`, {}, fallback)
}

// kittens fathered/mothered by this stud — powers the "Котята" block on a producer's page
export async function getKittensByStud(studId) {
  if (!studId) return []
  return safeFetch(
    `*[_type == "kitten" && (father._ref == $id || mother._ref == $id)] | order(order asc, born desc){
      _id, name, nameEn, "slug": slug.current, color, status, images
    }`,
    { id: studId },
    []
  )
}

export async function getSettings() {
  return safeFetch(`*[_type == "siteSettings"][0]`, {}, null)
}

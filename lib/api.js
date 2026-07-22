import { client } from '@/sanity/client'
import { sampleKittens, sampleStuds } from './sampleData'

const KITTEN = `_id, name, "slug": slug.current, litter, color, sex, born, status, price, description, images, order`
const STUD = `_id, name, call, "slug": slug.current, role, color, weight, titles, tests, images, order`

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

export async function getSettings() {
  return safeFetch(`*[_type == "siteSettings"][0]`, {}, null)
}

// One cache tag per Sanity document `_type`. Shared between lib/api.js /
// lib/content.js (where the tags are attached to cached reads) and
// app/api/revalidate/route.js (which uses this same map to translate an
// incoming webhook's `_type` into the tag(s) to bust).
export const CACHE_TAGS = {
  kitten: 'sanity:kitten',
  stud: 'sanity:stud',
  siteSettings: 'sanity:siteSettings',
  homeContent: 'sanity:homeContent',
  aboutContent: 'sanity:aboutContent',
  kittensContent: 'sanity:kittensContent',
  studsContent: 'sanity:studsContent',
}

export const ALL_CACHE_TAGS = Object.values(CACHE_TAGS)

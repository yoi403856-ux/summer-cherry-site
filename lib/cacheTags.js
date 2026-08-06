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

/*
  Safety-net TTL applied to every cached Sanity read.

  This is NOT how edits reach the site — that stays push-based: publishing in
  the Studio fires the webhook at app/api/revalidate, which busts the matching
  tag immediately. The TTL only backstops the two cases a webhook can't cover:

  1. `safeFetch` (lib/api.js) and `fetchDoc` (lib/content.js) deliberately
     swallow a failed request and return their empty fallback — and
     `unstable_cache` then caches that emptiness like any other result. Without
     a TTL, one blip while the cache is cold would pin an empty producers list
     or a missing hero mosaic until the owner next hits Publish, which can be
     weeks. With it, the worst case heals itself within the hour.
  2. A webhook that never lands: delivery failure, rotated secret, or the app
     restarting mid-delivery.

  An hour costs roughly 24 requests per function per day against a 250k/month
  quota — noise next to the ~29k/month the site already used uncached.
*/
export const CACHE_TTL_SECONDS = 3600

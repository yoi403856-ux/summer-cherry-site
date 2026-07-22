import fs from 'fs'
import path from 'path'

// Reads /public/hero/*.jpg for the homepage mosaic (server-side).
// Later this can be replaced by Sanity settings.heroImages.
export function getLocalHeroImages() {
  try {
    const dir = path.join(process.cwd(), 'public', 'hero')
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/hero/${f}`)
  } catch {
    return []
  }
}

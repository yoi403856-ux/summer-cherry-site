import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = client ? imageUrlBuilder(client) : null

// returns a plain URL string for a Sanity image source, or null
export function urlForImage(source, width) {
  if (!builder || !source) return null
  let img = builder.image(source).auto('format').fit('max')
  if (width) img = img.width(width)
  return img.url()
}

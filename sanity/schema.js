import { kitten } from './schemaTypes/kitten'
import { stud } from './schemaTypes/stud'
import { siteSettings } from './schemaTypes/siteSettings'
import { homeContent } from './schemaTypes/homeContent'
import { aboutContent } from './schemaTypes/aboutContent'
import { kittensContent } from './schemaTypes/kittensContent'
import { studsContent } from './schemaTypes/studsContent'

export const schema = {
  types: [kitten, stud, siteSettings, homeContent, aboutContent, kittensContent, studsContent],
}

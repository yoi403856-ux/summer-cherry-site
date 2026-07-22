import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, isSanityConfigured } from './env'

// only build a client when a project id exists; otherwise the site
// falls back to sample data (see lib/api.js)
export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null

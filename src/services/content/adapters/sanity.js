import { createClient } from '@sanity/client'

// Use environment variables injected by Vite
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

// Only invoke the Sanity client if we are using the real CMS.
// This prevents crashes if the developer hasn't set their env vars yet
// but is testing the UI in VITE_CMS_MODE=mock.
export const getSanityClient = () => {
  if (!projectId) {
    if (import.meta.env.MODE === 'development') {
      console.warn('Sanity Project ID missing. Provide VITE_SANITY_PROJECT_ID in .env')
    }
    return null
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-03-01', // Use a stable API version
    useCdn: import.meta.env.NODE_ENV === 'production', // true for faster, cached reads
  })
}

// Low-level fetcher for the index to use
export const sanityAdapter = {
  async fetch(query, params = {}) {
    const client = getSanityClient()
    if (!client) throw new Error('Sanity client not configured.')
    return client.fetch(query, params)
  }
}

/**
 * CMS Transformation Layer
 * ─────────────────────────────────────────────────────────────
 * Normalizes raw data from ANY CMS (Sanity, Contentful, WP, etc.) 
 * into a strict, predictable format for UI components.
 * 
 * IF THE BACKEND CHANGES: We only rewrite these transforms. 
 * The UI components never change.
 */

export function transformBlogPost(raw) {
  if (!raw) return null

  // Strip Sanity-specific metadata (_id, _type, _rev) and flatten objects
  return {
    id: raw._id || raw.id,
    title: raw.title || 'Untitled Post',
    slug: raw.slug?.current || '',
    excerpt: raw.excerpt || '',
    authorName: raw.author?.name || 'SAFI DOT TECH Team',
    authorImage: raw.author?.image?.asset?.url || null, // Assuming groq resolution
    featuredImageUrl: raw.featuredImage?.asset?.url || null,
    publishedAt: raw.publishedAt ? new Date(raw.publishedAt).toLocaleDateString() : 'Draft',
    content: raw.content || [] // Portable text array
  }
}

export function transformPortfolioProject(raw) {
  if (!raw) return null

  return {
    id: raw._id || raw.id,
    clientName: raw.clientName || 'Confidential Client',
    title: raw.title || '',
    category: raw.category || 'Case Study',
    techStack: raw.techStack || [],
    thumbnailUrl: raw.thumbnail?.asset?.url || null,
    results: raw.results || [],
    description: raw.description || ''
  }
}

export function transformService(raw) {
  if (!raw) return null

  return {
    id: raw._id || raw.id,
    name: raw.serviceName || '',
    headline: raw.headline || '',
    description: raw.description || '',
    pricingTiers: raw.pricingTiers || [],
    faq: raw.FAQ || []
  }
}

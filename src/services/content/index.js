import { sanityAdapter } from './adapters/sanity.js'
import { mockAdapter } from './adapters/mock.js'
import { transformBlogPost, transformPortfolioProject, transformService } from './transforms/index.js'
import { GET_ALL_POSTS } from './queries/blog.js'
import { GET_ALL_PROJECTS } from './queries/portfolio.js'
import { GET_ALL_SERVICES } from './queries/services.js'

/**
 * ContentService API 
 * ─────────────────────────────────────────────────────────────
 * The public entry point for the entire application. React components
 * import this service and call `ContentService.getBlogPosts()`.
 * They do not know about Sanity.io or the transformation rules.
 */

// Toggle adapter choice via environment variable. 
// Protects the frontend if the CMS is down or not yet configured.
const useMock = import.meta.env.VITE_CMS_MODE === 'mock'
const activeAdapter = useMock ? mockAdapter : sanityAdapter

export const ContentService = {
  
  async getBlogPosts() {
    try {
      const rawData = await activeAdapter.fetch(GET_ALL_POSTS)
      return rawData.map(transformBlogPost)
    } catch (error) {
      console.error('ContentService API Error [getBlogPosts]:', error)
      return [] // Fallback gracefully instead of crashing the UI
    }
  },

  async getPortfolioProjects() {
    try {
      const rawData = await activeAdapter.fetch(GET_ALL_PROJECTS)
      return rawData.map(transformPortfolioProject)
    } catch (error) {
      console.error('ContentService API Error [getPortfolioProjects]:', error)
      return []
    }
  },

  async getServices() {
    try {
      const rawData = await activeAdapter.fetch(GET_ALL_SERVICES)
      return rawData.map(transformService)
    } catch (error) {
      console.error('ContentService API Error [getServices]:', error)
      return []
    }
  }

}

export default ContentService

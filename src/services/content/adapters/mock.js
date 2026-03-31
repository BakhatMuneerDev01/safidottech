// Mock data for local development or disconnected frontend building
// Follows the exact same shape that the transformation layer expects from Sanity.

export const mockAdapter = {
  async fetch(query, params = {}) {
    console.debug('[Mock Content Adapter] Fetching query:', query)
    
    // Simulate network delay to accurately test loading states
    await new Promise(resolve => setTimeout(resolve, 600))

    if (query.includes('_type == "blogPost"')) {
      return [
        {
          _id: 'mock-post-1',
          title: 'The Future of Web Performance: Beyond Core Web Vitals',
          slug: { current: 'future-web-performance' },
          excerpt: 'A deep dive into predictive fetching, GPU-accelerated CSS, and next-gen rendering architectures for premium digital experiences.',
          publishedAt: new Date().toISOString(),
          // Mock structure for Portable Text and references
        }
      ]
    }

    if (query.includes('_type == "serviceContent"')) {
      return [
        {
          _id: 'mock-svc-1',
          serviceName: 'Enterprise AI Integration',
          headline: 'Automate intelligence into every workflow.',
          description: 'Custom LLM deployments and agentic systems designed for your proprietary data constraints.',
        }
      ]
    }

    if (query.includes('_type == "portfolioProject"')) {
      return [
        {
          _id: 'mock-port-1',
          clientName: 'Nexus Global',
          title: 'Nexus Fintech Dashboard',
          category: 'Fintech',
          techStack: ['React', 'Node.js', 'PostgreSQL'],
        }
      ]
    }

    // Default empty return
    return []
  }
}

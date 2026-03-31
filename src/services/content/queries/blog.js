// GROQ query to fetch all published blog posts
export const GET_ALL_POSTS = `
  *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "author": author->{name, image{asset->{url}}},
    "featuredImage": featuredImage{asset->{url}},
    publishedAt,
    content
  }
`

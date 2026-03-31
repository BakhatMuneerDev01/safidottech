// GROQ query for portfolio projects
export const GET_ALL_PROJECTS = `
  *[_type == "portfolioProject" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    _id,
    clientName,
    title,
    category,
    techStack,
    "thumbnail": thumbnail{asset->{url}},
    results,
    description
  }
`

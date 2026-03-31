// GROQ query for main services
export const GET_ALL_SERVICES = `
  *[_type == "serviceContent" && !(_id in path("drafts.**"))] | order(serviceName asc) {
    _id,
    serviceName,
    headline,
    description,
    pricingTiers,
    FAQ
  }
`

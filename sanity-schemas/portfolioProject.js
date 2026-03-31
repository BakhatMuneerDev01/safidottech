export default {
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'Web Development' },
          { title: 'Mobile App', value: 'Mobile App' },
          { title: 'AI Integration', value: 'AI Integration' },
          { title: 'Branding', value: 'Branding' }
        ]
      }
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'thumbnail',
      title: 'Project Thumbnail',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'results',
      title: 'Results / Metrics',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key metrics achieved (e.g. "Increased conversion by 40%")'
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'text'
    }
  ]
}

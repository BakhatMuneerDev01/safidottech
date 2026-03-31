export default {
  name: 'serviceContent',
  title: 'Service Content',
  type: 'document',
  fields: [
    {
      name: 'serviceName',
      title: 'Service Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'pricingTiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Tier Name', type: 'string' },
            { name: 'price', title: 'Price String', type: 'string' },
            { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }
          ]
        }
      ]
    },
    {
      name: 'FAQ',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' }
          ]
        }
      ]
    }
  ]
}

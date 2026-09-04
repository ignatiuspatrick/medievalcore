import type { Block } from 'payload'

export const StoryGridBlock: Block = {
  slug: 'storyGrid',
  interfaceName: 'StoryGridBlock',
  labels: { singular: 'Story grid', plural: 'Story grids' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Latest stories' },
    {
      name: 'stories',
      type: 'relationship',
      relationTo: 'stories',
      hasMany: true,
      maxRows: 12,
      admin: { description: 'Leave empty to show the newest published stories.' },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: 'Two columns', value: '2' },
        { label: 'Three columns', value: '3' },
        { label: 'Four columns', value: '4' },
      ],
    },
  ],
}

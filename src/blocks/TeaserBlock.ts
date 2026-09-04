import type { Block } from 'payload'

export const TeaserBlock: Block = {
  slug: 'teaser',
  interfaceName: 'TeaserBlock',
  labels: { singular: 'Article card', plural: 'Article cards' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Text', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'linkLabel', type: 'text' },
    { name: 'linkHref', type: 'text', admin: { condition: (_, siblingData) => Boolean(siblingData.linkLabel) } },
    {
      name: 'imagePosition', type: 'select', defaultValue: 'right', options: [
        { label: 'Image right', value: 'right' }, { label: 'Image left', value: 'left' },
      ],
    },
  ],
}

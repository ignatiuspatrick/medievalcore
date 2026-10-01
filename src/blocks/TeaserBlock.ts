import type { Block } from 'payload'

import { surfaceField } from '@/blocks/fields/surface'

export const TeaserBlock: Block = {
  slug: 'teaser',
  interfaceName: 'TeaserBlock',
  labels: { singular: 'Article card', plural: 'Article cards' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Text', type: 'textarea' },
    surfaceField('Background color', 'parchment'),
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'linkLabel', type: 'text' },
    {
      name: 'linkType', label: 'Destination type', type: 'select', defaultValue: 'internal',
      options: [{ label: 'Internal page or path', value: 'internal' }, { label: 'External URL', value: 'external' }],
      admin: { condition: (_, siblingData) => Boolean(siblingData.linkLabel) },
    },
    {
      name: 'linkHref', label: 'Destination URL', type: 'text',
      admin: { condition: (_, siblingData) => Boolean(siblingData.linkLabel), description: 'Internal: /about-mia. External: https://example.com.' },
    },
    {
      name: 'imagePosition', type: 'select', defaultValue: 'right', options: [
        { label: 'Image right', value: 'right' }, { label: 'Image left', value: 'left' },
      ],
    },
  ],
}

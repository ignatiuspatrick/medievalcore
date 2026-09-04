import type { Block } from 'payload'

export const CarouselBlock: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  labels: { singular: 'Carousel', plural: 'Carousels' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'slides', type: 'array', minRows: 2, required: true, labels: { singular: 'Slide', plural: 'Slides' }, fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'linkLabel', type: 'text' },
        { name: 'linkHref', type: 'text', admin: { condition: (_, siblingData) => Boolean(siblingData.linkLabel) } },
      ],
    },
  ],
}

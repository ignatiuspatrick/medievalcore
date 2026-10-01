import type { Block } from 'payload'

import { surfaceField } from '@/blocks/fields/surface'
import { textColorField } from '@/blocks/fields/textColor'
import { ImageBlock } from '@/blocks/ImageBlock'
import { ParagraphBlock } from '@/blocks/ParagraphBlock'
import { TeaserBlock } from '@/blocks/TeaserBlock'

export const CarouselBlock: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  labels: { singular: 'Carousel', plural: 'Carousels' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'heading', type: 'text' },
    surfaceField('Background color', 'parchment'),
    {
      name: 'slides', type: 'array', minRows: 2, required: true, labels: { singular: 'Slide', plural: 'Slides' }, fields: [
        {
          name: 'contentBlocks',
          label: 'Slide layout',
          type: 'blocks',
          blocks: [TeaserBlock, ParagraphBlock, ImageBlock],
          admin: { description: 'Compose this slide with Article cards, Text, and Images. The order is preserved in the carousel.' },
        },
        { name: 'image', type: 'upload', relationTo: 'media', admin: { condition: (_, siblingData) => !siblingData.contentBlocks?.length, description: 'Legacy slide image. Use Slide layout for new slides.' } },
        { name: 'eyebrow', type: 'text', admin: { condition: (_, siblingData) => !siblingData.contentBlocks?.length } },
        { name: 'heading', type: 'text', admin: { condition: (_, siblingData) => !siblingData.contentBlocks?.length } },
        { name: 'description', type: 'richText', admin: { condition: (_, siblingData) => !siblingData.contentBlocks?.length } },
        textColorField('descriptionColor', 'Description color'),
        { name: 'linkLabel', type: 'text', admin: { condition: (_, siblingData) => !siblingData.contentBlocks?.length } },
        {
          name: 'linkType', label: 'Destination type', type: 'select', defaultValue: 'internal',
          options: [{ label: 'Internal page or path', value: 'internal' }, { label: 'External URL', value: 'external' }],
          admin: { condition: (_, siblingData) => !siblingData.contentBlocks?.length && Boolean(siblingData.linkLabel) },
        },
        {
          name: 'linkHref', label: 'Destination URL', type: 'text',
          admin: { condition: (_, siblingData) => !siblingData.contentBlocks?.length && Boolean(siblingData.linkLabel), description: 'Internal: /about-mia. External: https://example.com.' },
        },
      ],
    },
  ],
}

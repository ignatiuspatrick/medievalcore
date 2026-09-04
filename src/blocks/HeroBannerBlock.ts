import type { Block } from 'payload'

import { ButtonBlock } from '@/blocks/ButtonBlock'
import { ImageBlock } from '@/blocks/ImageBlock'
import { ParagraphBlock } from '@/blocks/ParagraphBlock'
import { TitleBlock } from '@/blocks/TitleBlock'

export const HeroBannerBlock: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  labels: { singular: 'Teaser', plural: 'Teasers' },
  fields: [
    {
      name: 'contentBlocks',
      label: 'Left section content',
      type: 'blocks',
      minRows: 1,
      blocks: [TitleBlock, ParagraphBlock, ButtonBlock, ImageBlock],
      admin: {
        description: 'Build the left side of this teaser from reusable content components. The original fields below remain available for existing teasers.',
      },
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', label: 'Title', type: 'text', required: true },
    { name: 'copy', label: 'Text', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'ctaLabel', label: 'Link label', type: 'text' },
    { name: 'ctaHref', label: 'Link URL', type: 'text', admin: { condition: (_, siblingData) => Boolean(siblingData.ctaLabel) } },
  ],
}

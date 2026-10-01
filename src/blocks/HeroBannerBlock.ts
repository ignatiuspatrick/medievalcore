import type { Block } from 'payload'

import { ButtonBlock } from '@/blocks/ButtonBlock'
import { surfaceField } from '@/blocks/fields/surface'
import { ImageBlock } from '@/blocks/ImageBlock'
import { ParagraphBlock } from '@/blocks/ParagraphBlock'
import { TitleBlock } from '@/blocks/TitleBlock'

export const HeroBannerBlock: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  labels: { singular: 'Teaser', plural: 'Teasers' },
  admin: { disableBlockName: true },
  fields: [
    {
      name: 'dividerStyle',
      label: 'Teaser layout',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard split', value: 'standard' },
        { label: 'Illuminated divider', value: 'illuminated' },
      ],
    },
    surfaceField('Background color', 'parchment'),
    {
      name: 'contentBlocks',
      label: 'Left section content',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [TitleBlock, ParagraphBlock, ButtonBlock, ImageBlock],
      admin: {
        description: 'Build the left side of this teaser from reusable content components.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. Without an image, this Teaser renders as a single composed content panel.' },
    },
  ],
}

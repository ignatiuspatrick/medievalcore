import type { Block } from 'payload'

import { textColorField } from '@/blocks/fields/textColor'

export const CustomTextBlock: Block = {
  slug: 'customText',
  interfaceName: 'CustomTextBlock',
  labels: { singular: 'Custom text', plural: 'Custom text blocks' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'content', type: 'richText', required: true },
    textColorField(),
  ],
}

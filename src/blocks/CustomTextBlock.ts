import type { Block } from 'payload'

export const CustomTextBlock: Block = {
  slug: 'customText',
  interfaceName: 'CustomTextBlock',
  labels: { singular: 'Custom text', plural: 'Custom text blocks' },
  fields: [
    { name: 'content', type: 'richText', required: true },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: 'wide' },
      ],
    },
  ],
}

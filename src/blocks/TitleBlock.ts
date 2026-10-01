import type { Block } from 'payload'

import { surfaceField } from '@/blocks/fields/surface'

export const TitleBlock: Block = {
  slug: 'title',
  interfaceName: 'TitleBlock',
  labels: { singular: 'Title', plural: 'Titles' },
  admin: { disableBlockName: true },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      admin: { description: 'Optional small line displayed above the title.' },
    },
    { name: 'text', type: 'text', required: true },
    {
      name: 'level', type: 'select', defaultValue: 'h2', options: [
        { label: 'Heading 1', value: 'h1' }, { label: 'Heading 2', value: 'h2' }, { label: 'Heading 3', value: 'h3' },
        { label: 'Heading 4', value: 'h4' }, { label: 'Heading 5', value: 'h5' }, { label: 'Heading 6', value: 'h6' },
      ],
    },
    {
      name: 'alignment', type: 'select', defaultValue: 'left', options: [
        { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'appearance',
      label: 'Title style',
      type: 'select',
      defaultValue: 'framed',
      options: [
        { label: 'Illustrated frame', value: 'framed' },
        { label: 'Without container', value: 'plain' },
      ],
      admin: {
        description: 'Without container keeps only the heading and its typography. Use a Section container when you want a surface behind it.',
      },
    },
    surfaceField('Background color'),
  ],
}

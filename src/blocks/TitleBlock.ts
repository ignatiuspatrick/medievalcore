import type { Block } from 'payload'

export const TitleBlock: Block = {
  slug: 'title',
  interfaceName: 'TitleBlock',
  labels: { singular: 'Title', plural: 'Titles' },
  fields: [
    { name: 'text', type: 'text', required: true },
    {
      name: 'level', type: 'select', defaultValue: 'h2', options: [
        { label: 'Heading 1', value: 'h1' }, { label: 'Heading 2', value: 'h2' }, { label: 'Heading 3', value: 'h3' },
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
  ],
}

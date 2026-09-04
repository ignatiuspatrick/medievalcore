import type { Block } from 'payload'

export const ParagraphBlock: Block = {
  slug: 'paragraph',
  interfaceName: 'ParagraphBlock',
  labels: { singular: 'Text', plural: 'Text' },
  fields: [
    { name: 'content', label: 'Text content', type: 'richText', required: true, admin: { description: 'Use the Lexical editor for headings, paragraphs, links, lists, quotations, and inline formatting.' } },
    {
      name: 'width', type: 'select', defaultValue: 'normal', options: [
        { label: 'Narrow', value: 'narrow' }, { label: 'Normal', value: 'normal' }, { label: 'Wide', value: 'wide' },
      ],
    },
  ],
}

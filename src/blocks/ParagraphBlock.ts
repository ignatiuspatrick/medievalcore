import type { Block } from 'payload'

import { textColorField } from '@/blocks/fields/textColor'

export const ParagraphBlock: Block = {
  slug: 'paragraph',
  interfaceName: 'ParagraphBlock',
  labels: { singular: 'Text', plural: 'Text' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'content', label: 'Text content', type: 'richText', required: true, admin: { description: 'Use the Lexical editor for headings, paragraphs, links, lists, quotations, and inline formatting.' } },
    textColorField(),
  ],
}

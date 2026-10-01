import type { Block } from 'payload'

import { surfaceField } from '@/blocks/fields/surface'
import { textColorField } from '@/blocks/fields/textColor'

export const AccordionBlock: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  labels: { singular: 'Accordion', plural: 'Accordions' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'heading', type: 'text' },
    surfaceField('Background color', 'primary'),
    { name: 'allowMultiple', type: 'checkbox', defaultValue: false, label: 'Allow multiple sections to be open' },
    {
      name: 'items', type: 'array', minRows: 1, required: true, labels: { singular: 'Section', plural: 'Sections' }, fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richText', required: true },
        textColorField(),
      ],
    },
  ],
}

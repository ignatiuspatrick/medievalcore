import type { GlobalConfig } from 'payload'

import { publisherOnly } from '@/access/roles'

export const SiteFooter: GlobalConfig = {
  slug: 'site-footer',
  label: 'Site footer',
  admin: {
    description: 'A reusable site-wide footer fragment. Add columns and their link lists here once; every public page updates together.',
  },
  access: { read: () => true, update: publisherOnly },
  fields: [
    {
      name: 'introduction',
      type: 'group',
      label: 'Footer introduction',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'The Talehouse Press' },
        { name: 'heading', type: 'text', defaultValue: 'Colophon of the Story Scriptorium' },
        { name: 'copy', type: 'textarea', defaultValue: 'Penned, illuminated, and bound with a little old-world wonder.' },
      ],
    },
    {
      name: 'columns',
      label: 'Footer columns',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Footer column', plural: 'Footer columns' },
      admin: { description: 'Each column is a reusable link list, similar to an AEM Experience Fragment.' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          labels: { singular: 'Footer link', plural: 'Footer links' },
          fields: [
            { name: 'label', type: 'text', required: true },
            {
              name: 'linkType', label: 'Destination type', type: 'select', defaultValue: 'internal',
              options: [{ label: 'Internal page or path', value: 'internal' }, { label: 'External URL', value: 'external' }],
            },
            { name: 'href', label: 'Destination URL', type: 'text', required: true, admin: { description: 'Internal: /about-mia. External: https://example.com or mailto:hello@example.com.' } },
          ],
        },
      ],
    },
  ],
}

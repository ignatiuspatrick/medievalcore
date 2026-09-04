import type { GlobalConfig } from 'payload'

import { publisherOnly } from '@/access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: { read: () => true, update: publisherOnly },
  fields: [
    {
      type: 'group',
      name: 'identity',
      label: 'Press identity',
      fields: [
        { name: 'name', label: 'Press name', type: 'text', defaultValue: 'Medieval Core' },
        { name: 'strapline', type: 'text', defaultValue: 'Watermill Press & Story Scriptorium' },
      ],
    },
    {
      type: 'group',
      name: 'ornaments',
      label: 'Illustrated ornaments',
      admin: { description: 'Upload the supplied trumpet-hare and fairy artwork here. They appear in the public landing page and site chrome.' },
      fields: [
        { name: 'rabbitIllustration', label: 'Trumpet hare', type: 'upload', relationTo: 'media' },
        { name: 'fairyIllustration', label: 'Reading fairy', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

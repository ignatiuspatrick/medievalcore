import type { CollectionConfig } from 'payload'

import { loggedIn, publisherOnly } from '@/access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true, create: loggedIn, update: publisherOnly, delete: publisherOnly },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'card', width: 640, height: 360, crop: 'center' },
      { name: 'hero', width: 1600, height: 900, crop: 'center' },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: false }],
}

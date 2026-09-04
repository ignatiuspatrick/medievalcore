import type { CollectionConfig } from 'payload'

import { isPublisher, publisherOnly } from '@/access/roles'
import { generateSlug } from '@/hooks/generateSlug'

export const LayoutTemplates: CollectionConfig = {
  slug: 'layout-templates',
  admin: { useAsTitle: 'name', group: 'Publisher / Site Builder', hidden: ({ user }) => !isPublisher(user) },
  access: { read: () => true, create: publisherOnly, update: publisherOnly, delete: publisherOnly },
  hooks: { beforeValidate: [generateSlug('layout-templates', 'name')] },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { description: 'Optional on creation. Generated from the template name when empty; editable afterwards.' } },
    {
      name: 'readerStyle',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Standard Article', value: 'standard' },
        { label: 'Illustrated Story', value: 'illustrated' },
        { label: 'Chapter', value: 'chapter' },
      ],
    },
    { name: 'description', type: 'textarea' },
  ],
}

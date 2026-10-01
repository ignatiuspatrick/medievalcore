import type { CollectionConfig } from 'payload'

import { isPublisher, publisherOnly } from '@/access/roles'
import { pageBuilderBlocks } from '@/blocks/pageBuilderBlocks'
import { generateSlug } from '@/hooks/generateSlug'

export const PageTemplates: CollectionConfig = {
  slug: 'page-templates',
  // PostgreSQL limits table and enum identifiers to 63 characters. The short
  // physical name keeps deeply nested block fields safely below that limit.
  dbName: 'pt',
  labels: { singular: 'Page template', plural: 'Page templates' },
  admin: {
    useAsTitle: 'name',
    group: 'Publisher / Site Builder',
    hidden: ({ user }) => !isPublisher(user),
    description: 'Reusable page-blueprints. Applying one to a Page copies its blocks, then the Page can be freely edited.',
  },
  access: { read: () => true, create: publisherOnly, update: publisherOnly, delete: publisherOnly },
  hooks: { beforeValidate: [generateSlug('page-templates', 'name')] },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    {
      name: 'slug', type: 'text', unique: true, index: true,
      admin: { description: 'Optional on creation. Generated from the template name when empty; editable afterwards.' },
    },
    { name: 'description', type: 'textarea', admin: { description: 'Describe when publishers should choose this blueprint.' } },
    {
      name: 'layout',
      label: 'Template layout',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: pageBuilderBlocks,
      admin: {
        description: 'Compose the reusable block sequence here. Pages that apply this template receive their own editable copy.',
        initCollapsed: true,
      },
    },
  ],
}

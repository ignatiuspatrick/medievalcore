import type { CollectionConfig } from 'payload'

import { isPublisher, publisherOnly } from '@/access/roles'
import { pageBuilderBlocks } from '@/blocks/pageBuilderBlocks'
import { applyPageTemplate } from '@/hooks/applyPageTemplate'
import { generateSlug } from '@/hooks/generateSlug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Publisher / Site Builder',
    hidden: ({ user }) => !isPublisher(user),
    components: {
      edit: {
        beforeDocumentControls: ['@/components/admin/PageEditorShortcuts#PageEditorShortcuts'],
      },
    },
  },
  // Payload's native list view shows Delete and Edit actions after rows are selected.
  disableBulkDelete: false,
  disableBulkEdit: false,
  versions: { drafts: true },
  hooks: { beforeValidate: [applyPageTemplate, generateSlug('pages')] },
  access: { read: () => true, create: publisherOnly, update: publisherOnly, delete: publisherOnly },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { description: 'Optional on creation. Generated from the title when empty; editable afterwards.' } },
    {
      name: 'presentation',
      label: 'Canvas style',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard canvas', value: 'standard' },
        { label: 'Landing canvas', value: 'landing' },
      ],
      admin: { position: 'sidebar', description: 'Controls the page canvas only. Add blocks below to compose the actual page.' },
    },
    {
      name: 'isHomepage',
      label: 'Use as site homepage',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'This Page is shown at / and is edited here like every other Page.',
      },
    },
    {
      name: 'layoutTemplate',
      label: 'Start from a Page Template',
      type: 'relationship',
      relationTo: 'page-templates',
      admin: {
        position: 'sidebar',
        description: 'Optional. Choose a reusable blueprint, then enable “Apply selected template”.',
      },
    },
    {
      name: 'applyLayoutTemplate',
      label: 'Apply selected template',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => Boolean(siblingData.layoutTemplate),
        description: 'On save, this replaces the Page layout with an editable copy of the selected template.',
      },
    },
    {
      name: 'showInNavigation',
      label: 'Show in site navigation',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'navigationLabel',
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => Boolean(siblingData.showInNavigation),
        description: 'Uses the page title when left empty.',
      },
    },
    {
      name: 'navigationOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => Boolean(siblingData.showInNavigation),
        description: 'Lower values appear first.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: pageBuilderBlocks,
      validate: (value: unknown, { siblingData }) => {
        const pageData = siblingData as { applyLayoutTemplate?: boolean; layoutTemplate?: unknown }
        if (pageData.applyLayoutTemplate && pageData.layoutTemplate) return true
        return Array.isArray(value) && value.length > 0 || 'Add at least one layout block, or apply a Page Template.'
      },
      admin: {
        description: 'Use “Add Layout” to stack components, drag rows to reorder them, and configure each component independently.',
        initCollapsed: true,
      },
    },
  ],
}

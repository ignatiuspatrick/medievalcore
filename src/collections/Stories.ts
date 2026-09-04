import type { Access, CollectionBeforeChangeHook, CollectionConfig, Where } from 'payload'

import { isPublisher, loggedIn } from '@/access/roles'
import { generateSlug } from '@/hooks/generateSlug'

const ownUnpublishedStories: Access = ({ req }) => {
  if (isPublisher(req.user)) return true
  if (!req.user) return false

  return {
    and: [
      { authors: { contains: req.user.id } },
      { status: { not_equals: 'published' } },
    ],
  } as Where
}

const ownOrPublishedStories: Access = ({ req }) => {
  if (isPublisher(req.user)) return true
  if (!req.user) return { status: { equals: 'published' } } as Where

  return {
    or: [
      { status: { equals: 'published' } },
      { authors: { contains: req.user.id } },
    ],
  } as Where
}

const ensureAuthorAndPublishingRules: CollectionBeforeChangeHook = ({ data, operation, originalDoc, req }) => {
  if (isPublisher(req.user)) return data

  // A writer always becomes one of the co-authors when creating a draft.
  if (operation === 'create' && req.user) {
    const suppliedAuthors = Array.isArray(data.authors) ? data.authors : []
    const authorIDs = suppliedAuthors.map((author) =>
      typeof author === 'object' && author !== null ? author.id : author,
    )

    if (!authorIDs.includes(req.user.id)) data.authors = [...suppliedAuthors, req.user.id]
  }

  // Authors may submit for review, but publishing belongs to publishers alone.
  if (data.status === 'published') {
    data.status = originalDoc?.status === 'published' ? 'published' : 'in_review'
  }

  return data
}

export const Stories: CollectionConfig = {
  slug: 'stories',
  admin: { useAsTitle: 'title', group: 'Author Workspace', defaultColumns: ['title', 'status', 'publishDate'] },
  versions: { drafts: true, maxPerDoc: 25 },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: loggedIn,
    read: ownOrPublishedStories,
    update: ownUnpublishedStories,
    delete: ({ req }) => isPublisher(req.user),
  },
  hooks: {
    beforeValidate: [generateSlug('stories')],
    beforeChange: [ensureAuthorAndPublishingRules],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { description: 'Optional on creation. Generated from the title when empty; editable afterwards.' } },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'layoutTemplate',
      label: 'Template style',
      type: 'relationship',
      relationTo: 'layout-templates',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'In review', value: 'in_review' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'publishDate', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    {
      name: 'primaryImage',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: true,
      minRows: 1,
      admin: { position: 'sidebar' },
    },
  ],
}

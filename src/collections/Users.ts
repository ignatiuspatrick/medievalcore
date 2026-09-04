import type { CollectionConfig } from 'payload'

import { isPublisher, publisherOnly } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Publisher / Site Builder',
    hidden: ({ user }) => !isPublisher(user),
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: publisherOnly,
    read: ({ req }) => isPublisher(req.user) || { id: { equals: req.user?.id } },
    update: ({ req }) => isPublisher(req.user) || { id: { equals: req.user?.id } },
    delete: publisherOnly,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['author'],
      options: [
        { label: 'Author', value: 'author' },
        { label: 'Publisher', value: 'publisher' },
      ],
      access: {
        create: ({ req }) => !req.user || isPublisher(req.user),
        update: ({ req }) => isPublisher(req.user),
      },
    },
    { name: 'displayName', type: 'text', required: true },
  ],
}

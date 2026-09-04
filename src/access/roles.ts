import type { Access, FieldAccess } from 'payload'

type RoleUser = { id: string | number; roles?: Array<'author' | 'publisher'> }

export const isPublisher = (user: RoleUser | null | undefined) =>
  Boolean(user?.roles?.includes('publisher'))

export const publisherOnly: Access = ({ req }) => isPublisher(req.user as RoleUser)

export const publisherOnlyField: FieldAccess = ({ req }) =>
  isPublisher(req.user as RoleUser)

export const loggedIn: Access = ({ req }) => Boolean(req.user)

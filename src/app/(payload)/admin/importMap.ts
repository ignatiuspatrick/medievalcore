/* This file is refreshed by `npm run generate:importmap` after adding admin components. */
import { WorkspaceDashboard } from '@/components/admin/WorkspaceDashboard'
import { WorkspaceSwitch } from '@/components/admin/WorkspaceSwitch'
import { PublisherStudio } from '@/components/admin/PublisherStudio'

import type { ImportMap } from 'payload'

export const importMap: ImportMap = {
  '@/components/admin/WorkspaceDashboard#WorkspaceDashboard': WorkspaceDashboard,
  '@/components/admin/WorkspaceSwitch#WorkspaceSwitch': WorkspaceSwitch,
  '@/components/admin/PublisherStudio#PublisherStudio': PublisherStudio,
}

'use client'

import { useAuth } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'

type WorkspaceUser = { roles?: Array<'author' | 'publisher'> }

export function WorkspaceSwitch() {
  const { user } = useAuth<WorkspaceUser>()
  const pathname = usePathname()
  const isPublisher = user?.roles?.includes('publisher')
  const inPublisherWorkspace = pathname.includes('/pages') || pathname.includes('/page-templates')

  return (
    <nav aria-label="Workspace switcher" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <a aria-current={!inPublisherWorkspace ? 'page' : undefined} href="/admin/collections/stories">
        Author Workspace
      </a>
      {isPublisher && (
        <a aria-current={inPublisherWorkspace ? 'page' : undefined} href="/admin/publisher-studio">
          Publisher / Site Builder
        </a>
      )}
    </nav>
  )
}

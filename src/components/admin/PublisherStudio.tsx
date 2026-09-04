import { redirect } from 'next/navigation'
import type { AdminViewServerProps } from 'payload'

import { PublisherCanvas, type StudioPage } from './PublisherCanvas'

type PublisherUser = { displayName?: string; email?: string; roles?: Array<'author' | 'publisher'> }
type PageDocument = {
  id: string | number
  title?: string
  slug?: string
  showInNavigation?: boolean
  navigationLabel?: string
  navigationOrder?: number
  updatedAt?: string
  layout?: Array<{ blockType?: string; heading?: string }>
}

export async function PublisherStudio({ initPageResult }: AdminViewServerProps) {
  const user = initPageResult.req.user as PublisherUser | undefined
  if (!user?.roles?.includes('publisher')) redirect('/admin')

  const { docs } = await initPageResult.req.payload.find({
    collection: 'pages', depth: 0, limit: 50, overrideAccess: false, req: initPageResult.req, sort: 'navigationOrder',
  })
  const pages: StudioPage[] = docs.map((document) => {
    const page = document as PageDocument
    return {
      id: String(page.id), title: page.title || 'Untitled page', slug: page.slug || '',
      isInNavigation: Boolean(page.showInNavigation), navigationLabel: page.navigationLabel || page.title || 'Untitled page',
      navigationOrder: page.navigationOrder || 0, updatedAt: page.updatedAt || new Date().toISOString(),
      blocks: (page.layout || []).map((block) => ({ type: block.blockType || 'customText', heading: block.heading || '' })),
    }
  })

  return <PublisherCanvas displayName={user.displayName || user.email?.split('@')[0] || 'Publisher'} pages={pages} />
}

import { notFound } from 'next/navigation'

import { PageLivePreview } from '@/components/public/PageLivePreview'
import { PageRenderer, type PageData, type PageOrnaments, type PageStory } from '@/components/public/PageRenderer'
import { getCMS } from '@/lib/getCMS'

export const dynamic = 'force-dynamic'

const hasDynamicStories = (blocks: PageData['layout'] = []): boolean => blocks.some((block) =>
  block.blockType === 'landingPage' ||
  (block.blockType === 'storyGrid' && !block.stories?.length) ||
  (block.blockType === 'container' && hasDynamicStories(block.contentBlocks)),
)

export default async function CMSPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}) {
  const { slug } = await params
  const { preview } = await searchParams
  const isLivePreview = preview === 'true'
  const payload = await getCMS()
  const { docs } = await payload.find({
    collection: 'pages',
    draft: isLivePreview,
    where: isLivePreview
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    depth: 2,
    limit: 1,
  })
  const page = docs[0] as PageData | undefined

  if (!page) notFound()

  const recentStories = hasDynamicStories(page.layout)
    ? (await payload.find({ collection: 'stories', where: { status: { equals: 'published' } }, depth: 1, sort: '-publishDate', limit: 12 })).docs as PageStory[]
    : []
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 }) as { ornaments?: PageOrnaments }
  const ornaments = settings.ornaments || {}

  if (isLivePreview) {
    return <PageLivePreview
      initialPage={page}
      recentStories={recentStories}
      ornaments={ornaments}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
    />
  }

  return <PageRenderer page={page} recentStories={recentStories} ornaments={ornaments} />
}

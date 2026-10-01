import { PageLivePreview } from '@/components/public/PageLivePreview'
import { PageRenderer, type PageData, type PageOrnaments, type PageStory } from '@/components/public/PageRenderer'
import { getCMS } from '@/lib/getCMS'

// Payload needs the runtime secret and database connection; do not query it while building.
export const dynamic = 'force-dynamic'

export default async function HomePage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const { preview } = await searchParams
  const isLivePreview = preview === 'true'
  const payload = await getCMS()
  const { docs: homepagePages } = await payload.find({
    collection: 'pages',
    draft: isLivePreview,
    where: isLivePreview
      ? { isHomepage: { equals: true } }
      : {
        and: [
          { isHomepage: { equals: true } },
          { _status: { equals: 'published' } },
        ],
      },
    depth: 2,
    limit: 1,
  })
  const page = homepagePages[0] as PageData | undefined
  const { docs: stories } = await payload.find({
    collection: 'stories',
    where: { status: { equals: 'published' } },
    sort: '-publishDate',
    limit: 12,
    depth: 1,
  })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 }) as {
    ornaments?: {
      fairyIllustration?: { url?: string | null } | string | number
      rabbitIllustration?: { url?: string | null } | string | number
    }
  }
  const ornaments = settings.ornaments || {}
  if (page) {
    if (isLivePreview) {
      return <PageLivePreview
        initialPage={page}
        recentStories={stories as PageStory[]}
        ornaments={ornaments as PageOrnaments}
        serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
      />
    }
    return <PageRenderer page={page} recentStories={stories as PageStory[]} ornaments={ornaments as PageOrnaments} />
  }

  return (
    <main className="page-shell" id="main-content" tabIndex={-1}>
      <h1>Homepage not configured</h1>
      <p>In Payload, open Pages and enable <strong>Use as site homepage</strong> for the one page that should appear here.</p>
    </main>
  )
}

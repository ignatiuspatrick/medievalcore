import { getPayload } from 'payload'

import config from '@payload-config'
import { LandingPageSection, type LandingStory } from '@/components/public/LandingPageSection'

// Payload needs the runtime secret and database connection; do not query it while building.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })
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
  const fairyIllustration = typeof ornaments.fairyIllustration === 'object' ? ornaments.fairyIllustration : null
  const rabbitIllustration = typeof ornaments.rabbitIllustration === 'object' ? ornaments.rabbitIllustration : null
  const homepage = await payload.findGlobal({ slug: 'homepage', depth: 1 }) as {
    hero?: { eyebrow?: string; heading?: string; intro?: string; ctaLabel?: string; ctaHref?: string }
    storyShelf?: { heading?: string; stories?: LandingStory[] }
    dispatch?: { heading?: string; copy?: string; ctaLabel?: string; ctaHref?: string }
  }
  const selectedStories = homepage.storyShelf?.stories?.filter((story) => typeof story === 'object') || []

  return (
    <main className="landing-page">
      <LandingPageSection
        eyebrow={homepage.hero?.eyebrow}
        heading={homepage.hero?.heading}
        intro={homepage.hero?.intro}
        ctaLabel={homepage.hero?.ctaLabel}
        ctaHref={homepage.hero?.ctaHref}
        storiesHeading={homepage.storyShelf?.heading}
        dispatchHeading={homepage.dispatch?.heading}
        dispatchCopy={homepage.dispatch?.copy}
        dispatchCtaLabel={homepage.dispatch?.ctaLabel}
        dispatchCtaHref={homepage.dispatch?.ctaHref}
        stories={selectedStories.length ? selectedStories : stories as LandingStory[]}
        fairyIllustration={fairyIllustration}
        rabbitIllustration={rabbitIllustration}
      />
    </main>
  )
}

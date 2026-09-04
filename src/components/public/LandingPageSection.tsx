'use client'

import Link from 'next/link'

export type LandingStory = {
  id: string | number
  title?: string
  slug?: string
  publishDate?: string | null
  primaryImage?: { url?: string | null; alt?: string | null } | string | number
}

type Ornament = { url?: string | null; alt?: string | null } | null | undefined

type Props = {
  eyebrow?: string
  heading?: string
  intro?: string
  ctaLabel?: string
  ctaHref?: string
  storiesHeading?: string
  dispatchHeading?: string
  dispatchCopy?: string
  dispatchCtaLabel?: string
  dispatchCtaHref?: string
  stories: LandingStory[]
  fairyIllustration?: Ornament
  rabbitIllustration?: Ornament
}

const imageFrom = (value: LandingStory['primaryImage']): { url?: string | null; alt?: string | null } | null =>
  typeof value === 'object' && value !== null ? value : null

export function LandingPageSection({
  eyebrow = 'The Watermill Press presents',
  heading = 'Chronicles, folklore & hand-bound tales',
  intro = 'A living library of intimate stories, old-world wonder, and folklore waiting to be read by lantern light.',
  ctaLabel = 'Explore the story library',
  ctaHref = '#latest-stories',
  storiesHeading = 'Newly illuminated folios',
  dispatchHeading = 'Keep a place by the fire.',
  dispatchCopy = 'New tales, editorial notes, and seasonal dispatches from the Watermill Press.',
  dispatchCtaLabel = 'Write to the press',
  dispatchCtaHref = 'mailto:hello@example.com',
  stories,
  fairyIllustration,
  rabbitIllustration,
}: Props) {
  const featured = stories[0]
  const fairy = fairyIllustration?.url

  return (
    <section className="landing-preset">
      <div className="landing-frieze" aria-hidden="true">❦&nbsp;&nbsp;❧&nbsp;&nbsp;❦</div>
      <div className="landing-hero">
        <div className="landing-hero__copy">
          <p className="landing-kicker">❦ {eyebrow}</p>
          <h1>{heading}</h1>
          <p>{intro}</p>
          <a className="landing-button" href={ctaHref}>{ctaLabel} <span aria-hidden="true">→</span></a>
        </div>
        <div className="landing-hero__art" aria-hidden="true">
          {rabbitIllustration?.url && <img className="landing-hare" src={rabbitIllustration.url} alt="" />}
          {fairy && <img className="landing-fairy" src={fairy} alt="" />}
        </div>
      </div>

      {featured && (
        <article className="landing-featured">
          <div className="landing-featured__copy">
            <p className="landing-kicker">✦ Featured chronicle</p>
            <h2>{featured.title}</h2>
            <p>Freshly set in type, illuminated with care, and ready for a quiet hour by the hearth.</p>
            <Link className="landing-text-link" href={`/stories/${featured.slug}`}>Open this folio <span aria-hidden="true">→</span></Link>
          </div>
          {imageFrom(featured.primaryImage)?.url && <img src={imageFrom(featured.primaryImage)?.url || ''} alt={imageFrom(featured.primaryImage)?.alt || ''} />}
        </article>
      )}

      <div className="landing-section-heading" id="latest-stories">
        <p className="landing-kicker">The story library</p>
        <h2>{storiesHeading}</h2>
      </div>
      <div className="landing-story-shelf">
        {stories.slice(featured ? 1 : 0, 7).map((story) => {
          const image = imageFrom(story.primaryImage)
          return <article className="landing-story-card" key={story.id}>
            {image?.url && <img src={image.url} alt={image.alt || ''} />}
            <div>
              <p>Published folio</p>
              <h3><Link href={`/stories/${story.slug}`}>{story.title}</Link></h3>
              <Link href={`/stories/${story.slug}`}>Read folio <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        })}
      </div>
      <aside className="landing-dispatch">
        <div><p className="landing-kicker">Letters by dove post</p><h2>{dispatchHeading}</h2><span>{dispatchCopy}</span></div>
        <a className="landing-button" href={dispatchCtaHref}>{dispatchCtaLabel} <span aria-hidden="true">→</span></a>
      </aside>
    </section>
  )
}

'use client'

import type { CSSProperties, ReactNode } from 'react'

import Link from 'next/link'
import { AccordionSection, CarouselSection, type AccordionItem, type CarouselSlide } from '@/components/blocks/InteractiveBlocks'
import { TeaserCollectionSection, type TeaserCard } from '@/components/blocks/TeaserCollectionSection'
import { LandingPageSection } from '@/components/public/LandingPageSection'
import { RichTextContent, type RichTextData } from '@/components/public/RichTextContent'
import { ButtonSection } from '@/components/blocks/ButtonSection'

export type PageImage = { url?: string | null; alt?: string | null }
export type PageStory = { id: string | number; title?: string; slug?: string; primaryImage?: PageImage | string | number }
export type PageBlock = {
  blockType: 'landingPage' | 'container' | 'title' | 'paragraph' | 'image' | 'button' | 'teaser' | 'teaserCollection' | 'accordion' | 'carousel' | 'heroBanner' | 'storyGrid' | 'splitPhotoColumn' | 'customText'
  id?: string
  eyebrow?: string
  text?: string
  level?: 'h1' | 'h2' | 'h3'
  alignment?: 'left' | 'center' | 'right'
  appearance?: 'framed' | 'plain'
  heading?: string
  copy?: string
  image?: PageImage | string | number
  ctaLabel?: string
  ctaHref?: string
  description?: string
  linkLabel?: string
  linkHref?: string
  columns?: string
  stories?: Array<PageStory | string | number>
  content?: RichTextData
  imagePosition?: 'left' | 'right'
  width?: 'narrow' | 'normal' | 'wide' | 'full'
  items?: AccordionItem[]
  allowMultiple?: boolean
  slides?: CarouselSlide[]
  background?: 'primary' | 'secondary' | 'parchment' | 'transparent' | 'sage' | 'ink'
  padding?: 'compact' | 'medium' | 'spacious'
  contentBlocks?: PageBlock[]
  intro?: string
  storiesHeading?: string
  teasers?: TeaserCard[]
  articleCards?: PageBlock[]
  initialVisible?: number
  caption?: string
  label?: string
  href?: string
  linkType?: 'internal' | 'external'
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  openInNewTab?: boolean
}

export type PageData = { id?: string | number; title?: string; presentation?: 'standard' | 'landing'; layout?: PageBlock[] }
export type PageOrnaments = { fairyIllustration?: PageImage | string | number; rabbitIllustration?: PageImage | string | number }

const isImage = (value: unknown): value is PageImage => typeof value === 'object' && value !== null

function StoryCards({ stories, columns }: { stories: PageStory[]; columns: string | undefined }) {
  return <div className="builder-story-grid" style={{ '--columns': columns || '3' } as CSSProperties}>
    {stories.map((story) => {
      const image = isImage(story.primaryImage) ? story.primaryImage : null
      return <article key={story.id} className="builder-story-card">
        {image?.url && <img src={image.url} alt={image.alt || ''} />}
        <h3><Link href={`/stories/${story.slug}`}>{story.title}</Link></h3>
      </article>
    })}
  </div>
}

function renderBlock(block: PageBlock, index: string | number, recentStories: PageStory[], ornaments: PageOrnaments): ReactNode {
  const key = block.id || index
  const image = isImage(block.image) ? block.image : null

  if (block.blockType === 'container') return <section className={`builder-container builder-container--${block.background || 'parchment'} builder-container--padding-${block.padding || 'medium'}`} key={key}><div className="builder-container__inner">{(block.contentBlocks || []).map((child, childIndex) => renderBlock(child, `${key}-${childIndex}`, recentStories, ornaments))}</div></section>
  if (block.blockType === 'landingPage') return <LandingPageSection key={key} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} ctaLabel={block.ctaLabel} ctaHref={block.ctaHref} storiesHeading={block.storiesHeading} stories={recentStories} fairyIllustration={isImage(ornaments.fairyIllustration) ? ornaments.fairyIllustration : null} rabbitIllustration={isImage(ornaments.rabbitIllustration) ? ornaments.rabbitIllustration : null} />

  if (block.blockType === 'title') {
    const appearance = block.appearance || 'framed'
    const className = `builder-title builder-title--${block.alignment || 'left'} builder-title--${appearance}`
    if (block.level === 'h1') return <section className={className} key={key}><h1>{block.text}</h1></section>
    if (block.level === 'h3') return <section className={className} key={key}><h3>{block.text}</h3></section>
    return <section className={className} key={key}><h2>{block.text}</h2></section>
  }
  if (block.blockType === 'paragraph') return <section className={`builder-text builder-text--${block.width || 'normal'}`} key={key}><RichTextContent data={block.content} /></section>
  if (block.blockType === 'image') return <figure className={`builder-image builder-image--${block.width || 'normal'} builder-image--${block.alignment || 'center'}`} key={key}>{image?.url && <img src={image.url} alt={image.alt || ''} />}{block.caption && <figcaption>{block.caption}</figcaption>}</figure>
  if (block.blockType === 'button') return <ButtonSection key={key} label={block.label} href={block.href} variant={block.variant} alignment={block.alignment} openInNewTab={block.openInNewTab} />
  if (block.blockType === 'teaser') return <article className="builder-article-card" key={key}>{image?.url && <img src={image.url} alt={image.alt || ''} />}<div>{block.eyebrow && <p>{block.eyebrow}</p>}<h3>{block.heading}</h3>{block.description && <span>{block.description}</span>}{block.linkLabel && block.linkHref && <a href={block.linkHref}>{block.linkLabel} <b aria-hidden="true">→</b></a>}</div></article>
  if (block.blockType === 'teaserCollection') {
    const articleCards = (block.articleCards || []).filter((card): card is PageBlock => typeof card === 'object').map((card) => ({
      id: card.id,
      eyebrow: card.eyebrow,
      heading: card.heading,
      description: card.description,
      image: card.image,
      linkLabel: card.linkLabel,
      linkHref: card.linkHref,
    }))
    return <TeaserCollectionSection key={key} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} teasers={articleCards.length ? articleCards : block.teasers || []} columns={block.columns} initialVisible={block.initialVisible} />
  }
  if (block.blockType === 'accordion') return <AccordionSection allowMultiple={block.allowMultiple} heading={block.heading} items={block.items || []} key={key} />
  if (block.blockType === 'carousel') return <CarouselSection heading={block.heading} slides={block.slides || []} key={key} />
  if (block.blockType === 'heroBanner') {
    const hasCustomContent = Boolean(block.contentBlocks?.length)
    return <section className="builder-hero" key={key}>
      <div className="builder-hero__content">
        {hasCustomContent
          ? block.contentBlocks?.map((child, childIndex) => renderBlock(child, `${key}-teaser-${childIndex}`, recentStories, ornaments))
          : <><p>{block.eyebrow}</p><h1>{block.heading}</h1><span>{block.copy}</span>{block.ctaLabel && block.ctaHref && <a href={block.ctaHref}>{block.ctaLabel} →</a>}</>}
      </div>
      {image?.url && <img src={image.url} alt={image.alt || ''} />}
    </section>
  }
  if (block.blockType === 'storyGrid') {
    const selectedStories = block.stories?.filter((story): story is PageStory => typeof story === 'object') || []
    return <section className="builder-section" key={key}><h2>{block.heading || 'Latest stories'}</h2><StoryCards columns={block.columns} stories={selectedStories.length ? selectedStories : recentStories} /></section>
  }
  if (block.blockType === 'splitPhotoColumn') return <section className={`builder-split builder-split--${block.imagePosition || 'left'}`} key={key}>{image?.url && <img src={image.url} alt={image.alt || ''} />}<div><h2>{block.heading}</h2><RichTextContent data={block.content} /></div></section>
  return <section className={`builder-text builder-text--${block.width || 'normal'}`} key={key}><RichTextContent data={block.content} /></section>
}

export function PageRenderer({ page, recentStories, ornaments = {} }: { page: PageData; recentStories: PageStory[]; ornaments?: PageOrnaments }) {
  return <main className={`builder-page builder-page--${page.presentation || 'standard'}`}>{(page.layout || []).map((block, index) => renderBlock(block, index, recentStories, ornaments))}</main>
}

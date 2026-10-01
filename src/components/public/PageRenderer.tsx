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
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  alignment?: 'left' | 'center' | 'right'
  appearance?: 'framed' | 'plain'
  heading?: string
  copy?: string
  image?: PageImage | string | number
  ctaLabel?: string
  ctaHref?: string
  dispatchHeading?: string
  dispatchCopy?: string
  dispatchCtaLabel?: string
  dispatchCtaHref?: string
  description?: string
  linkLabel?: string
  linkHref?: string
  columns?: string
  cardBackground?: string
  frameColor?: string
  stories?: Array<PageStory | string | number>
  content?: RichTextData
  textColor?: string
  textPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'middle'
  imagePosition?: 'left' | 'right'
  width?: 'narrow' | 'normal' | 'wide' | 'full'
  items?: AccordionItem[]
  allowMultiple?: boolean
  slides?: CarouselSlide[]
  background?: string
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
  dividerStyle?: 'standard' | 'illuminated'
}

export type PageData = { id?: string | number; title?: string; presentation?: 'standard' | 'landing'; layout?: PageBlock[] }
export type PageOrnaments = { fairyIllustration?: PageImage | string | number; rabbitIllustration?: PageImage | string | number }

const isImage = (value: unknown): value is PageImage => typeof value === 'object' && value !== null

const surfaceBackground = (surface: string | undefined, fallback: 'primary' | 'secondary' | 'parchment' | 'transparent' = 'parchment'): CSSProperties => {
  const colors = {
    primary: '#cfe2c9',
    secondary: '#eef5ea',
    parchment: '#fff9e9',
    transparent: 'transparent',
    sage: '#dce7d7',
    ink: '#173425',
  } as const

  const value = colors[surface as keyof typeof colors] || (typeof surface === 'string' && /^#(?:[\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i.test(surface) ? surface : colors[fallback])
  return { background: value }
}

function StoryCards({ stories, columns, cardBackground = 'parchment' }: { stories: PageStory[]; columns: string | undefined; cardBackground?: string }) {
  return <div className="builder-story-grid" style={{ '--columns': columns || '3' } as CSSProperties}>
    {stories.map((story) => {
      const image = isImage(story.primaryImage) ? story.primaryImage : null
      return <article key={story.id} className={`builder-story-card builder-story-card--surface-${cardBackground}`} style={surfaceBackground(cardBackground)}>
        {image?.url && <img src={image.url} alt={image.alt || ''} />}
        <h3><Link href={`/stories/${story.slug}`}>{story.title}</Link></h3>
      </article>
    })}
  </div>
}

function renderBlock(block: PageBlock, index: string | number, recentStories: PageStory[], ornaments: PageOrnaments): ReactNode {
  const key = block.id || index
  const image = isImage(block.image) ? block.image : null

  if (block.blockType === 'container') return <section className={`builder-container builder-container--${block.background || 'parchment'} builder-container--padding-${block.padding || 'medium'}`} key={key} style={surfaceBackground(block.background, 'primary')}><div className="builder-container__inner">{(block.contentBlocks || []).map((child, childIndex) => renderBlock(child, `${key}-${childIndex}`, recentStories, ornaments))}</div></section>
  if (block.blockType === 'landingPage') return <LandingPageSection key={key} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} ctaLabel={block.ctaLabel} ctaHref={block.ctaHref} storiesHeading={block.storiesHeading} dispatchHeading={block.dispatchHeading} dispatchCopy={block.dispatchCopy} dispatchCtaLabel={block.dispatchCtaLabel} dispatchCtaHref={block.dispatchCtaHref} stories={recentStories} fairyIllustration={isImage(ornaments.fairyIllustration) ? ornaments.fairyIllustration : null} rabbitIllustration={isImage(ornaments.rabbitIllustration) ? ornaments.rabbitIllustration : null} />

  if (block.blockType === 'title') {
    const appearance = block.appearance || 'framed'
    const className = `builder-title builder-title--${block.alignment || 'left'} builder-title--${appearance} builder-title--surface-${block.background || 'transparent'}`
    const eyebrow = block.eyebrow && <span className="builder-title__eyebrow">{block.eyebrow}</span>
    const style = surfaceBackground(block.background, 'transparent')
    if (block.level === 'h1') return <section className={className} key={key} style={style}>{eyebrow}<h1>{block.text}</h1></section>
    if (block.level === 'h3') return <section className={className} key={key} style={style}>{eyebrow}<h3>{block.text}</h3></section>
    if (block.level === 'h4') return <section className={className} key={key} style={style}>{eyebrow}<h4>{block.text}</h4></section>
    if (block.level === 'h5') return <section className={className} key={key} style={style}>{eyebrow}<h5>{block.text}</h5></section>
    if (block.level === 'h6') return <section className={className} key={key} style={style}>{eyebrow}<h6>{block.text}</h6></section>
    return <section className={className} key={key} style={style}>{eyebrow}<h2>{block.text}</h2></section>
  }
  if (block.blockType === 'paragraph') return <section className={`builder-text builder-text--${block.width || 'normal'}`} key={key}><RichTextContent data={block.content} color={block.textColor} /></section>
  if (block.blockType === 'image') return <div className={`builder-image-section builder-image-section--surface-${block.background || 'transparent'}`} key={key} style={surfaceBackground(block.background, 'transparent')}><figure className={`builder-image builder-image--${block.width || 'normal'} builder-image--${block.alignment || 'center'}`} style={surfaceBackground(block.frameColor)}><div className="builder-image__media">{image?.url && <img src={image.url} alt={image.alt || ''} />}{block.content && <div className={`builder-image__overlay builder-image__overlay--${block.textPlacement || 'middle'}`}><RichTextContent data={block.content} color={block.textColor} /></div>}</div>{block.caption && <figcaption>{block.caption}</figcaption>}</figure></div>
  if (block.blockType === 'button') return <ButtonSection key={key} label={block.label} href={block.href} variant={block.variant} openInNewTab={block.openInNewTab} />
  if (block.blockType === 'teaser') return <article className={`builder-article-card builder-article-card--surface-${block.background || 'parchment'}`} key={key} style={surfaceBackground(block.background)}>{image?.url && <img src={image.url} alt={image.alt || ''} />}<div>{block.eyebrow && <p>{block.eyebrow}</p>}<h3>{block.heading}</h3>{block.description && <span>{block.description}</span>}{block.linkLabel && block.linkHref && <a href={block.linkHref}>{block.linkLabel} <b aria-hidden="true">→</b></a>}</div></article>
  if (block.blockType === 'teaserCollection') {
    const articleCards = (block.articleCards || []).filter((card): card is PageBlock => typeof card === 'object').map((card) => ({
      id: card.id,
      eyebrow: card.eyebrow,
      heading: card.heading,
      description: card.description,
      image: card.image,
      linkLabel: card.linkLabel,
      linkHref: card.linkHref,
      background: card.background,
    }))
    return <TeaserCollectionSection key={key} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} teasers={articleCards.length ? articleCards : block.teasers || []} columns={block.columns} initialVisible={block.initialVisible} background={block.background} />
  }
  if (block.blockType === 'accordion') return <AccordionSection allowMultiple={block.allowMultiple} heading={block.heading} items={block.items || []} background={block.background} key={key} />
  if (block.blockType === 'carousel') return <CarouselSection heading={block.heading} slides={block.slides || []} background={block.background} key={key} />
  if (block.blockType === 'heroBanner') {
    const hasImage = Boolean(image?.url)
    const style = surfaceBackground(block.background)
    return <section className={`builder-hero builder-hero--${block.dividerStyle || 'standard'} builder-hero--surface-${block.background || 'parchment'} ${hasImage ? '' : 'builder-hero--text-only'}`} key={key} style={style}>
      <div className="builder-hero__content" style={style}>
        {block.contentBlocks?.map((child, childIndex) => renderBlock(child, `${key}-teaser-${childIndex}`, recentStories, ornaments))}
      </div>
      {hasImage && block.dividerStyle === 'illuminated' && <div className="builder-hero__divider" aria-hidden="true"><img src="/ornaments/illuminated-teaser-divider.png" alt="" /></div>}
      {image?.url && <img className="builder-hero__image" src={image.url} alt={image.alt || ''} />}
    </section>
  }
  if (block.blockType === 'storyGrid') {
    const selectedStories = block.stories?.filter((story): story is PageStory => typeof story === 'object') || []
    return <section className={`builder-section builder-section--surface-${block.background || 'primary'}`} key={key} style={surfaceBackground(block.background, 'primary')}><h2>{block.heading || 'Latest stories'}</h2><StoryCards cardBackground={block.cardBackground} columns={block.columns} stories={selectedStories.length ? selectedStories : recentStories} /></section>
  }
  if (block.blockType === 'splitPhotoColumn') return <section className={`builder-split builder-split--${block.imagePosition || 'left'}`} key={key}>{image?.url && <img src={image.url} alt={image.alt || ''} />}<div><h2>{block.heading}</h2><RichTextContent data={block.content} color={block.textColor} /></div></section>
  return <section className={`builder-text builder-text--${block.width || 'normal'}`} key={key}><RichTextContent data={block.content} color={block.textColor} /></section>
}

export function PageRenderer({ page, recentStories, ornaments = {} }: { page: PageData; recentStories: PageStory[]; ornaments?: PageOrnaments }) {
  return <main className={`builder-page builder-page--${page.presentation || 'standard'}`} id="main-content" tabIndex={-1}>{(page.layout || []).map((block, index) => renderBlock(block, index, recentStories, ornaments))}</main>
}

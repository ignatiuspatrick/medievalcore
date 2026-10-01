'use client'

import { Accordion, Carousel } from '@chakra-ui/react'

import { RichTextContent, type RichTextData } from '@/components/public/RichTextContent'
import type { CSSProperties } from 'react'
import styles from './InteractiveBlocks.module.scss'

type Image = { url?: string | null; alt?: string | null }

const surfaceBackground = (surface: string | undefined, fallback: 'primary' | 'parchment' | 'transparent' = 'parchment'): CSSProperties => {
  const colors = { primary: '#cfe2c9', secondary: '#eef5ea', parchment: '#fff9e9', transparent: 'transparent', sage: '#dce7d7', ink: '#173425' } as const
  const value = colors[surface as keyof typeof colors] || (typeof surface === 'string' && /^#(?:[\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i.test(surface) ? surface : colors[fallback])
  return { background: value }
}

export type AccordionItem = { id?: string; title?: string; content?: RichTextData; textColor?: string }
export type CarouselSlideBlock = {
  blockType?: 'teaser' | 'paragraph' | 'image'
  id?: string
  image?: Image | string | number
  eyebrow?: string
  heading?: string
  description?: string
  content?: RichTextData
  textColor?: string
  textPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'middle'
  linkLabel?: string
  linkHref?: string
  background?: string
  frameColor?: string
}
export type CarouselSlide = {
  id?: string
  contentBlocks?: CarouselSlideBlock[]
  image?: Image | string | number
  eyebrow?: string
  heading?: string
  description?: RichTextData
  descriptionColor?: string
  linkLabel?: string
  linkHref?: string
}

const AccordionItems = ({ items }: { items: AccordionItem[] }) => <>
  {items.map((item, index) => <Accordion.Item className={styles.accordionItem} key={item.id || index} value={item.id || `section-${index}`}>
    <Accordion.ItemTrigger className={styles.accordionTrigger}><span>{item.title}</span><span aria-hidden>+</span></Accordion.ItemTrigger>
    <Accordion.ItemContent className={styles.accordionContent}><Accordion.ItemBody><RichTextContent data={item.content} color={item.textColor} /></Accordion.ItemBody></Accordion.ItemContent>
  </Accordion.Item>)}
</>

export function AccordionSection({ heading, items, allowMultiple, background = 'primary' }: { heading?: string; items: AccordionItem[]; allowMultiple?: boolean; background?: string }) {
  return <section className={`${styles.accordionSection} ${styles[`surface_${background}`] || ''}`} style={surfaceBackground(background, 'primary')}>{heading && <h2>{heading}</h2>}
    <Accordion.Root className={styles.accordion} collapsible multiple={allowMultiple}><AccordionItems items={items} /></Accordion.Root>
  </section>
}

const imageOf = (value: CarouselSlide['image']): Image | null => typeof value === 'object' && value !== null ? value : null

function SlideBlockContent({ block }: { block: CarouselSlideBlock }) {
  const image = imageOf(block.image)

  if (block.blockType === 'image') {
    return <div className={styles.slideImageSection} style={surfaceBackground(block.background, 'transparent')}><figure className={styles.slideImage} style={surfaceBackground(block.frameColor)}><div className={styles.slideImageMedia}>{image?.url && <img src={image.url} alt={image.alt || ''} />}{block.content && <div className={`${styles.slideImageOverlay} ${styles[`imageText_${block.textPlacement || 'middle'}`]}`}><RichTextContent data={block.content} color={block.textColor} /></div>}</div></figure></div>
  }

  if (block.blockType === 'paragraph') {
    return <div className={styles.slideText}><RichTextContent data={block.content} color={block.textColor} /></div>
  }

  return <article className={`${styles.slideTeaser} ${styles[`surface_${block.background || 'parchment'}`] || ''}`} style={surfaceBackground(block.background)}>
    {image?.url && <img src={image.url} alt={image.alt || ''} />}
    <div>{block.eyebrow && <p>{block.eyebrow}</p>}<h3>{block.heading}</h3>{block.description && <span>{block.description}</span>}{block.linkLabel && block.linkHref && <a href={block.linkHref}>{block.linkLabel} →</a>}</div>
  </article>
}

export function CarouselSection({ heading, slides, background = 'parchment' }: { heading?: string; slides: CarouselSlide[]; background?: string }) {
  if (!slides.length) return null

  return <section className={`${styles.carouselSection} ${styles[`surface_${background}`] || ''}`} style={surfaceBackground(background)}>{heading && <h2>{heading}</h2>}
    <Carousel.Root allowMouseDrag className={styles.carousel} loop slideCount={slides.length} slidesPerPage={1}>
      <Carousel.ItemGroup className={styles.carouselItemGroup}>{slides.map((slide, slideIndex) => {
        const image = imageOf(slide.image)
        const contentBlocks = slide.contentBlocks?.filter((block): block is CarouselSlideBlock => typeof block === 'object') || []
        return <Carousel.Item className={`${styles.slide} ${contentBlocks.length ? styles.composedSlide : ''}`} index={slideIndex} key={slide.id || slideIndex}>
          {contentBlocks.length
            ? <div className={styles.slideLayout}>{contentBlocks.map((block, blockIndex) => <SlideBlockContent block={block} key={block.id || blockIndex} />)}</div>
            : <>{image?.url && <img src={image.url} alt={image.alt || ''} />}<div className={styles.slideCopy}>{slide.eyebrow && <p>{slide.eyebrow}</p>}<h3>{slide.heading}</h3>{slide.description && <RichTextContent data={slide.description} color={slide.descriptionColor} />}{slide.linkLabel && slide.linkHref && <a href={slide.linkHref}>{slide.linkLabel} →</a>}</div></>}
        </Carousel.Item>
      })}</Carousel.ItemGroup>
      <Carousel.Control className={styles.carouselControls}><Carousel.PrevTrigger aria-label="Previous slide">←</Carousel.PrevTrigger><Carousel.IndicatorGroup aria-label={heading || 'Carousel slides'}>{slides.map((slide, slideIndex) => <Carousel.Indicator aria-label={`Show slide ${slideIndex + 1}`} className={styles.dot} index={slideIndex} key={slide.id || slideIndex} />)}</Carousel.IndicatorGroup><Carousel.NextTrigger aria-label="Next slide">→</Carousel.NextTrigger></Carousel.Control>
    </Carousel.Root>
  </section>
}

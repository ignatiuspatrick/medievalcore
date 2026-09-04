'use client'

import { Accordion, Carousel } from '@chakra-ui/react'

import { RichTextContent, type RichTextData } from '@/components/public/RichTextContent'
import styles from './InteractiveBlocks.module.css'

type Image = { url?: string | null; alt?: string | null }

export type AccordionItem = { id?: string; title?: string; content?: RichTextData }
export type CarouselSlide = { id?: string; image?: Image | string | number; eyebrow?: string; heading?: string; description?: string; linkLabel?: string; linkHref?: string }

const AccordionItems = ({ items }: { items: AccordionItem[] }) => <>
  {items.map((item, index) => <Accordion.Item className={styles.accordionItem} key={item.id || index} value={item.id || `section-${index}`}>
    <Accordion.ItemTrigger className={styles.accordionTrigger}><span>{item.title}</span><span aria-hidden>+</span></Accordion.ItemTrigger>
    <Accordion.ItemContent className={styles.accordionContent}><Accordion.ItemBody><RichTextContent data={item.content} /></Accordion.ItemBody></Accordion.ItemContent>
  </Accordion.Item>)}
</>

export function AccordionSection({ heading, items, allowMultiple }: { heading?: string; items: AccordionItem[]; allowMultiple?: boolean }) {
  return <section className={styles.accordionSection}>{heading && <h2>{heading}</h2>}
    <Accordion.Root className={styles.accordion} collapsible multiple={allowMultiple}><AccordionItems items={items} /></Accordion.Root>
  </section>
}

const imageOf = (value: CarouselSlide['image']): Image | null => typeof value === 'object' && value !== null ? value : null

export function CarouselSection({ heading, slides }: { heading?: string; slides: CarouselSlide[] }) {
  if (!slides.length) return null

  return <section className={styles.carouselSection}>{heading && <h2>{heading}</h2>}
    <Carousel.Root allowMouseDrag className={styles.carousel} loop slideCount={slides.length} slidesPerPage={1}>
      <Carousel.ItemGroup className={styles.carouselItemGroup}>{slides.map((slide, slideIndex) => {
        const image = imageOf(slide.image)
        return <Carousel.Item className={styles.slide} index={slideIndex} key={slide.id || slideIndex}>
          {image?.url && <img src={image.url} alt={image.alt || ''} />}
          <div className={styles.slideCopy}><p>{slide.eyebrow}</p><h3>{slide.heading}</h3><span>{slide.description}</span>{slide.linkLabel && slide.linkHref && <a href={slide.linkHref}>{slide.linkLabel} →</a>}</div>
        </Carousel.Item>
      })}</Carousel.ItemGroup>
      <Carousel.Control className={styles.carouselControls}><Carousel.PrevTrigger aria-label="Previous slide">←</Carousel.PrevTrigger><Carousel.IndicatorGroup aria-label={heading || 'Carousel slides'}>{slides.map((slide, slideIndex) => <Carousel.Indicator aria-label={`Show slide ${slideIndex + 1}`} className={styles.dot} index={slideIndex} key={slide.id || slideIndex} />)}</Carousel.IndicatorGroup><Carousel.NextTrigger aria-label="Next slide">→</Carousel.NextTrigger></Carousel.Control>
    </Carousel.Root>
  </section>
}

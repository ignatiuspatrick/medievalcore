'use client'

import { useState, type CSSProperties } from 'react'

import styles from './TeaserCollectionSection.module.scss'

type Image = { url?: string | null; alt?: string | null }

const surfaceBackground = (surface: string | undefined, fallback = 'parchment'): CSSProperties => {
  const colors = {
    primary: '#cfe2c9',
    secondary: '#eef5ea',
    parchment: '#fff9e9',
    transparent: 'transparent',
    sage: '#dce7d7',
    ink: '#173425',
  } as const

  const value = colors[surface as keyof typeof colors] || (typeof surface === 'string' && /^#(?:[\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i.test(surface) ? surface : colors[fallback as keyof typeof colors])
  return { background: value }
}

export type TeaserCard = {
  id?: string
  eyebrow?: string
  heading?: string
  description?: string
  image?: Image | string | number
  linkLabel?: string
  linkHref?: string
  background?: string
}

const imageOf = (value: TeaserCard['image']): Image | null => typeof value === 'object' && value !== null ? value : null

export function TeaserCollectionSection({
  eyebrow,
  heading,
  intro,
  teasers,
  columns = '3',
  initialVisible = 3,
  background = 'primary',
}: {
  eyebrow?: string
  heading?: string
  intro?: string
  teasers: TeaserCard[]
  columns?: string
  initialVisible?: number
  background?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const visibleCount = Math.max(1, Math.min(initialVisible, teasers.length))
  const shownTeasers = expanded ? teasers : teasers.slice(0, visibleCount)
  const canExpand = teasers.length > visibleCount

  return <section className={`${styles.collection} ${styles[`surface_${background}`] || ''}`} style={surfaceBackground(background, 'primary')}>
    {(eyebrow || heading || intro) && <header className={styles.heading}>{eyebrow && <p>❦ {eyebrow}</p>}{heading && <h2>{heading}</h2>}{intro && <span>{intro}</span>}</header>}
    <div className={styles.grid} style={{ '--teaser-columns': columns } as CSSProperties}>
      {shownTeasers.map((teaser, index) => {
        const image = imageOf(teaser.image)
        return <article className={`${styles.card} ${styles[`surface_${teaser.background || 'parchment'}`] || ''}`} key={teaser.id || index} style={surfaceBackground(teaser.background)}>
          {image?.url && <img className={styles.cardImage} src={image.url} alt={image.alt || ''} />}
          <div className={styles.cardCopy}>
            {teaser.eyebrow && <p>{teaser.eyebrow}</p>}
            <h3>{teaser.heading}</h3>
            {teaser.description && <span>{teaser.description}</span>}
            {teaser.linkLabel && teaser.linkHref && <a href={teaser.linkHref}>{teaser.linkLabel} <b aria-hidden="true">→</b></a>}
          </div>
        </article>
      })}
    </div>
    {canExpand && <button className={styles.expand} type="button" aria-expanded={expanded} onClick={() => setExpanded((current) => !current)}>{expanded ? 'Show fewer teasers' : `Expand ${teasers.length - visibleCount} more teaser${teasers.length - visibleCount === 1 ? '' : 's'}`} <span aria-hidden="true">{expanded ? '↑' : '↓'}</span></button>}
  </section>
}

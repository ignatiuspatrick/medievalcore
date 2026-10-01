'use client'

import { Button } from '@chakra-ui/react'
import { useEffect, useId, useState, type CSSProperties } from 'react'

import { RichTextContent, type RichTextData } from './RichTextContent'
import styles from './Reader.module.scss'

type ReaderPreferences = {
  contrast: boolean
  fontSize: number
  lineHeight: number
}

const defaultPreferences: ReaderPreferences = { fontSize: 1.125, lineHeight: 1.8, contrast: false }
const preferenceKey = 'ogmious-reader-preferences'
const minimumFontSize = 1
const maximumFontSize = 1.5
const minimumLineHeight = 1.5
const maximumLineHeight = 2.1

type Props = {
  content?: RichTextData
  contentColor?: string
  image?: { alt?: string | null; url?: string | null } | null
  title: string
}

/** An adjustable, keyboard-operable reading surface for published stories. */
export function Reader({ content, contentColor, image, title }: Props) {
  const titleID = useId()
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(preferenceKey)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ReaderPreferences>
        setPreferences({
          contrast: Boolean(parsed.contrast),
          fontSize: typeof parsed.fontSize === 'number' ? Math.min(maximumFontSize, Math.max(minimumFontSize, parsed.fontSize)) : defaultPreferences.fontSize,
          lineHeight: typeof parsed.lineHeight === 'number' ? Math.min(maximumLineHeight, Math.max(minimumLineHeight, parsed.lineHeight)) : defaultPreferences.lineHeight,
        })
      }
    } catch {
      // Reading controls remain available when browser storage is unavailable.
    } finally {
      setHasLoadedPreferences(true)
    }
  }, [])

  useEffect(() => {
    if (!hasLoadedPreferences) return
    try {
      window.localStorage.setItem(preferenceKey, JSON.stringify(preferences))
    } catch {
      // Preference persistence is optional and must not affect reading.
    }
  }, [hasLoadedPreferences, preferences])

  const updatePreferences = (changes: Partial<ReaderPreferences>) => setPreferences((current) => ({ ...current, ...changes }))
  const status = `Text size ${Math.round(preferences.fontSize * 100)} percent. Line spacing ${preferences.lineHeight.toFixed(1)}. ${preferences.contrast ? 'High contrast on.' : 'Standard contrast.'}`

  return (
    <main className={styles.reader} data-contrast={preferences.contrast ? 'high' : 'standard'} id="main-content" tabIndex={-1} aria-labelledby={titleID}>
      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Reader</p>
          <h1 id={titleID}>{title}</h1>
          {image?.url && <img className={styles.image} src={image.url} alt={image.alt || ''} />}
        </header>

        <section className={styles.settings} aria-labelledby={`${titleID}-settings`}>
          <h2 className={styles.visuallyHidden} id={`${titleID}-settings`}>Reading settings</h2>
          <fieldset className={styles.controlGroup}>
            <legend>Text size</legend>
            <Button aria-label="Decrease text size" className={styles.control} disabled={preferences.fontSize <= minimumFontSize} onClick={() => updatePreferences({ fontSize: Number((preferences.fontSize - 0.125).toFixed(3)) })} size="sm" variant="outline">A−</Button>
            <Button aria-label="Increase text size" className={styles.control} disabled={preferences.fontSize >= maximumFontSize} onClick={() => updatePreferences({ fontSize: Number((preferences.fontSize + 0.125).toFixed(3)) })} size="sm" variant="outline">A+</Button>
          </fieldset>
          <fieldset className={styles.controlGroup}>
            <legend>Line spacing</legend>
            <Button aria-label="Decrease line spacing" className={styles.control} disabled={preferences.lineHeight <= minimumLineHeight} onClick={() => updatePreferences({ lineHeight: Number((preferences.lineHeight - 0.15).toFixed(2)) })} size="sm" variant="outline">−</Button>
            <Button aria-label="Increase line spacing" className={styles.control} disabled={preferences.lineHeight >= maximumLineHeight} onClick={() => updatePreferences({ lineHeight: Number((preferences.lineHeight + 0.15).toFixed(2)) })} size="sm" variant="outline">+</Button>
          </fieldset>
          <Button aria-pressed={preferences.contrast} aria-label="Toggle high contrast" className={styles.control} onClick={() => updatePreferences({ contrast: !preferences.contrast })} size="sm" variant="outline">High contrast</Button>
          <Button className={styles.reset} onClick={() => setPreferences(defaultPreferences)} size="sm" variant="plain">Reset</Button>
          <p className={styles.status} role="status">{status}</p>
        </section>

        <div className={styles.content} style={{ '--reader-font-size': `${preferences.fontSize}rem`, '--reader-line-height': preferences.lineHeight } as CSSProperties}>
          <RichTextContent data={content} color={contentColor} />
        </div>
      </article>
    </main>
  )
}

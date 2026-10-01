'use client'

import { useMemo, useState } from 'react'

import styles from './FolioStudio.module.scss'

export type FolioStory = {
  id: string
  title: string
  slug: string
  status: 'draft' | 'in_review' | 'published'
  updatedAt: string
  excerpt: string
  wordCount: number
  renderStyle: string
}

type Props = { displayName: string; isPublisher: boolean; stories: FolioStory[] }
type Filter = 'all' | FolioStory['status']

const statusLabel: Record<FolioStory['status'], string> = { draft: 'Draft folio', in_review: 'In review', published: 'Ready for imprint' }
const friendlyDate = (value: string) => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value))

export function FolioStudio({ displayName, isPublisher, stories }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [selectedID, setSelectedID] = useState(stories[0]?.id)
  const selected = stories.find((story) => story.id === selectedID)
  const visibleStories = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return stories.filter((story) => (filter === 'all' || story.status === filter) && (!normalized || `${story.title} ${story.excerpt}`.toLowerCase().includes(normalized)))
  }, [filter, query, stories])
  const count = (wanted: Filter) => wanted === 'all' ? stories.length : stories.filter((story) => story.status === wanted).length

  return <main className={styles.studio}>
    <header className={styles.topbar}>
      <a className={styles.brand} href="/admin"><span className={styles.brandMark}>✦</span><span><strong>The Talehouse</strong><small>Studio CMS · Folios & lore</small></span></a>
      <nav className={styles.workspaceNav} aria-label="Workspace"><a className={styles.workspaceActive} href="/admin">✒ Author Folio Studio</a>{isPublisher && <a href="/admin/publisher-studio">▦ Publisher & Page Builder</a>}</nav>
      <div className={styles.account}><span className={styles.presence} /> Dual Quill Active · <strong>{displayName}</strong></div>
    </header>

    <aside className={styles.backlog}>
      <div className={styles.panelHeading}><div><p>✒</p><h1>Story Backlog</h1></div><a className={styles.newFolio} href="/admin/collections/stories/create">+ New Folio</a></div>
      <label className={styles.search}><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search manuscript rolls…" /></label>
      <div className={styles.filters}>{([['all', 'All'], ['draft', 'Drafts'], ['in_review', 'Review'], ['published', 'Ready']] as Array<[Filter, string]>).map(([value, label]) => <button className={filter === value ? styles.filterActive : ''} key={value} onClick={() => setFilter(value)}>{label} <span>{count(value)}</span></button>)}</div>
      <div className={styles.storyList}>{visibleStories.map((story) => <button className={`${styles.storyCard} ${story.id === selectedID ? styles.storySelected : ''}`} key={story.id} onClick={() => setSelectedID(story.id)}><span className={`${styles.statusChip} ${styles[story.status]}`}>{statusLabel[story.status]}</span><span className={styles.folioNumber}>Folio · {friendlyDate(story.updatedAt)}</span><strong>{story.title}</strong><small>{story.excerpt}</small><footer><span>✦ {story.renderStyle}</span><span>{story.wordCount.toLocaleString()} words</span></footer></button>)}{!visibleStories.length && <p className={styles.emptyList}>No folios match this search.</p>}</div>
    </aside>

    <section className={styles.manuscript}>
      <div className={styles.manuscriptMeta}><em>Render style:</em><span>{selected?.renderStyle || 'Select a folio'}</span><small>· Auto-saved in Payload</small></div>
      <div className={styles.toolbar}><button>A</button><button>H1</button><button>H2</button><button><i>I</i></button><button>“ ”</button><button>❦ Divider</button><button>♫ Audio</button><button>▧ Vignette</button></div>
      {selected ? <article className={styles.paper}><div className={styles.paperInner}><p className={styles.kicker}>FOLIO · {friendlyDate(selected.updatedAt).toUpperCase()}</p><h2>{selected.title}</h2><p className={styles.byline}>A working manuscript by {displayName} · {selected.renderStyle}</p><hr /><p className={styles.dropCap}>{selected.excerpt}</p><p>Open the complete manuscript to write with Payload’s Lexical editor, add images, invite co-authors, and submit it for review.</p><a className={styles.editLink} href={`/admin/collections/stories/${selected.id}`}>Open full manuscript editor →</a></div></article> : <div className={styles.blankPaper}><span>❦</span><h2>Your writing table is ready.</h2><p>Create a folio to begin a manuscript.</p><a href="/admin/collections/stories/create">Create first folio</a></div>}
    </section>

    <aside className={styles.details}>
      <div className={styles.coauthorHeader}><h2>✦ Sister Co-Authors Panel</h2><p>A shared editorial chamber</p></div>
      <section className={styles.infoCard}><h3>ACTIVE CO-SCRIBES</h3><div className={styles.person}><span className={styles.avatar}>✒</span><span><strong>{displayName}</strong><small>Editing this manuscript</small></span><i className={styles.online} /></div><div className={styles.person}><span className={styles.avatar}>✦</span><span><strong>Publisher review</strong><small>Available when submitted</small></span><i className={styles.away} /></div></section>
      <section className={styles.infoCard}><h3>FOLIO METRICS</h3><div className={styles.metrics}><div><small>Word count</small><strong>{(selected?.wordCount || 0).toLocaleString()}</strong></div><div><small>Reading time</small><strong>{Math.max(1, Math.ceil((selected?.wordCount || 0) / 220))} min</strong></div></div><p className={styles.tags}>Folklore tags: <span>#Storycraft</span> <span>#Talehouse</span></p></section>
      <section className={styles.infoCard}><h3>EDITORIAL PARCHMENT TRAIL</h3><ul className={styles.trail}><li>Folio studio opened</li><li>Reader render style applied</li><li>Ready for your next sentence</li></ul></section>
      {selected && <a className={styles.primaryAction} href={`/admin/collections/stories/${selected.id}`}>{selected.status === 'published' ? 'View published folio' : 'Continue writing'}</a>}
    </aside>
    <footer className={styles.footer}><span><b>●</b> The Talehouse Press</span><span>Folio Studio · Payload CMS</span><span>Handcrafted for stories</span></footer>
  </main>
}

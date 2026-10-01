'use client'

import { useMemo, useState } from 'react'

import styles from './PublisherStudio.module.scss'

export type StudioPage = {
  id: string; title: string; slug: string; isInNavigation: boolean; navigationLabel: string; navigationOrder: number; updatedAt: string
  blocks: Array<{ type: string; heading: string }>
}

type Props = { displayName: string; pages: StudioPage[] }
const labels: Record<string, string> = { heroBanner: 'Teaser', storyGrid: 'Story grid', splitPhotoColumn: 'Split photo + copy', customText: 'Custom text' }

export function PublisherCanvas({ displayName, pages }: Props) {
  const [query, setQuery] = useState('')
  const [selectedID, setSelectedID] = useState(pages[0]?.id)
  const [showNavigationOnly, setShowNavigationOnly] = useState(false)
  const selected = pages.find((page) => page.id === selectedID)
  const displayedPages = useMemo(() => pages.filter((page) => (!showNavigationOnly || page.isInNavigation) && page.title.toLowerCase().includes(query.toLowerCase())), [pages, query, showNavigationOnly])

  return <main className={styles.studio}>
    <header className={styles.topbar}>
      <a className={styles.brand} href="/admin"><span className={styles.brandMark}>✦</span><span><strong>The Talehouse</strong><small>Studio CMS · Folios & lore</small></span></a>
      <nav className={styles.workspaceNav} aria-label="Workspace"><a href="/admin">✒ Author Folio Studio</a><a className={styles.workspaceActive} href="/admin/publisher-studio">▦ Publisher & Page Builder</a></nav>
      <div className={styles.account}><span className={styles.presence} /> Site steward · <strong>{displayName}</strong></div>
    </header>

    <aside className={styles.pageRail}>
      <div className={styles.railHeading}><div><p>▦</p><h1>Site Pages</h1></div><a href="/admin/collections/pages/create">+ New Page</a></div>
      <label className={styles.search}><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a page…" /></label>
      <label className={styles.navToggle}><input checked={showNavigationOnly} onChange={(event) => setShowNavigationOnly(event.target.checked)} type="checkbox" /> Navigation pages only</label>
      <div className={styles.pageList}>{displayedPages.map((page) => <button className={`${styles.pageCard} ${page.id === selectedID ? styles.selected : ''}`} key={page.id} onClick={() => setSelectedID(page.id)}><span className={styles.pageGlyph}>▤</span><span><strong>{page.title}</strong><small>/{page.slug}</small></span><i className={page.isInNavigation ? styles.live : styles.draft}>{page.isInNavigation ? 'In nav' : 'Hidden'}</i></button>)}{!displayedPages.length && <p className={styles.empty}>No pages match this view.</p>}</div>
      <a className={styles.manageLink} href="/admin/collections/pages">Open all pages →</a>
    </aside>

    <section className={styles.builder}>
      {selected ? <>
        <div className={styles.builderMeta}><span>Page builder</span><strong>{selected.title}</strong><small>/{selected.slug} · saved to Payload</small><a href={`/${selected.slug}`} target="_blank">Preview ↗</a></div>
        <div className={styles.pagePreview}>
          <div className={styles.previewHeader}><span>The Talehouse</span><nav>Stories · About · Journal</nav></div>
          <div className={styles.previewBody}>{selected.blocks.length ? selected.blocks.map((block, index) => <section className={`${styles.block} ${styles[block.type] || ''}`} key={`${block.type}-${index}`}><div className={styles.blockControl}><span>⠿ {labels[block.type] || 'Content block'}</span><span>⋯</span></div>{block.type === 'heroBanner' && <div className={styles.heroMock}><p>TALEHOUSE PRESS</p><h2>{block.heading || selected.title}</h2><span>Stories assembled with care, character, and a touch of folklore.</span><button>Explore the folios</button></div>}{block.type === 'storyGrid' && <><h2>{block.heading || 'Featured folios'}</h2><div className={styles.gridMock}><i /><i /><i /></div></>}{block.type === 'splitPhotoColumn' && <div className={styles.splitMock}><i /><div><h2>{block.heading || 'A story worth keeping'}</h2><p>Thoughtful copy and a handcrafted visual rhythm make each page feel distinctly its own.</p></div></div>}{block.type === 'customText' && <div className={styles.textMock}><h2>{block.heading || 'A note from the Talehouse'}</h2><p>Use this flexible text space for announcements, introductions, or the small details that make the whole site feel alive.</p></div>}</section>) : <div className={styles.blank}><span>❦</span><h2>Begin building this page.</h2><p>Add a Hero Banner, Story Grid, or another block in the Payload editor.</p></div>}</div>
          <button className={styles.addBlock} onClick={() => window.location.assign(`/admin/collections/pages/${selected.id}`)}>+ Add or arrange blocks in Payload</button>
        </div>
      </> : <div className={styles.noSelection}><h2>Choose a page to open the builder.</h2></div>}
    </section>

    <aside className={styles.settings}>
      <div className={styles.settingsHeading}><h2>Page Settings</h2><p>Publisher controls</p></div>
      {selected ? <><section className={styles.settingCard}><label>Page title<strong>{selected.title}</strong></label><label>Public address<strong>/{selected.slug}</strong></label><a href={`/admin/collections/pages/${selected.id}`}>Edit page details →</a></section><section className={styles.settingCard}><h3>Navigation</h3><div className={styles.settingLine}><span><b className={selected.isInNavigation ? styles.onDot : styles.offDot} /> {selected.isInNavigation ? 'Visible in navigation' : 'Hidden from navigation'}</span></div><label>Navigation label<strong>{selected.navigationLabel}</strong></label><label>Menu order<strong>{selected.navigationOrder}</strong></label></section><section className={styles.settingCard}><h3>Publishing trail</h3><ul><li>Page layout saved</li><li>{selected.blocks.length} content block{selected.blocks.length === 1 ? '' : 's'} arranged</li><li>Ready for public preview</li></ul></section><a className={styles.publishButton} href={`/admin/collections/pages/${selected.id}`}>Edit & publish page</a></> : <section className={styles.settingCard}>Create a page to get started.</section>}
    </aside>
    <footer className={styles.footer}><span><b>●</b> The Talehouse Press</span><span>Page Builder · Payload CMS</span><span>Navigation managed by publishers</span></footer>
  </main>
}

import type { Metadata } from 'next'

import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@payload-config'
import { AppChakraProvider } from '@/components/ChakraProvider'
import './site.css'

export const metadata: Metadata = {
  title: { default: 'Story Publisher', template: '%s | Story Publisher' },
  description: 'A personalized story-publishing platform.',
}

// Navigation is publisher-managed CMS data, so it is fetched at request time.
export const dynamic = 'force-dynamic'

type Illustration = { url?: string | null; alt?: string | null }
type Settings = {
  identity?: { name?: string; strapline?: string }
  ornaments?: { fairyIllustration?: Illustration | string | number }
}

const isIllustration = (value: unknown): value is Illustration =>
  typeof value === 'object' && value !== null

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const { docs: pages } = await payload.find({
    collection: 'pages',
    // Pages with drafts enabled keep their document record after unpublishing.
    // Only use the published version in public navigation.
    draft: false,
    where: {
      and: [
        { showInNavigation: { equals: true } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: 'navigationOrder',
    limit: 50,
  })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 }) as Settings
  const pressName = settings.identity?.name || 'Medieval Core'
  const strapline = settings.identity?.strapline || 'Watermill Press & Story Scriptorium'
  const fairy = isIllustration(settings.ornaments?.fairyIllustration) ? settings.ornaments?.fairyIllustration : null

  return (
    <html lang="en">
      <body>
        <AppChakraProvider>
          <header className="site-header">
            <Link className="site-brand" href="/">
              <span className="site-brand__emblem" aria-hidden="true">✦</span>
              <span><strong>{pressName}</strong><small>{strapline}</small></span>
            </Link>
            <nav aria-label="Primary navigation" className="site-nav">
              <Link href="/">Chronicles</Link>
              {pages.map((page) => <Link key={page.id} href={`/${page.slug}`}>{page.navigationLabel || page.title}</Link>)}
              <Link href="/admin">Sign in</Link>
            </nav>
          </header>
          {children}
          <footer className="site-footer">
            <div className="site-footer__brand">
              {fairy?.url && <img src={fairy.url} alt="" />}
              <div><p>Colophon of the Story Scriptorium</p><span>Penned, illuminated, and bound with a little old-world wonder.</span></div>
            </div>
            <div><p>The story library</p><Link href="/">Latest chronicles</Link>{pages.slice(0, 3).map((page) => <Link key={`footer-${page.id}`} href={`/${page.slug}`}>{page.navigationLabel || page.title}</Link>)}</div>
            <div><p>The Watermill Press</p><Link href="/admin">Scribe sign in</Link><a href="mailto:hello@example.com">Write to the press</a></div>
          </footer>
        </AppChakraProvider>
      </body>
    </html>
  )
}

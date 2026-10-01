import type { Metadata } from 'next'

import Link from 'next/link'
import { Eagle_Lake, Modern_Antiqua } from 'next/font/google'

import { AppChakraProvider } from '@/components/ChakraProvider'
import { FooterFragment, type FooterData } from '@/components/public/FooterFragment'
import { getCMS } from '@/lib/getCMS'
import './site.scss'

const eagleLake = Eagle_Lake({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-eagle-lake',
  weight: '400',
})

const modernAntiqua = Modern_Antiqua({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-modern-antiqua',
  weight: '400',
})

export const metadata: Metadata = {
  title: { default: 'Ogmious Archive', template: '%s | Ogmious Archive' },
  description: 'A medieval archive of stories and illuminated folios.',
}

// Navigation is publisher-managed CMS data, so it is fetched at request time.
export const dynamic = 'force-dynamic'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const payload = await getCMS()
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
  const footer = await payload.findGlobal({ slug: 'site-footer', depth: 0 }) as FooterData

  return (
    <html lang="en" className={`${eagleLake.variable} ${modernAntiqua.variable}`}>
      <body>
        <AppChakraProvider>
          <a className="skip-link" href="#main-content">Skip to main content</a>
          <header className="site-header">
            <Link className="site-brand" href="/" aria-label="Ogmious Archive home">
              <span className="site-brand__emblem" aria-hidden="true"><img src="/brand/ogmious-archive-hare.png" alt="" /></span>
              <span className="site-brand__wordmark" aria-hidden="true">Ogmious Archive</span>
            </Link>
            <nav aria-label="Primary navigation" className="site-nav">
              {pages.map((page) => <Link key={page.id} href={`/${page.slug}`}>{page.navigationLabel || page.title}</Link>)}
              <Link href="/admin">Sign in</Link>
            </nav>
          </header>
          {children}
          <FooterFragment footer={footer} />
        </AppChakraProvider>
      </body>
    </html>
  )
}

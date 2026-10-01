import { SimpleGrid, Stack } from '@chakra-ui/react'
import Link from 'next/link'

export type FooterLink = { label?: string | null; href?: string | null; linkType?: 'internal' | 'external' | null }
export type FooterColumn = { id?: string; heading?: string | null; links?: FooterLink[] | null }
export type FooterData = {
  introduction?: { eyebrow?: string | null; heading?: string | null; copy?: string | null }
  columns?: FooterColumn[] | null
}

const fallbackColumns: FooterColumn[] = [
  { heading: 'The story library', links: [{ label: 'Latest chronicles', href: '/' }] },
  { heading: 'The Watermill Press', links: [{ label: 'Scribe sign in', href: '/admin' }, { label: 'Write to the press', href: 'mailto:hello@example.com' }] },
]

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/i.test(href)

function FooterLinkItem({ href, label, linkType }: { href: string; label: string; linkType?: 'internal' | 'external' | null }) {
  return linkType === 'external' || isExternal(href)
    ? <a href={href}>{label}</a>
    : <Link href={href}>{label}</Link>
}

export function FooterFragment({ footer }: { footer: FooterData }) {
  const introduction = footer.introduction || {}
  const columns = footer.columns?.filter((column) => column.heading) || fallbackColumns

  return (
    <footer className="site-footer">
      <section className="site-footer__introduction" aria-labelledby="footer-introduction-heading">
        <p>{introduction.eyebrow || 'The Talehouse Press'}</p>
        <h2 id="footer-introduction-heading">{introduction.heading || 'Colophon of the Story Scriptorium'}</h2>
        <span>{introduction.copy || 'Penned, illuminated, and bound with a little old-world wonder.'}</span>
      </section>
      <SimpleGrid className="site-footer__columns" columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 8, md: 10 }}>
        {columns.map((column, index) => (
          <Stack className="site-footer__column" gap="3" key={column.id || `${column.heading}-${index}`}>
            <h2>{column.heading}</h2>
            <nav aria-label={column.heading || `Footer links ${index + 1}`}>
              {(column.links || []).filter((link) => link.label && link.href).map((link, linkIndex) => (
                <FooterLinkItem href={link.href as string} label={link.label as string} linkType={link.linkType} key={`${link.label}-${linkIndex}`} />
              ))}
            </nav>
          </Stack>
        ))}
      </SimpleGrid>
    </footer>
  )
}

'use client'

import type { ComponentProps, CSSProperties } from 'react'

import { RichText } from '@payloadcms/richtext-lexical/react'

export type RichTextData = ComponentProps<typeof RichText>['data']

type RelationshipNode = {
  relationTo?: string
  value?: string | number | { email?: string; id?: string | number; name?: string; slug?: string; title?: string }
}

const hexColorPattern = /^#(?:[\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i

function relationshipDetails(node: RelationshipNode) {
  const relationTo = node.relationTo || 'content'
  const document = typeof node.value === 'object' && node.value !== null ? node.value : null
  const id = document?.id || node.value
  const label = document?.title || document?.name || document?.email || `${relationTo} ${id || ''}`.trim()
  const slug = document?.slug

  if (!slug) return { label, href: undefined }
  if (relationTo === 'stories') return { label, href: `/stories/${slug}` }
  if (relationTo === 'pages') return { label, href: `/${slug}` }
  return { label, href: undefined }
}

/**
 * Payload's default JSX converters deliberately omit relationship nodes.
 * Supplying one here keeps the public renderer in step with the Lexical editor.
 */
export function RichTextContent({ data, color }: { data?: RichTextData; color?: string }) {
  if (!data) return null

  const style = color && hexColorPattern.test(color)
    ? ({ '--rich-text-color': color } as CSSProperties)
    : undefined

  return <div style={style}><RichText
      className="rich-text"
      data={data}
      converters={({ defaultConverters }) => ({
        ...defaultConverters,
        relationship: ({ node }: { node: RelationshipNode }) => {
          const { href, label } = relationshipDetails(node)
          return href
            ? <a className="rich-text__relationship" href={href}>{label}</a>
            : <span className="rich-text__relationship">{label}</span>
        },
      })}
    /></div>
}

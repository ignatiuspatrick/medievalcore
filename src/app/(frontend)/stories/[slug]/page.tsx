import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichTextContent } from '@/components/public/RichTextContent'

type Props = { params: Promise<{ slug: string }> }

// Story documents are live CMS data and must be loaded at request time.
export const dynamic = 'force-dynamic'

export default async function StoryPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'stories',
    where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
    depth: 2,
    limit: 1,
  })
  const story = docs[0]

  if (!story) notFound()

  const template = typeof story.layoutTemplate === 'object' ? story.layoutTemplate : null
  const image = typeof story.primaryImage === 'object' ? story.primaryImage : null

  return (
    <main className={`reader reader--${template?.readerStyle || 'standard'}`}>
      <article>
        <p className="reader__template">{template?.name || 'Standard Article'}</p>
        <h1>{story.title}</h1>
        {image?.url && <img className="reader__image" src={image.url} alt={image.alt || ''} />}
        <RichTextContent data={story.content} />
      </article>
    </main>
  )
}

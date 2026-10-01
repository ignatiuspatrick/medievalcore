import { notFound } from 'next/navigation'
import { Reader } from '@/components/public/Reader'
import { getCMS } from '@/lib/getCMS'

type Props = { params: Promise<{ slug: string }> }

// Story documents are live CMS data and must be loaded at request time.
export const dynamic = 'force-dynamic'

export default async function StoryPage({ params }: Props) {
  const { slug } = await params
  const payload = await getCMS()
  const { docs } = await payload.find({
    collection: 'stories',
    where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
    depth: 2,
    limit: 1,
  })
  const story = docs[0]

  if (!story) notFound()

  const image = typeof story.primaryImage === 'object' ? story.primaryImage : null

  // The render-style field makes this explicit on every Story. More styles can
  // be added here later without reintroducing a publisher-managed style menu.
  return <Reader content={story.content} contentColor={story.contentColor} image={image} title={story.title} />
}

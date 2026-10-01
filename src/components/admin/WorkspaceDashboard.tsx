import type { AdminViewServerProps } from 'payload'

import { FolioStudio, type FolioStory } from './FolioStudio'

type WorkspaceUser = {
  displayName?: string
  email?: string
  roles?: Array<'author' | 'publisher'>
}

type StoryRecord = {
  id: number | string
  title?: string
  slug?: string
  status?: 'draft' | 'in_review' | 'published'
  updatedAt?: string
  content?: unknown
  renderStyle?: 'reader'
}

const wordsIn = (value: unknown): number => {
  if (!value || typeof value !== 'object') return 0
  if (Array.isArray(value)) return value.reduce((total, item) => total + wordsIn(item), 0)
  const node = value as { text?: unknown; children?: unknown }
  const words = typeof node.text === 'string' ? node.text.trim().split(/\s+/).filter(Boolean).length : 0
  return words + wordsIn(node.children)
}

const excerptFrom = (value: unknown): string => {
  const collect = (node: unknown): string[] => {
    if (!node || typeof node !== 'object') return []
    if (Array.isArray(node)) return node.flatMap(collect)
    const item = node as { text?: unknown; children?: unknown }
    return [typeof item.text === 'string' ? item.text : '', ...collect(item.children)].filter(Boolean)
  }
  return collect(value).join(' ').slice(0, 180)
}

export async function WorkspaceDashboard({ initPageResult }: AdminViewServerProps) {
  const user = initPageResult.req.user as WorkspaceUser | undefined
  const result = await initPageResult.req.payload.find({
    collection: 'stories',
    depth: 1,
    limit: 40,
    overrideAccess: false,
    req: initPageResult.req,
    sort: '-updatedAt',
  })

  const stories: FolioStory[] = result.docs.map((document) => {
    const story = document as StoryRecord
    return {
      id: String(story.id),
      title: story.title || 'Untitled folio',
      slug: story.slug || '',
      status: story.status || 'draft',
      updatedAt: story.updatedAt || new Date().toISOString(),
      excerpt: excerptFrom(story.content) || 'Begin composing this folio in the manuscript editor.',
      wordCount: wordsIn(story.content),
      renderStyle: story.renderStyle === 'reader' ? 'Reader' : 'Reader',
    }
  })

  return <FolioStudio displayName={user?.displayName || user?.email?.split('@')[0] || 'Author'} isPublisher={Boolean(user?.roles?.includes('publisher'))} stories={stories} />
}

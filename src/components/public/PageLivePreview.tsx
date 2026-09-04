'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { PageRenderer, type PageData, type PageOrnaments, type PageStory } from './PageRenderer'

export function PageLivePreview({ initialPage, recentStories, ornaments, serverURL }: { initialPage: PageData; recentStories: PageStory[]; ornaments: PageOrnaments; serverURL: string }) {
  const { data } = useLivePreview<PageData>({ initialData: initialPage, serverURL, depth: 2 })
  return <PageRenderer page={data} recentStories={recentStories} ornaments={ornaments} />
}

import type { CollectionConfig } from 'payload'

import { HeroBannerBlock } from '@/blocks/HeroBannerBlock'
import { CustomTextBlock } from '@/blocks/CustomTextBlock'
import { SplitPhotoColumnBlock } from '@/blocks/SplitPhotoColumnBlock'
import { StoryGridBlock } from '@/blocks/StoryGridBlock'
import { TitleBlock } from '@/blocks/TitleBlock'
import { ParagraphBlock } from '@/blocks/ParagraphBlock'
import { TeaserBlock } from '@/blocks/TeaserBlock'
import { AccordionBlock } from '@/blocks/AccordionBlock'
import { CarouselBlock } from '@/blocks/CarouselBlock'
import { ContainerBlock } from '@/blocks/ContainerBlock'
import { LandingPageBlock } from '@/blocks/LandingPageBlock'
import { TeaserCollectionBlock } from '@/blocks/TeaserCollectionBlock'
import { ImageBlock } from '@/blocks/ImageBlock'
import { ButtonBlock } from '@/blocks/ButtonBlock'
import { isPublisher, publisherOnly } from '@/access/roles'
import { generateSlug } from '@/hooks/generateSlug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', group: 'Publisher / Site Builder', hidden: ({ user }) => !isPublisher(user) },
  versions: { drafts: true },
  hooks: { beforeValidate: [generateSlug('pages')] },
  access: { read: () => true, create: publisherOnly, update: publisherOnly, delete: publisherOnly },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { description: 'Optional on creation. Generated from the title when empty; editable afterwards.' } },
    {
      name: 'presentation',
      label: 'Page template',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard page builder', value: 'standard' },
        { label: 'Landing page', value: 'landing' },
      ],
      admin: { position: 'sidebar', description: 'Use the Landing page preset block for its complete hero and story-library composition.' },
    },
    {
      name: 'showInNavigation',
      label: 'Show in site navigation',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'navigationLabel',
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => Boolean(siblingData.showInNavigation),
        description: 'Uses the page title when left empty.',
      },
    },
    {
      name: 'navigationOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => Boolean(siblingData.showInNavigation),
        description: 'Lower values appear first.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [LandingPageBlock, ContainerBlock, TitleBlock, ParagraphBlock, ImageBlock, ButtonBlock, TeaserBlock, TeaserCollectionBlock, AccordionBlock, CarouselBlock, HeroBannerBlock, StoryGridBlock, SplitPhotoColumnBlock, CustomTextBlock],
    },
  ],
}

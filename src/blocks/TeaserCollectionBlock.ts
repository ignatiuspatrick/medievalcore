import type { Block, Field } from 'payload'

import { AccordionBlock } from '@/blocks/AccordionBlock'
import { ButtonBlock } from '@/blocks/ButtonBlock'
import { CarouselBlock } from '@/blocks/CarouselBlock'
import { CustomTextBlock } from '@/blocks/CustomTextBlock'
import { surfaceField } from '@/blocks/fields/surface'
import { HeroBannerBlock } from '@/blocks/HeroBannerBlock'
import { ImageBlock } from '@/blocks/ImageBlock'
import { LandingPageBlock } from '@/blocks/LandingPageBlock'
import { ParagraphBlock } from '@/blocks/ParagraphBlock'
import { SplitPhotoColumnBlock } from '@/blocks/SplitPhotoColumnBlock'
import { StoryGridBlock } from '@/blocks/StoryGridBlock'
import { TeaserBlock } from '@/blocks/TeaserBlock'
import { TitleBlock } from '@/blocks/TitleBlock'

const legacyArticleCardFields: Field[] = [
  { name: 'eyebrow', type: 'text' },
  { name: 'heading', type: 'text', required: true },
  { name: 'description', type: 'textarea' },
  { name: 'image', label: 'Image (optional)', type: 'upload', relationTo: 'media' },
  { name: 'linkLabel', label: 'Link label (optional)', type: 'text' },
  {
    name: 'linkType', label: 'Destination type', type: 'select', defaultValue: 'internal',
    options: [{ label: 'Internal page or path', value: 'internal' }, { label: 'External URL', value: 'external' }],
    admin: { condition: (_, siblingData) => Boolean(siblingData.linkLabel) },
  },
  {
    name: 'linkHref', label: 'Destination URL', type: 'text',
    admin: { condition: (_, siblingData) => Boolean(siblingData.linkLabel), description: 'Internal: /about-mia. External: https://example.com.' },
  },
]

/**
 * Payload validates every source-palette block on paste. This mirrors a page
 * section for validation while the picker itself remains Article-card-only.
 */
const ArticleCardGroupContainerCompatibilityBlock: Block = {
  slug: 'container',
  interfaceName: 'ArticleCardGroupContainerCompatibilityBlock',
  labels: { singular: 'Section container', plural: 'Section containers' },
  fields: [
    surfaceField('Section background color', 'primary'),
    { name: 'padding', type: 'select', options: [{ label: 'Medium', value: 'medium' }] },
    { name: 'contentBlocks', type: 'blocks', blocks: [TitleBlock] },
  ],
}

const ArticleCardGroupCompatibilityBlock: Block = {
  slug: 'teaserCollection',
  interfaceName: 'ArticleCardGroupCompatibilityBlock',
  labels: { singular: 'Article card group', plural: 'Article card groups' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    { name: 'columns', type: 'select', options: [{ label: 'Three cards', value: '3' }] },
    { name: 'initialVisible', type: 'number' },
    { name: 'articleCards', type: 'blocks', blocks: [TeaserBlock] },
    { name: 'teasers', type: 'array', fields: legacyArticleCardFields },
  ],
}

const articleCardClipboardPalette: Block[] = [
  LandingPageBlock,
  ArticleCardGroupContainerCompatibilityBlock,
  TitleBlock,
  ParagraphBlock,
  ImageBlock,
  ButtonBlock,
  TeaserBlock,
  ArticleCardGroupCompatibilityBlock,
  AccordionBlock,
  CarouselBlock,
  HeroBannerBlock,
  StoryGridBlock,
  SplitPhotoColumnBlock,
  CustomTextBlock,
]

export const TeaserCollectionBlock: Block = {
  slug: 'teaserCollection',
  interfaceName: 'TeaserCollectionBlock',
  labels: { singular: 'Article card group', plural: 'Article card groups' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'eyebrow', label: 'Eyebrow', type: 'text', admin: { description: 'Optional maroon overline displayed above the title.' } },
    { name: 'heading', label: 'Title', type: 'text' },
    { name: 'intro', label: 'Introduction', type: 'textarea' },
    surfaceField('Background color', 'primary'),
    {
      name: 'columns',
      label: 'Cards per row',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: 'Two cards', value: '2' },
        { label: 'Three cards', value: '3' },
        { label: 'Four cards', value: '4' },
      ],
    },
    {
      name: 'initialVisible',
      label: 'Cards shown before “Expand”',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: { description: 'Extra cards are initially collapsed. Readers can expand the collection and collapse it again.' },
    },
    {
      name: 'articleCards',
      label: 'Article cards',
      type: 'blocks',
      minRows: 1,
      blocks: articleCardClipboardPalette,
      filterOptions: ['teaser'],
      admin: { description: 'Add or paste reusable Article card components here.' },
    },
    {
      name: 'teasers',
      label: 'Legacy article cards',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Article card', plural: 'Article cards' },
      fields: legacyArticleCardFields,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.teasers?.length),
        description: 'Existing cards are preserved here. Add new cards through the Article cards field above.',
      },
    },
  ],
}

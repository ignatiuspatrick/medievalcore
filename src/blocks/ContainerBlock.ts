import type { Block } from 'payload'

import { AccordionBlock } from '@/blocks/AccordionBlock'
import { CarouselBlock } from '@/blocks/CarouselBlock'
import { CustomTextBlock } from '@/blocks/CustomTextBlock'
import { HeroBannerBlock } from '@/blocks/HeroBannerBlock'
import { ParagraphBlock } from '@/blocks/ParagraphBlock'
import { SplitPhotoColumnBlock } from '@/blocks/SplitPhotoColumnBlock'
import { StoryGridBlock } from '@/blocks/StoryGridBlock'
import { TeaserBlock } from '@/blocks/TeaserBlock'
import { TeaserCollectionBlock } from '@/blocks/TeaserCollectionBlock'
import { ImageBlock } from '@/blocks/ImageBlock'
import { ButtonBlock } from '@/blocks/ButtonBlock'
import { LandingPageBlock } from '@/blocks/LandingPageBlock'
import { NestedContainerBlock } from '@/blocks/NestedContainerBlock'
import { TitleBlock } from '@/blocks/TitleBlock'

/**
 * A section is deliberately not allowed to contain another section. This keeps
 * page composition approachable while still letting every content block be
 * grouped, padded, and given a shared surface.
 */
export const ContainerBlock: Block = {
  slug: 'container',
  interfaceName: 'ContainerBlock',
  labels: { singular: 'Section container', plural: 'Section containers' },
  fields: [
    {
      name: 'background',
      label: 'Section surface',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary sage', value: 'primary' },
        { label: 'Secondary sage', value: 'secondary' },
        { label: 'Transparent', value: 'transparent' },
        // Kept while existing Pages are migrated to the new primary/secondary palette.
        { label: 'Parchment (legacy)', value: 'parchment' },
        { label: 'Sage wash (legacy)', value: 'sage' },
        { label: 'Ink (legacy)', value: 'ink' },
      ],
    },
    {
      name: 'padding',
      label: 'Inner spacing',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Medium', value: 'medium' },
        { label: 'Spacious', value: 'spacious' },
      ],
    },
    {
      name: 'contentBlocks',
      label: 'Section content',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [
        LandingPageBlock,
        NestedContainerBlock,
        TitleBlock,
        ParagraphBlock,
        ImageBlock,
        ButtonBlock,
        TeaserBlock,
        TeaserCollectionBlock,
        AccordionBlock,
        CarouselBlock,
        HeroBannerBlock,
        StoryGridBlock,
        SplitPhotoColumnBlock,
        CustomTextBlock,
      ],
    },
  ],
}

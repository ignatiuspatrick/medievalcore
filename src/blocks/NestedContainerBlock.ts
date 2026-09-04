import type { Block } from 'payload'

import { AccordionBlock } from '@/blocks/AccordionBlock'
import { ButtonBlock } from '@/blocks/ButtonBlock'
import { CarouselBlock } from '@/blocks/CarouselBlock'
import { CustomTextBlock } from '@/blocks/CustomTextBlock'
import { HeroBannerBlock } from '@/blocks/HeroBannerBlock'
import { ImageBlock } from '@/blocks/ImageBlock'
import { LandingPageBlock } from '@/blocks/LandingPageBlock'
import { ParagraphBlock } from '@/blocks/ParagraphBlock'
import { SplitPhotoColumnBlock } from '@/blocks/SplitPhotoColumnBlock'
import { StoryGridBlock } from '@/blocks/StoryGridBlock'
import { TeaserBlock } from '@/blocks/TeaserBlock'
import { TeaserCollectionBlock } from '@/blocks/TeaserCollectionBlock'
import { TitleBlock } from '@/blocks/TitleBlock'

/**
 * Payload validates a copied block against every block available at its source
 * and destination. This mirrors the top-level section's fields so a Text (or
 * any other block) can be copied into a section without failing validation.
 * Its children deliberately do not include another section, keeping nesting
 * to one useful, readable level.
 */
export const NestedContainerBlock: Block = {
  slug: 'container',
  interfaceName: 'NestedContainerBlock',
  labels: { singular: 'Nested section container', plural: 'Nested section containers' },
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

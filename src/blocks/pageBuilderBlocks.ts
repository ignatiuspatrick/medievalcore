import type { Block } from 'payload'

import { AccordionBlock } from '@/blocks/AccordionBlock'
import { ButtonBlock } from '@/blocks/ButtonBlock'
import { CarouselBlock } from '@/blocks/CarouselBlock'
import { ContainerBlock } from '@/blocks/ContainerBlock'
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

/** The one palette shared by Page documents and reusable Page Templates. */
export const pageBuilderBlocks: Block[] = [
  LandingPageBlock,
  ContainerBlock,
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
]

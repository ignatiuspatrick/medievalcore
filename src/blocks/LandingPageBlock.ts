import type { Block } from 'payload'

export const LandingPageBlock: Block = {
  slug: 'landingPage',
  interfaceName: 'LandingPageBlock',
  labels: { singular: 'Landing page preset', plural: 'Landing page presets' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'The Watermill Press presents' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Chronicles, folklore & hand-bound tales' },
    { name: 'intro', type: 'textarea', defaultValue: 'A living library of intimate stories, old-world wonder, and folklore waiting to be read by lantern light.' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Explore the story library' },
    { name: 'ctaHref', type: 'text', defaultValue: '#latest-stories' },
    { name: 'storiesHeading', type: 'text', defaultValue: 'Newly illuminated folios' },
  ],
}

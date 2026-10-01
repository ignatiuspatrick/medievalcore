import type { Block } from 'payload'

export const LandingPageBlock: Block = {
  slug: 'landingPage',
  interfaceName: 'LandingPageBlock',
  labels: { singular: 'Chronicles landing preset', plural: 'Chronicles landing presets' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'The Watermill Press presents' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Chronicles, folklore & hand-bound tales' },
    { name: 'intro', type: 'textarea', defaultValue: 'A living library of intimate stories, old-world wonder, and folklore waiting to be read by lantern light.' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Explore the story library' },
    {
      name: 'ctaLinkType', label: 'Primary button destination type', type: 'select', defaultValue: 'internal',
      options: [{ label: 'Internal page or path', value: 'internal' }, { label: 'External URL', value: 'external' }],
    },
    { name: 'ctaHref', label: 'Primary button destination URL', type: 'text', defaultValue: '#latest-stories', admin: { description: 'Internal: /about-mia or #latest-stories. External: https://example.com.' } },
    { name: 'storiesHeading', type: 'text', defaultValue: 'Newly illuminated folios' },
    { name: 'dispatchHeading', label: 'Dispatch heading', type: 'text', defaultValue: 'Keep a place by the fire.' },
    { name: 'dispatchCopy', label: 'Dispatch copy', type: 'textarea', defaultValue: 'New tales, editorial notes, and seasonal dispatches from the Watermill Press.' },
    { name: 'dispatchCtaLabel', label: 'Dispatch button label', type: 'text', defaultValue: 'Write to the press' },
    {
      name: 'dispatchCtaLinkType', label: 'Dispatch button destination type', type: 'select', defaultValue: 'external',
      options: [{ label: 'Internal page or path', value: 'internal' }, { label: 'External URL', value: 'external' }],
    },
    { name: 'dispatchCtaHref', label: 'Dispatch button destination URL', type: 'text', defaultValue: 'mailto:hello@example.com', admin: { description: 'Internal: /about-mia. External: https://example.com or mailto:hello@example.com.' } },
  ],
}

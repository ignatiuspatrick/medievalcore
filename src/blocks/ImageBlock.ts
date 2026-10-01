import type { Block } from 'payload'

import { surfaceField } from '@/blocks/fields/surface'
import { textColorField } from '@/blocks/fields/textColor'

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  labels: { singular: 'Image', plural: 'Images' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'image', label: 'Image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    { name: 'content', label: 'Image text', type: 'richText', admin: { description: 'Optional text displayed on top of the image.' } },
    textColorField('textColor', 'Image text color'),
    {
      name: 'textPlacement',
      label: 'Image text placement',
      type: 'select',
      defaultValue: 'middle',
      options: [
        { label: 'Top left', value: 'topLeft' },
        { label: 'Top right', value: 'topRight' },
        { label: 'Bottom left', value: 'bottomLeft' },
        { label: 'Bottom right', value: 'bottomRight' },
        { label: 'Middle of the image', value: 'middle' },
      ],
      admin: { condition: (_, siblingData) => Boolean(siblingData.content), description: 'Choose where the optional image text sits.' },
    },
    {
      name: 'width',
      label: 'Image width',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full bleed', value: 'full' },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    surfaceField('Background color', 'transparent'),
    surfaceField('Frame color', '#fdfaf1', 'frameColor'),
  ],
}

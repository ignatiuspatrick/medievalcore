import type { Field } from 'payload'

const hexColorPattern = /^#(?:[\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i

/** Optional presentation color for content authored in a Lexical rich-text field. */
export const textColorField = (name = 'textColor', label = 'Text color'): Field => ({
  name,
  label,
  type: 'text',
  validate: (value: unknown) => !value || (typeof value === 'string' && hexColorPattern.test(value)) || 'Enter a valid hex color, such as #365546.',
  admin: {
    components: { Field: '@/components/admin/HexColorPicker#HexColorPicker' },
    description: 'Optional. Choose a color from the picker.',
  },
})

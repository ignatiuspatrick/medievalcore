import type { CollectionBeforeValidateHook } from 'payload'

/**
 * Copies a reusable Page Template into a Page when an editor explicitly asks
 * to apply it. Pages receive a snapshot, so later template edits never erase
 * content that has already been tailored for a specific page.
 */
export const applyPageTemplate: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (!data?.applyLayoutTemplate || !data.layoutTemplate) return data

  const templateID = typeof data.layoutTemplate === 'object'
    ? data.layoutTemplate.id
    : data.layoutTemplate

  if (!templateID) return data

  const template = await req.payload.findByID({
    collection: 'page-templates',
    id: templateID,
    depth: 0,
    overrideAccess: true,
  })

  if (!Array.isArray(template.layout) || template.layout.length === 0) {
    throw new Error('The selected Page Template has no layout blocks to apply.')
  }

  // A JSON clone prevents mutations to this document from sharing references
  // with the template returned by Payload.
  data.layout = JSON.parse(JSON.stringify(template.layout))
  data.applyLayoutTemplate = false
  return data
}

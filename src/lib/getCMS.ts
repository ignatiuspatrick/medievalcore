import 'server-only'

import { getPayload } from 'payload'

import config from '@payload-config'
import { importMap } from '@/app/(payload)/admin/importMap.js'

/**
 * Initializes Payload with the same component map on every server route.
 *
 * Payload keeps one process-level instance. If a public route initialized it
 * without this map first, client-side navigation into the admin could not
 * render Lexical fields until a full browser refresh.
 */
export const getCMS = () => getPayload({ config, importMap })

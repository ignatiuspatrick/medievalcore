import type { ServerFunctionClient } from 'payload'

import '@payloadcms/next/css'

import config from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
// Payload generates this map from the active collections, fields, and admin
// components. Keep the admin on this complete map so rich-text fields and
// their Lexical toolbar features can mount correctly.
import { importMap } from './admin/importMap.js'
import './custom.scss'

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>{children}</RootLayout>
}

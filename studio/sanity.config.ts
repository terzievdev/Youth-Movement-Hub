import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'nextgen-bulgaria',
  title: 'NEXT GEN BULGARIA',
  projectId: 'qrrji2vr',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

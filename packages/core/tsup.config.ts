import { defineConfig } from 'tsup'
import path from 'path'

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'styles/index': 'src/styles/index.ts',
    'recipes/index': 'src/recipes/index.ts',
    'linter/index': 'src/linter/index.ts',
    'knowledge/index': 'src/knowledge/index.ts',
    'accessibility/index': 'src/accessibility/index.ts',
    'quality/index': 'src/quality/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  esbuildOptions(options) {
    options.alias = {
      '@/lib': path.resolve(__dirname, '../../lib'),
    }
  },
})

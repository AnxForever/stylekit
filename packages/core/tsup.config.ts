import { defineConfig } from 'tsup'
import path from 'path'

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'styles/index': 'src/styles/index.ts',
    'recipes/index': 'src/recipes/index.ts',
    'accessibility/index': 'src/accessibility/index.ts',
    'discovery/index': 'src/discovery/index.ts',
    'prompt/index': 'src/prompt/index.ts',
    'export/index': 'src/export/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  // Reduce emitted syntax while retaining readable identifier names.
  minifyWhitespace: true,
  esbuildOptions(options) {
    options.alias = {
      '@/lib': path.resolve(__dirname, '../../lib'),
    }
  },
})

import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: { path: './src/openapi.json' },
  output: {
    path: 'src/client',
    postProcess: [{ command: 'prettier', args: ['--write', '{{path}}', '--ignore-unknown'] }],
  },
  plugins: ['@hey-api/typescript'],
})

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['dotenv/config'],
    include: ['__tests__/**/*.test.ts'],
    coverage: {
      enabled: true,
      include: ['src/**/*.ts'],
      exclude: ['src/client/**'],
      thresholds: {
        100: true,
      },
    },
  },
})

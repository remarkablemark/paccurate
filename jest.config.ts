import type { Config } from 'jest'

const config: Config = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
}

export default config

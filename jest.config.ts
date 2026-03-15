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
  moduleFileExtensions: ['js', 'ts'],
  reporters:
    process.env.CI === 'true' ? [['github-actions', { silent: false }], 'summary'] : undefined,
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }],
  },
}

export default config

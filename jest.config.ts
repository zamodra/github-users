import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // 👈 This allows Jest to recognize `@/`
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",  // ✅ Include Next.js app directory
    "lib/**/*.{ts,tsx}",  // ✅ Include utility and hooks
    "!**/node_modules/**", // ❌ Exclude dependencies
    "!**/*.d.ts",          // ❌ Exclude type definitions
    "!app/(api)/**",       // ❌ Exclude API routes if you don’t want to test them
    "!**/layout.tsx",      // Exclude all layout.tsx files
  ],
  coverageReporters: ["json", "text", "lcov", "clover"], // ✅ Different formats
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
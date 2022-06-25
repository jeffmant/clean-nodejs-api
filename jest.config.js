module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.protocols.ts',
    '!<rootDir>/src/**/*.factory.ts',
    '!<rootDir>/src/main/decorators/**',
    '!<rootDir>/src/main/adapters/**',
    '!<rootDir>/src/main/config/**',
    '!<rootDir>/src/main/server.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1'
  }
}

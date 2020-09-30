
module.exports = {
  testMatch: ['<rootDir>/src/**/*.spec.js', '<rootDir>/src/*.spec.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  coverageDirectory: '<rootDir>/.reports/coverage/',
  reporters: ['default', 'jest-junit'],
  collectCoverage: true,
  coverageReporters: [
    'lcov',
    'html'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    'src/*.{js,jsx}',
    '!src/static/**/*.{js,jsx}',
    '!**/*.spec.js',
    '!**/node_modules/**',
    '!**/vendor/**'
  ]
}
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'json-summary', 'lcov', 'clover'],
  collectCoverageFrom: ['mixins/**/*.js', 'services/**/*.js'],
  coveragePathIgnorePatterns: ['node_modules']
}

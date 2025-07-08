/** @type {import('jest').Config} */
export default {
  transform: {},
  projects: [
    {
      displayName: 'dom-tests',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/scripts/**/calculator.test.js'],
    },
    {
      displayName: 'node-tests',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/scripts/**/calcCommands.test.js'],
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/setupAfterEnv.ts"],
  testEnvironment: "jest-environment-jsdom",
  coverageReporters: ["clover", "text", "json", "lcov"],
  coverageDirectory: "./coverage",
  globals: { fetch },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(config);

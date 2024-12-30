import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
    "\\.(css|scss|sass)$": "jest-transform-css",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx",
    "!src/setupTests.ts",
  ],
  coverageReporters: ["text", "lcov", "json", "clover"],
  transformIgnorePatterns: ["/node_modules/(?!(some-esm-package)/)"],
};

export default config;

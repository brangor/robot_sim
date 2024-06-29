import type { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.ts$": "@swc/jest",
  },
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
};

export default config;

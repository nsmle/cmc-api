import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

export default async (): Promise<Config> => ({
  verbose: true,
  testMatch: ["**/tests/**/?(*.)+(spec|test).[tj]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testTimeout: 30000,
});

module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/testing/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
          target: "es2022",
          esModuleInterop: true,
          strict: true,
          skipLibCheck: true,
          types: ["jest", "node"],
        },
      },
    ],
  },
};
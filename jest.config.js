module.exports = {
  roots: ["<rootDir>/src"],
  //   transform: {
  //     "^.+\\.tsx?$": "ts-jest"
  //   },
  preset: "ts-jest",
  testEnvironment: "node",
  //   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // Setup Enzyme
  //   snapshotSerializers: ["enzyme-to-json/serializer"],
  setupTestFrameworkScriptFile: "<rootDir>/src/setupEnzyme.ts"
};

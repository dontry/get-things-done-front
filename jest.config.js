const path = require("path");
module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  preset: "ts-jest",
  moduleDirectories: ["node_modules"],
  //   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // Setup Enzyme
  //   snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "@stores": "<rootDir>/src/stores",
    "@actions": "<rootDir>/src/actions",
    src: "<rootDir>/src",
    "\\.css$": "<rootDir>/src/test/fixture/styleMock.ts"
  },
  setupTestFrameworkScriptFile: "<rootDir>/src/setupEnzyme.ts",
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"]
};

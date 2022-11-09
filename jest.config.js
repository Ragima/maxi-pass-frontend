module.exports = {
    collectCoverage: true,
    moduleFileExtensions: [
        "js",
        "jsx",
        "json",
    ],
    globals: {
        window: true, 
    },
    collectCoverageFrom: ["**/*.jsx", "**/*.js"],
    moduleDirectories: ["node_modules", ".", "__mocks__", "components", "helpers", "pages", "redux"],
    testMatch: [
        "**/*.(test|spec).(js)",
    ],
    setupFilesAfterEnv: ["<rootDir>/test.setup.js"],
    coverageReporters: [
        "json",
        "lcov",
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "jest.config.js",
        "next.config.js",
        "test.setup.js",
        "/locales/",
        "/coverage/",
        "pages/_document.js",
        "pages/_app.js",
        "pages/index.js",
        "redux/store.js",
        "api_layer/requests",
        "redux/sagas/index.js",
        "styled_components/Global",
        "redux/reducers/index",
    ],
    moduleNameMapper: {
        "^.+\\.(css|scss)$": "identity-obj-proxy",
    },
};

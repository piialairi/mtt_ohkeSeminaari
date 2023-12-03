module.exports = {
    preset: '@testing-library/react',
    displayName: 'frontend',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect",
        "ohke_seminaari/mtt/frontend/src/test/setupTests.js"],
    transform: {
        '^.+\\.jsx?$': ['babel-jest', 'vite-jest'],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(vite|vite-plugin-react|@vitejs)/)',
    ],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        "^.+\\.svg$": "jest-svg-transformer",
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    moduleFileExtensions: ['js', 'jsx'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
            jsx: 'react',
        },
    },
};

const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    screenshotsFolder: 'cypress/allure-results/screenshots',
    videosFolder: 'cypress/reports/videos',
    video: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    responseTimeout: 30000,
    requestTimeout: 30000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      allure: true,
      allureResultsPath: 'cypress/allure-results',
      apiBaseUrl: 'https://petstore.swagger.io/v2',
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      allureWriter(on, config);
      return config;
    },
  },
});
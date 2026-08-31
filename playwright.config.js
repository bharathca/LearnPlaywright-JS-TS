import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  retries:2,
  expect: {
    timeout: 40 * 1000
  },
  reporter: [['line'], ['html', { open: 'never' }], ['allure-playwright']],
  use: {
    browserName: 'chromium',
    headless: false,
    launchOptions: {
      args: ['--start-maximized'], // 1. Start browser maximized
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure'
  },
});

//npm run WebTests
//npm run regressionTests
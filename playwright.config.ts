import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },
  reporter: [['html', { open: 'never' }], ['line'], ['allure-playwright']],
  use: {
    browserName: 'chromium',
    headless: false,
    launchOptions: {
      args: ['--start-maximized'],
    },
    viewport: null,
  },
});
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  retries: 2,
  expect: {
    timeout: 40 * 1000
  },
  reporter: 'html',
  //projects can be used to define multiple browsers execution 
  // we can even use --projects and mention the name and execute 
  // -> npx playwright test --config=playwrightConfigLearning.config.js --project=safari
  projects: [{
    name: "chrome",
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

  }, {
    name: "safari",
    use: {
      browserName: 'webkit',
      headless: false,
      launchOptions: {
        args: ['--start-maximized'], // 1. Start browser maximized
      },
      viewport: { width: 1080, height: 1080 },
      screenshot: 'only-on-failure',
      trace: 'retain-on-failure',
      ignoreHTTPSErrors: true,
      video: 'retain-on-failure'
    },
  },
  {
    name: "iPhone13Pro",
    use: {
      browserName: 'chromium',
      headless: false,
      launchOptions: {
        args: ['--start-maximized'], // 1. Start browser maximized
      },
      ...devices['iPhone 13 Pro'],
      screenshot: 'only-on-failure',
      trace: 'retain-on-failure',
      ignoreHTTPSErrors: true,
      video: 'retain-on-failure'
    },
  }
  ]
});
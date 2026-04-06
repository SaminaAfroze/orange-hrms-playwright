import { defineConfig, devices } from '@playwright/test';
import { env } from './utils/env';
import { browserConfig } from './config/browserConfig';

// Optional: Map browser name to device profiles
const deviceMap = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // one by one test run
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1, // sequential run

  use: {
    baseURL: env.BASE_URL,
    headless: env.HEADLESS,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  webServer: {
    command:
      'powershell -ExecutionPolicy Bypass -File ./scripts/start-xampp.ps1',
    url: env.BASE_URL,
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },

  // Dynamically select browser and device settings from config
  projects: [
    {
      name: browserConfig.browserName,
      use: {
        ...deviceMap[browserConfig.browserName],
      },
    },
  ],

   reporter: [
    ['list'], 
    ['monocart-reporter', {
      name: "My Test Report",
      outputFile: './monocart-report/index.html',
      customFieldsInComments: true
    }]
  ],
  
});

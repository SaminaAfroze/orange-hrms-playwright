import { defineConfig, devices } from '@playwright/test';
import { ENV } from './configs/env';
import { browserConfig } from './configs/config';

// Optional: Map browser name to device profiles
const deviceMap = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  // Global context-level options
  use: {
    baseURL: ENV.baseURL,
    headless: browserConfig.headless,
    trace: 'on-first-retry',
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
});

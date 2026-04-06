import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { env } from '../utils/env';


export const test = baseTest.extend<{
  login: () => Promise<void>;
}>({
  login: async ({ page }, use) => {
    const doLogin = async () => {
      const loginPage = new LoginPage(page);
      await page.goto(`${env.BASE_URL}/web/index.php/auth/login`);
      await loginPage.login(env.HRMS_USERNAME, env.HRMS_PASSWORD);
    };
    await use(doLogin);
  },
});

// add this to automatically login before each test
test.beforeEach(async ({ login }) => {
  await login();
});





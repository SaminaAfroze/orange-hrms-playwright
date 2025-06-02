import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../utils/env';


export const test = baseTest.extend<{
  login: () => Promise<void>;
}>({
  login: async ({ page }, use) => {
    const doLogin = async () => {
      const loginPage = new LoginPage(page);
      await page.goto(`${ENV.baseURL}/web/index.php/auth/login`);
      await loginPage.login(ENV.username, ENV.password);
    };

    await use(doLogin); 
  },
});


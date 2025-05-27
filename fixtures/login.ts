import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../configs/env';

export const test = base.extend<{
  login: () => Promise<void>;
}>({
  login: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto(`${ENV.baseURL}/web/index.php/auth/login`);
    await loginPage.login(ENV.username, ENV.password);
    await use(() => Promise.resolve());
  },
});

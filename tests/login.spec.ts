// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../utils/env';

test('Login with valid credentials should succeed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(`${ENV.baseURL}/web/index.php/auth/login`);
  await loginPage.login(ENV.username, ENV.password);
 await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});

test('Login with invalid credentials should show error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(`${ENV.baseURL}/web/index.php/auth/login`);
  await loginPage.login('wronguser', 'wrongpass');
  await expect(page.locator('text=Invalid credentials')).toBeVisible(); 
});

test('Login page should have all required UI elements', async ({ page }) => {
  await page.goto(`${ENV.baseURL}/web/index.php/auth/login`);
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

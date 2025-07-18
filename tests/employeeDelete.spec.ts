import { test } from '../fixtures/loginFixture';
import { expect } from '@playwright/test';
import { EmployeeSearchPage } from '../utils/EmployeeSearchPage';
import { EmployeeDeletePage } from '../pages/EmployeeDeletePage';
import fs from 'fs';
import path from 'path';

test('Delete employee by ID', async ({ page, login }) => {
  //await login();

  const dataPath = path.join(__dirname, '../testData/employee.json');
  const { employeeId } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const searchPage = new EmployeeSearchPage(page);
  const deletePage = new EmployeeDeletePage(page);

  await searchPage.openEmployeeList();
  await searchPage.searchEmployee(employeeId);
  await deletePage.deleteEmployeeById(employeeId);

  // Wait for the success toast to appear and disappear
  const successToast = page.locator('text=Successfully Deleted');
  await expect(successToast).toBeVisible({ timeout: 5000 });
  await expect(successToast).toBeHidden({ timeout: 5000 });

  // Now verify employee no longer exists
  await searchPage.searchEmployee(employeeId);
  const rowsCount = await page.locator('.oxd-table-row').count();
  expect(rowsCount).toBe(0);
});

import { test } from '../fixtures/loginFixture';
import { expect } from '@playwright/test';
import { EmployeeEditPage } from '../pages/EmployeeEditPage';
import { EmployeeSearchPage } from '../utils/EmployeeSearchPage';
import fs from 'fs';
import path from 'path';

test('Edit Other Id field and verify', async ({ page }) => {
  // Load saved employee data
  const dataPath = path.join(__dirname, '../testData/employee.json');
  const { employeeId } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const searchPage = new EmployeeSearchPage(page);
  const employeeEditPage = new EmployeeEditPage(page);

  // Navigate and search employee using helper
  await searchPage.openEmployeeList();
  await searchPage.searchEmployee(employeeId);

  // Click edit button via edit page method
  await employeeEditPage.clickEditForEmployee(employeeId);

  // Edit Other Id
  const otherId = 'OTH12345';
  await employeeEditPage.fillOtherId(otherId);
  await employeeEditPage.saveChanges();

  // Verify updated Other Id
  const updatedOtherId = await employeeEditPage.getOtherIdValue();
  expect(updatedOtherId).toBe(otherId);
});

import { test } from '../fixtures/loginFixture';
import { expect } from '@playwright/test';
import { EmployeeAddPage } from '../pages/EmployeeAddPage';
import { EmployeeSearchPage } from '../utils/EmployeeSearchPage';
import fs from 'fs';
import path from 'path';

test('Add new employee and verify by employee ID', async ({ page }) => {
  const employeeAdd = new EmployeeAddPage(page);
  const searchPage = new EmployeeSearchPage(page);

  const firstName = 'Samina';
  const middleName = 'Afroze';
  const lastName = 'Nipun';

  const employeeId = `EMP${Math.floor(1000 + Math.random() * 9000)}`;

  await employeeAdd.openAddvacancy();

  // Fill in the Employee ID
  const labelLocator = page.locator('label:text("Employee Id")');
  const inputLocator = labelLocator.locator('..').locator('..').locator('input');
  await inputLocator.fill(employeeId);

  // Submit form
  await employeeAdd.addNewEmployee(firstName, middleName, lastName, employeeId);

  // Save data to JSON
  const data = { employeeId, firstName, middleName, lastName };
  fs.mkdirSync(path.join(__dirname, '../testData'), { recursive: true });
  fs.writeFileSync(
    path.join(__dirname, '../testData/employee.json'),
    JSON.stringify(data, null, 2)
  );

  // Verify in employee list using the helper
  await searchPage.openEmployeeList();
  await searchPage.searchEmployee(employeeId);

  // Additional explicit assert for the employee row count > 0
  const rowsCount = await page.locator(`.oxd-table-row:has-text("${employeeId}")`).count();
  expect(rowsCount).toBeGreaterThan(0);
});

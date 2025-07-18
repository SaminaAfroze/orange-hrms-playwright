import { test } from '../fixtures/loginFixture';
import { expect } from '@playwright/test';
import { PimCsvImportPage } from '../pages/PimCsvImportPage';
import path from 'path';
import fs from 'fs';


test('Ensure Page 2 exists or upload CSV to create data', async ({ page }) => {
  // Step 1: Go to the Employee List page
   const importCSV = new PimCsvImportPage(page);
    importCSV.employeeList()

  // Step 2: Try to detect pagination to page 2
  let page2Visible = false;
  try {
    const page2Locator = page.locator('ul.oxd-pagination__ul li >> text=2');
    await expect(page2Locator).toBeVisible({ timeout: 3000 });
    page2Visible = true;
    console.log('Page 2 is already visible.');
  } catch (e) {
    console.log('Page 2 not found — will upload new employee CSV to trigger pagination.');
  }

  // Step 3: If no page 2, upload new employee data
  if (!page2Visible) {
    const csvPath = path.resolve(__dirname, '../testData/employee_data.csv');

    // Optional: check if file exists
    if (!fs.existsSync(csvPath)) {
      throw new Error(`❌ CSV file not found at: ${csvPath}`);
    }

    // Upload CSV
    const csvImportPage = new PimCsvImportPage(page);
    await csvImportPage.open();
    await csvImportPage.uploadCsvFile(csvPath);

    // Expect import success message
    await expect(csvImportPage.statusMessage).toBeVisible();

    // Step 4: Go back to employee list and recheck Page 2
    await page.goto('/web/index.php/pim/viewEmployeeList');
    const page2Locator = page.locator('ul.oxd-pagination__ul li >> text=2');
    await expect(page2Locator).toBeVisible();
    console.log('✅ Page 2 is now visible after import.');
  }
});

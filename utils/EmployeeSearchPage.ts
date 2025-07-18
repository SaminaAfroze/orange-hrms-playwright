import { Page, Locator, expect } from '@playwright/test';

export class EmployeeSearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Use .first() to avoid strict mode violation if multiple inputs found
    this.searchInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.searchButton = page.locator('button:has-text("Search")');
  }

  async openEmployeeList() {
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
    // Wait for search input to be visible to ensure page loaded properly
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
  }

async searchEmployee(employeeId: string) {
  await this.searchInput.fill(employeeId);
  await this.searchButton.click();

  const employeeRow = this.page.locator(`.oxd-table-row:has-text("${employeeId}")`).first();
  const noRecordsMessage = this.page.locator('text=No Records Found');

  // Wait for either employee row or no records message
  await Promise.race([
    employeeRow.waitFor({ state: 'visible', timeout: 5000 }),
    noRecordsMessage.waitFor({ state: 'visible', timeout: 5000 }),
  ]);

  // Now assert one of them is visible
  if (await employeeRow.isVisible()) {
    await expect(employeeRow).toBeVisible();
  } else {
    await expect(noRecordsMessage).toBeVisible();
  }
}

}

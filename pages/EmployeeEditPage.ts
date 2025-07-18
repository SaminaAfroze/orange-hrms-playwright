import { Page, Locator, expect } from '@playwright/test';

export class EmployeeEditPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openEmployeeList() {
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
  }

  async searchEmployee(employeeId: string) {
    const searchInput = this.page.locator('input[placeholder="Type for hints..."]').first();
    await searchInput.fill(employeeId);
    await this.page.locator('button:has-text("Search")').click();
    await expect(this.page.locator(`.oxd-table-row:has-text("${employeeId}")`)).toBeVisible();
  }

  async clickEditForEmployee(employeeId: string) {
    const row = this.page.locator(`.oxd-table-row:has-text("${employeeId}")`);
    const editButton = row.locator('button:has(i.bi-pencil-fill)');
    await editButton.click();

    await this.page.locator('button[type="submit"]:has-text("Save")').first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async fillOtherId(value: string) {
    const label = this.page.locator('label', { hasText: 'Other Id' });
    const input = label.locator('..').locator('..').locator('input');
    await input.fill(value);
  }

  async saveChanges() {
    await this.page.locator('button[type="submit"]:has-text("Save")').click();
  }

  async getOtherIdValue(): Promise<string> {
    const label = this.page.locator('label', { hasText: 'Other Id' });
    const input = label.locator('..').locator('..').locator('input');
    return await input.inputValue();
  }
}

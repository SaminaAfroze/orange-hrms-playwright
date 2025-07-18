import { Page, Locator } from '@playwright/test';

export class EmployeeDeletePage {
  readonly page: Page;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
  }

  async deleteEmployeeById(employeeId: string) {
    const deleteButton = this.page.locator(`.oxd-table-row:has-text("${employeeId}") button:has(i.bi-trash)`).first();
    await deleteButton.click();
    await this.confirmDeleteButton.click();
    await this.page.locator(`.oxd-table-row:has-text("${employeeId}")`).waitFor({ state: 'detached' });
  }
}

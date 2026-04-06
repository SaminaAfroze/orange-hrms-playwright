import { Page, expect } from '@playwright/test';
import { Utils } from '../../utils/utils';
import { SearchEmployee } from './SearchEmployee';

export class DeleteEmployee {
  private readonly page: Page;
  private readonly utils: Utils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
  }

async executeByName(firstName: string) {
  const searchEmployee = new SearchEmployee(this.page);
  await searchEmployee.executeByName(firstName);

  const row = this.page.locator('.oxd-table-card').filter({
    hasText: firstName
  }).first();

  await expect(row).toBeVisible({ timeout: 15000 });

  // 🔥 FIXED DELETE BUTTON
  const deleteButton = row.locator('button').last();
  await deleteButton.click();

  const confirmDeleteButton = this.page.getByRole('button', { name: 'Yes, Delete' });
  await confirmDeleteButton.click();

  await this.utils.waitForLoaderToDisappear();

  const toast = this.page.locator('.oxd-toast');
  await expect(toast).toBeVisible({ timeout: 15000 });
}
}
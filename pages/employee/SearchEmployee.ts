import { Page, Locator, expect } from '@playwright/test';
import { Utils } from '../../utils/utils';

export class SearchEmployee {
  private readonly utils: Utils;
  private readonly page: Page;

  readonly pimMenu: Locator;
  readonly employeeListLink: Locator;

  readonly employeeNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly searchBtn: Locator;
  readonly resetBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);

    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.employeeListLink = page.getByRole('link', { name: 'Employee List' });

    // ✅ FIX: label-based locator (unique)
    this.employeeNameInput = page.locator('label:has-text("Employee Name")')
      .locator('xpath=following::input[1]');

    this.employeeIdInput = page.locator('label:has-text("Employee Id")')
      .locator('xpath=following::input[1]');

    this.searchBtn = page.getByRole('button', { name: 'Search' });
    this.resetBtn = page.getByRole('button', { name: 'Reset' });
  }

  async goToEmployeeList() {
    await this.utils.clickElement(this.pimMenu);
    await this.utils.clickElement(this.employeeListLink);

    // wait for correct field
    await expect(this.employeeNameInput).toBeVisible({ timeout: 15000 });
  }

  async executeByName(fName: string) {
    await this.goToEmployeeList();
    await this.utils.fillElement(this.employeeNameInput, fName);
    await this.utils.clickElement(this.searchBtn);
    await this.page.waitForLoadState('networkidle');
  }

  async executeById(empId: string) {
    await this.goToEmployeeList();
    await this.utils.fillElement(this.employeeIdInput, empId);
    await this.utils.clickElement(this.searchBtn);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyEmployeeExists(fName: string, lName?: string) {
    const row = this.page.locator('.oxd-table-card').filter({ hasText: fName });

    await expect(row.first()).toBeVisible({ timeout: 10000 });

    if (lName) {
      await expect(row.first()).toContainText(lName);
    }
  }

  async verifyNoRecordsFound() {
    await expect(this.page.getByText('No Records Found')).toBeVisible({ timeout: 10000 });
  }
}
import { Page, Locator, expect } from '@playwright/test';
import { Utils } from '../../utils/utils';

type CreateEmployeeOptions = {
  middleName?: string;
  employeeId?: string;
  createLoginDetails?: boolean;
  username?: string;
  password?: string;
  confirmPassword?: string;
};

export class CreateEmployee {
  private readonly utils: Utils;
  private readonly page: Page;

  readonly pimMenu: Locator;
  readonly addEmployeeBtn: Locator;

  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;

  readonly createLoginToggle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  readonly saveBtn: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);

    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.addEmployeeBtn = page.getByRole('link', { name: 'Add Employee' });

    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');

    // Stable selectors without nth()
    this.employeeIdInput = page.locator('label:has-text("Employee Id") + div input');

    this.createLoginToggle = page.locator('.oxd-switch-input');
    this.usernameInput = page.locator('label:has-text("Username") + div input');
    this.passwordInput = page.locator('label:has-text("Password") + div input');
    this.confirmPasswordInput = page.locator('label:has-text("Confirm Password") + div input');

    this.saveBtn = page.locator('button[type="submit"]');
    this.successToast = page.locator('.oxd-toast');
  }

  async goToAddEmployee() {
    await this.utils.clickElement(this.pimMenu);
    await this.utils.clickElement(this.addEmployeeBtn);
    await expect(this.firstNameInput).toBeVisible({ timeout: 15000 });
  }

  async execute(firstName: string, lastName: string, options?: CreateEmployeeOptions) {
    await this.goToAddEmployee();

    await this.utils.fillElement(this.firstNameInput, firstName);

    if (options?.middleName) {
      await this.utils.fillElement(this.middleNameInput, options.middleName);
    }

    await this.utils.fillElement(this.lastNameInput, lastName);

    if (options?.employeeId) {
      await this.employeeIdInput.fill(''); // clear previous value
      await this.employeeIdInput.fill(options.employeeId);
    }

    if (options?.createLoginDetails) {
      await this.createLoginToggle.click();

      if (options.username) {
        await this.utils.fillElement(this.usernameInput, options.username);
      }

      if (options.password) {
        await this.utils.fillElement(this.passwordInput, options.password);
      }

      if (options.confirmPassword) {
        await this.utils.fillElement(this.confirmPasswordInput, options.confirmPassword);
      }
    }

    await this.utils.clickElement(this.saveBtn);

    // Save confirmation
    await expect(this.page).toHaveURL(/viewPersonalDetails/, { timeout: 15000 });
  }

  async clickSaveOnly() {
    await this.utils.clickElement(this.saveBtn);
  }

 async getEmployeeIdValue(): Promise<string> {
  await expect(this.employeeIdInput).toBeVisible({ timeout: 10000 });
  return (await this.employeeIdInput.inputValue()).trim();
}

  async expectRequiredValidation() {
    const requiredMessages = this.page.locator('span.oxd-input-field-error-message');
    await expect(requiredMessages.first()).toBeVisible({ timeout: 10000 });
  }

  async expectPasswordMismatchValidation() {
    await expect(this.page.getByText('Passwords do not match')).toBeVisible({ timeout: 10000 });
  }

  async expectUsernameValidationVisible() {
    const error = this.page.locator('span.oxd-input-field-error-message');
    await expect(error.first()).toBeVisible({ timeout: 10000 });
  }
}
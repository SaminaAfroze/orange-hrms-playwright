import { Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/screenshots";

export class EmployeeAddPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly middleName: Locator;
  readonly lastName: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('input[name="firstName"]');
    this.middleName = page.locator('input[name="middleName"]');
    this.lastName = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input[id*="employeeId"]').or(
      page.locator('//label[contains(., "Employee Id")]/following::input[1]')
    );
    this.saveButton = page.locator('button[type="submit"]:has-text("Save")');
  }

  async openAddvacancy() {
    await this.page.goto('/web/index.php/pim/addEmployee');
    await this.page.waitForSelector('input[name="firstName"]', { state: 'visible' });
  }

  async addNewEmployee(firstName: string, middleName: string, lastName: string, employeeId?: string) {
    await this.firstName.fill(firstName);
    await this.middleName.fill(middleName);
    await this.lastName.fill(lastName);
    
    // Only fill employee ID if provided and field is editable
    if (employeeId) {
      const idField = await this.employeeIdInput;
      const isEditable = await idField.isEditable();
      if (isEditable) {
        await idField.fill(employeeId);
      }
    }
    
    await this.saveButton.click();
    await this.page.waitForURL('**/pim/viewPersonalDetails/empNumber/**', { timeout: 30000 });
  }

  async getEmployeeId() {
    const idField = await this.employeeIdInput;
    await idField.waitFor({ state: 'visible', timeout: 10000 });
    return await idField.inputValue();
  }
}
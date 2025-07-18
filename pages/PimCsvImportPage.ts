import { Page, Locator } from '@playwright/test';

export class PimCsvImportPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly statusMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('input.oxd-file-input'); 
    this.uploadButton = page.getByRole('button', { name: /Upload/i });
    this.statusMessage = page.locator('.oxd-text:has-text("Successfully Imported")');

  }

  async open() {
    await this.page.goto('/web/index.php/pim/pimCsvImport');
    
    await this.page.waitForLoadState('networkidle');
  }

  async employeeList(){
     await this.page.goto('/web/index.php/pim/viewEmployeeList');
     
     await this.page.waitForLoadState('networkidle');

  }

  async uploadCsvFile(csvFilePath: string) {
    await this.fileInput.setInputFiles(csvFilePath); 
    await this.uploadButton.click();
  }
}

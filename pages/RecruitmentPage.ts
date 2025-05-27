import { Page } from '@playwright/test';
import { ENV } from '../configs/env';
import { hash } from 'crypto';

export class RecruitmentPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto(`${ENV.baseURL}/web/index.php/recruitment/viewCandidates`);

  }

  async Jobtitle() {
    await this.page.click('div.oxd-select-text-input');//job title field
    await this.page.getByText('Automation Tester4').click();

  }

  async vacancyDropdown() {
    
  const vacancyDropdown = this.page.locator('div.oxd-input-group', {
  has: this.page.locator('label', { hasText: 'Vacancy' })
}).locator('div.oxd-select-wrapper');
await vacancyDropdown.locator('div.oxd-select-text').click();
await this.page.locator('div[role="option"]', { hasText: 'Senior QA Lead' }).click();


  }
  
}

  


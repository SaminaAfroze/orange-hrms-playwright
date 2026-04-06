import { Locator, expect, Page } from '@playwright/test';

export class Utils {
  constructor(private page: Page) {}

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'attached' });
    await locator.click();
  }

  async fillElement(locator: Locator, text: string) {
    await locator.waitFor({ state: 'attached' });
    await locator.fill('');
    await locator.fill(text);
  }

  async waitForLoaderToDisappear() {
    const loader = this.page.locator('.oxd-loading-spinner');
    if (await loader.isVisible().catch(() => false)) {
      await loader.waitFor({ state: 'hidden' });
    }
  }

  static generateUniqueName(prefix: string) {
    return `${prefix}${Date.now()}`;
  }

  static generateUniqueId() {
    return `${Date.now()}`;
  }

  static generateUniqueUsername(prefix: string) {
    return `${prefix}_${Date.now()}`;
  }
}
import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export class ScreenshotHelper {
  private static screenshotCounter = 0;
  private static readonly screenshotDir = path.join(__dirname, '../test-results/screenshots');

  static async capture(page: Page, name?: string) {
    try {
      // Ensure directory exists
      if (!fs.existsSync(this.screenshotDir)) {
        fs.mkdirSync(this.screenshotDir, { recursive: true });
      }

      // Generate filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const counter = String(++this.screenshotCounter).padStart(3, '0');
      const filename = name 
        ? `${counter}-${name}-${timestamp}.png`
        : `${counter}-screenshot-${timestamp}.png`;
      
      const filePath = path.join(this.screenshotDir, filename);
      await page.screenshot({ path: filePath, fullPage: true });
      return filePath;
    } catch (error) {
      console.error('Failed to take screenshot:', error);
      return null;
    }
  }

  static async captureOnFailure(page: Page, error: Error) {
    const screenshotPath = await this.capture(page, 'FAILURE');
    if (screenshotPath) {
      console.log(`Screenshot saved for failed test: ${screenshotPath}`);
      console.log(`Error: ${error.message}`);
    }
    return screenshotPath;
  }
}
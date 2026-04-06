import { test, expect } from '../fixtures/loginfixture';
import { Utils } from '../Utils/utils';
import { CreateEmployee } from '../pages/employee/CreateEmployee';
import { SearchEmployee } from '../pages/employee/SearchEmployee';
import { DeleteEmployee } from '../pages/employee/DeleteEmployee';

test.describe('Employee Atomic CRUD', () => {
  // Use a local variable within each test to avoid parallel collisions
  
  test('Create Employee', async ({ page }) => {
    const firstName = Utils.generateUniqueName('Create');
    const creator = new CreateEmployee(page);
    
    await creator.execute(firstName, 'Tester');
    await expect(page.locator('.oxd-toast-content')).toContainText('Successfully Saved');
    
    // Cleanup locally if successful
    await new DeleteEmployee(page).execute(firstName);
  });

  test('Search/Read Employee', async ({ page }) => {
    const firstName = Utils.generateUniqueName('Search');
    
    // 1. Setup
    await new CreateEmployee(page).execute(firstName, 'SearchTest');
    
    // 2. Action
    await new SearchEmployee(page).execute(firstName);
    
    // 3. Assertion
    const row = page.locator('.oxd-table-card').filter({ hasText: firstName });
    await expect(row).toBeVisible();

    // Cleanup locally
    await new DeleteEmployee(page).execute(firstName);
  });

  test('Delete Employee', async ({ page }) => {
    const firstName = Utils.generateUniqueName('Delete');
    
    // 1. Setup
    await new CreateEmployee(page).execute(firstName, 'DeleteTest');
    
    // 2. Action
    const deleter = new DeleteEmployee(page);
    await deleter.execute(firstName);
    
    // 3. Assertion
    await expect(page.locator('.oxd-toast-content')).toContainText('Successfully Deleted');
  });

  // afterEach is now a safety net, not the primary deletion method
  test.afterEach(async ({ page }) => {
    // Only use global cleanup if you use a state-sharing strategy
    // Otherwise, local cleanup within tests is faster for parallel runs
  });
});
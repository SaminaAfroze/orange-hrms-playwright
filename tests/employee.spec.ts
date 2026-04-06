import { test } from '../fixtures/loginfixture';
import { expect } from '@playwright/test';
import { Utils } from '../utils/utils';
import { CreateEmployee } from '../pages/employee/CreateEmployee';
import { SearchEmployee } from '../pages/employee/SearchEmployee';
import { DeleteEmployee } from '../pages/employee/DeleteEmployee';

test.describe('Employee Module - PIM', () => {

  test('TC01 - Create employee with required fields only', async ({ page }) => {
    const firstName = Utils.generateUniqueName('Req');
    const lastName = 'Employee';

    const createEmp = new CreateEmployee(page);
    await createEmp.execute(firstName, lastName);

    const searchEmp = new SearchEmployee(page);
    await searchEmp.executeByName(firstName);
    await searchEmp.verifyEmployeeExists(firstName, lastName);

    await new DeleteEmployee(page).executeByName(firstName);
  });

  test('TC02 - Create employee with all supported fields', async ({ page }) => {
    const firstName = Utils.generateUniqueName('Full');
    const lastName = 'Details';
    const middleName = 'QA';
    const employeeId = Utils.generateUniqueId();

    const createEmp = new CreateEmployee(page);
    await createEmp.execute(firstName, lastName, {
      middleName,
      employeeId
    });

    const searchEmp = new SearchEmployee(page);
    await searchEmp.executeByName(firstName);
    await searchEmp.verifyEmployeeExists(firstName, lastName);

    await new DeleteEmployee(page).executeByName(firstName);
  });

  test('TC03 - Create employee with login details', async ({ page }) => {
    const firstName = Utils.generateUniqueName('Login');
    const lastName = 'User';
    const username = Utils.generateUniqueUsername('emp');
    const password = 'Test@12345';

    const createEmp = new CreateEmployee(page);
    await createEmp.execute(firstName, lastName, {
      createLoginDetails: true,
      username,
      password,
      confirmPassword: password
    });

    const searchEmp = new SearchEmployee(page);
    await searchEmp.executeByName(firstName);
    await searchEmp.verifyEmployeeExists(firstName, lastName);

    await new DeleteEmployee(page).executeByName(firstName);
  });

  test('TC04 - Search employee by first name', async ({ page }) => {
    const firstName = Utils.generateUniqueName('Search');
    const lastName = 'Tester';

    await new CreateEmployee(page).execute(firstName, lastName);

    const searchEmp = new SearchEmployee(page);
    await searchEmp.executeByName(firstName);
    await searchEmp.verifyEmployeeExists(firstName, lastName);

    await new DeleteEmployee(page).executeByName(firstName);
  });

test('TC05 - Search employee by employee ID', async ({ page }) => {
  const firstName = Utils.generateUniqueName('EmpId');
  const lastName = 'Check';

  const createEmp = new CreateEmployee(page);
  await createEmp.execute(firstName, lastName);

  // ✅ Get actual OrangeHRM generated employee ID after save
  const actualEmployeeId = await createEmp.getEmployeeIdValue();

  const searchEmp = new SearchEmployee(page);
  await searchEmp.executeById(actualEmployeeId);
  await searchEmp.verifyEmployeeExists(firstName, lastName);

  await new DeleteEmployee(page).executeByName(firstName);
});

  test('TC06 - Validate employee remains after save', async ({ page }) => {
    const firstName = Utils.generateUniqueName('Persist');
    const lastName = 'Check';

    await new CreateEmployee(page).execute(firstName, lastName);

    const searchEmp = new SearchEmployee(page);
    await searchEmp.executeByName(firstName);
    await searchEmp.verifyEmployeeExists(firstName, lastName);

    await new DeleteEmployee(page).executeByName(firstName);
  });

  test('TC07 - Negative: Required validation when mandatory fields are blank', async ({ page }) => {
    const createEmp = new CreateEmployee(page);
    await createEmp.goToAddEmployee();
    await createEmp.clickSaveOnly();
    await createEmp.expectRequiredValidation();
  });

  test('TC08 - Negative: Password mismatch validation', async ({ page }) => {
    const firstName = Utils.generateUniqueName('Mismatch');
    const lastName = 'Pwd';
    const username = Utils.generateUniqueUsername('user');

    const createEmp = new CreateEmployee(page);
    await createEmp.goToAddEmployee();

    await createEmp.firstNameInput.fill(firstName);
    await createEmp.lastNameInput.fill(lastName);

    await createEmp.createLoginToggle.click();
    await createEmp.usernameInput.fill(username);
    await createEmp.passwordInput.fill('Test@12345');
    await createEmp.confirmPasswordInput.fill('Wrong@12345');

    await createEmp.clickSaveOnly();
    await createEmp.expectPasswordMismatchValidation();
  });

  test('TC09 - Negative: Search non-existing employee', async ({ page }) => {
    const searchEmp = new SearchEmployee(page);
    await searchEmp.executeByName(`NoUser_${Date.now()}`);
    await searchEmp.verifyNoRecordsFound();
  });

  test('TC10 - Negative: Duplicate employee ID should not allow save ', async ({ page }) => {
    const employeeId = Utils.generateUniqueId();

    const firstName1 = Utils.generateUniqueName('DupA');
    const firstName2 = Utils.generateUniqueName('DupB');
    const lastName = 'Employee';

    await new CreateEmployee(page).execute(firstName1, lastName, { employeeId });

    const createEmp = new CreateEmployee(page);
    await createEmp.goToAddEmployee();
    await createEmp.firstNameInput.fill(firstName2);
    await createEmp.lastNameInput.fill(lastName);

    await createEmp.employeeIdInput.clear();
    await createEmp.employeeIdInput.fill(employeeId);

    await createEmp.clickSaveOnly();

  
    const duplicateError = page.locator('span.oxd-input-field-error-message');
    await expect(duplicateError.first()).toBeVisible({ timeout: 10000 });

    await new DeleteEmployee(page).executeByName(firstName1);
  });

  test('TC11 - Negative: Username required when login details enabled', async ({ page }) => {
    const firstName = Utils.generateUniqueName('NoUser');
    const lastName = 'Login';

    const createEmp = new CreateEmployee(page);
    await createEmp.goToAddEmployee();

    await createEmp.firstNameInput.fill(firstName);
    await createEmp.lastNameInput.fill(lastName);
    await createEmp.createLoginToggle.click();

    await createEmp.passwordInput.fill('Test@12345');
    await createEmp.confirmPasswordInput.fill('Test@12345');

    await createEmp.clickSaveOnly();
    await createEmp.expectUsernameValidationVisible();
  });

  test('TC12 - Negative: Password required when login details enabled', async ({ page }) => {
    const firstName = Utils.generateUniqueName('NoPwd');
    const lastName = 'Login';
    const username = Utils.generateUniqueUsername('emp');

    const createEmp = new CreateEmployee(page);
    await createEmp.goToAddEmployee();

    await createEmp.firstNameInput.fill(firstName);
    await createEmp.lastNameInput.fill(lastName);
    await createEmp.createLoginToggle.click();

    await createEmp.usernameInput.fill(username);

    await createEmp.clickSaveOnly();
    await createEmp.expectUsernameValidationVisible();
  });
});
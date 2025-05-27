import { test } from '../fixtures/login';
import { ENV } from '../configs/env';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import path from 'path';

test('Add a candidate via Recruitment', async ({ page, login }) => {
  await login();

  const recruitmentPage = new RecruitmentPage(page);
  await recruitmentPage.navigate();
  await recruitmentPage.Jobtitle();
  await recruitmentPage.vacancyDropdown();
});

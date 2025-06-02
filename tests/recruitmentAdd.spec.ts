import {RecruitmentAddPage} from "../pages/RecruitmentAddPage"
import { test } from "../fixtures/loginFixture"
import { expect } from "@playwright/test";



test ("Add a new candidate with valid details",async({page,login})=>{

     await login();

    const recruitmentAddObj =new RecruitmentAddPage(page);
    await recruitmentAddObj.openAddvacancy()
    await recruitmentAddObj.addNewRecruit("samina","Afroze","Nipun","a@gmail.com","0263848455","happy")

   await expect(page.locator('text=Status: Application Initiated')).toBeVisible({ timeout: 15000 });

})

test("Add a candidate without email (should fail validation)", async ({ page, login }) => {
  await login();
  const recruitmentAddObj = new RecruitmentAddPage(page);

  await recruitmentAddObj.openAddvacancy();
  await recruitmentAddObj.addNewRecruit("Ali", "Hassan", "Dev", "", "0123456789", "note");

  await expect(recruitmentAddObj.emailError).toBeVisible();
});

import {RecruitmentAddPage} from "../pages/RecruitmentAddPage"
import { test } from "../fixtures/login"
import { expect } from "@playwright/test";



test ("Add a new candidate with valid details",async({page,login})=>{

     await login();

    const recruitmentAddObj =new RecruitmentAddPage(page);
    await recruitmentAddObj.openAddvacancy()
    await recruitmentAddObj.addNewRecruit("samina","Afroze","Nipun","a@gmail.com","0263848455","happy")

   await expect(page.locator('text=Status: Application Initiated')).toBeVisible({ timeout: 15000 });





})
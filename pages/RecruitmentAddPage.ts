import { Locator, Page } from "@playwright/test";
import path from "path";
import { ENV } from '../utils/env';


export class RecruitmentAddPage {

    readonly page:Page;
    readonly firstName:Locator;
    readonly middleName:Locator;
    readonly lastName:Locator;
    readonly vacancyDropdownToggle:Locator;
    readonly vacancyOptionSeniorQaLead:Locator;
    readonly email:Locator;
    readonly contactNumber:Locator;
    readonly uploadResume:Locator;
    readonly keyWords:Locator;
    readonly dateOfApplication:Locator;
    readonly consentToKeepDataCheckBox:Locator;
    readonly saveButton:Locator;
    readonly emailError:Locator;




    constructor(page:Page){

        this.page = page;
        this.firstName=page.getByPlaceholder("First Name");
        this.middleName=page.getByPlaceholder("Middle Name");
        this.lastName=page.getByPlaceholder("Last Name")
       this.vacancyDropdownToggle = page.locator('.oxd-select-text'); 
        this.vacancyOptionSeniorQaLead = page.getByText('Senior QA Lead'); 

        this.email=page.getByPlaceholder('Type here').first();
        this.contactNumber=page.getByPlaceholder('Type here').nth(1);
        this.uploadResume = page.locator('input[type="file"]');
        this.keyWords=page.getByPlaceholder('Enter comma seperated words...')
        this.dateOfApplication=page.locator('input[placeholder="yyyy-dd-mm"]')
        this.consentToKeepDataCheckBox=page.locator('form span i')
        this.saveButton =page.getByRole('button', { name: 'Save' })
        this.emailError = page.locator('span.oxd-input-field-error-message', { hasText: 'Required' });




    }

    async openAddvacancy(){
        await this.page.goto(`${ENV.baseURL}/web/index.php/recruitment/addCandidate`, { timeout: 60000 })
    }

    async addNewRecruit(firstNameval:string,middleNameval:string,lastNameval:string,emailval:string,contactNumberval:string,keyWordsval:string){
        await this.firstName.fill(firstNameval)
       await this.middleName.fill(middleNameval)
       await this.lastName.fill(lastNameval)
      await this.vacancyDropdownToggle.click();
       await this.vacancyOptionSeniorQaLead.click();
       await this.email.fill(emailval)
       await this.contactNumber.fill(contactNumberval)
      await  this.uploadResumeFile();
       await this.keyWords.fill(keyWordsval)
       await this.dateOfApplication.fill('2025-06-01');
       await this.consentToKeepDataCheckBox.click()
       await this.saveButton.click()
    

       


    }

      async uploadResumeFile() {
        const filePath = path.resolve(__dirname, '../data/resume.pdf');
        await this.uploadResume.setInputFiles(filePath);
    }

}
const {test, expect} = require('@playwright/test');

//await is used to make the execution in sequential order 
//when await needs to be used then async should be used 
test('First Playwright test - initial learning',async ({browser}) => {
    //chrome - plugin/cookies
    //newContext - sort of incognito window - no history nothing - no cookies
    //context -> page -> url
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const userNameLocator = page.locator('input#username');
    const passwordLocator = page.locator('input#password');
    const signButtonLocator = page.locator('input#signInBtn');
    
    await userNameLocator.fill("rahulshetty");
    await passwordLocator.fill("Learning@830$3mK2");
    await signButtonLocator.click();
    
    const text = await page.locator("[style='display: block;']").textContent();
    console.log(text);
    
    await expect(page.locator("[style='display: block;']")).toContainText("Incorrect username/password.");
    
    await userNameLocator.fill("");
    await userNameLocator.fill("rahulshettyacademy");
    await signButtonLocator.click();

    const phoneNameLocator = page.locator(".card-body a");
    console.log(await phoneNameLocator.first().textContent());
    console.log(await phoneNameLocator.nth(1).textContent());
    console.log(await phoneNameLocator.allTextContents());

});

test("Learn UI Controls", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Dropdown
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    
    //Radio Button
    const userRadioButton = page.locator(".form-check-inline [value='user']");
    await userRadioButton.click();
    await page.locator("button#okayBtn").click();
    console.log(await userRadioButton.isChecked());
    await expect(userRadioButton).toBeChecked();

    //Checkbox
    const termsAndConditionsCheckBoxLocator = page.locator("input#terms");
})

test("ChildWindow Handling", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userNameLocator = page.locator('input#username');
    const documentLink = page.locator("a[href*='documents-request']");
    
    //Promise all helps to cover two actions in asynchronusly/parallel . Its an array function which helps to fulfill two or more actions in parallel
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
    ])

    const content = newPage.locator("p.red")
    const textContent = await content.textContent();
    console.log(textContent);
    const arrayText = textContent.split('@');
    console.log(arrayText)
    // console.log(arrayText[1].split(' ')[0]);
    const domain = arrayText[1].split(" ")[0];
    console.log(domain)
    await userNameLocator.fill(domain);
    console.log(await userNameLocator.inputValue());//inputvalue is used when we want to take content that is not part of the loaded DOM but the value we entered(fill)
})

test('Page Playwright Test',async ({page}) => {
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});
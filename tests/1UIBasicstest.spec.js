const {test, expect} = require('@playwright/test');

//await is used to make the execution in sequential order 
//when await needs to be used then async should be used 
test('First Playwright test - initial learning',async ({browser})=>
{
    //chrome - plugin/cookies
    //newContext - sort of incognito window - no history nothing - no cookies

    //context -> page -> url
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

});

test('Page Playwright Test',async ({page})=>
{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});
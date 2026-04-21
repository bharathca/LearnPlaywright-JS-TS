const {test, expect} = require('@playwright/test');

test("Another Example Product Collection", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    console.log(await page.title());
    const emailLocator = page.locator("input#userEmail");
    const passwordLocator = page.locator("input#userPassword");
    const loginLocator = page.locator("input#login");

    await emailLocator.fill("dhamaka@gmail.com");
    await passwordLocator.fill("Dhamaka@123");
    await loginLocator.click();

    const listOfProductsLocator = page.locator(".card-body b");
    //await page.waitForLoadState("networkidle"); sometime this works 
    await listOfProductsLocator.last().waitFor();
    console.log(await listOfProductsLocator.allTextContents());
});
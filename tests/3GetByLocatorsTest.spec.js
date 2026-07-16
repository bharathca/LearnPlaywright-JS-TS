const {test, expect} = require('@playwright/test');

// npx playwright show-report - shows report
// npx playwright test - tests will get executed
// npx playwright test --ui -> tests will get executed in the UI format

test("Learn GetByLocators", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByLabel("Student").check();
    await page.getByPlaceholder("Password").fill("Dhruvee");
    await page.getByRole('button', { name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole('link', { name: 'Shop'}).click();
    await page.locator("app-card").filter({ hasText: 'Blackberry' }).getByRole('button', {name: 'Add '}).click();

})
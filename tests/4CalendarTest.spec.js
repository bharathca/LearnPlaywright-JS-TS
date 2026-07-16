const {test, expect} = require('@playwright/test');


test("Learn Calendar", async ({page}) => {
    const year = "2028";
    const month = "4";
    const date = "11";
    const expectedDate = [month, date, year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator("button.react-calendar__navigation__label").click();
    await page.locator("button.react-calendar__navigation__label").click();
    await page.getByRole('button',{name:year}).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text() = '"+date+"']").click();

    const dateFieldList = await page.locator(".react-date-picker__inputGroup input");
    console.log(await dateFieldList.count())

    for(let i = 0; i< await dateFieldList.count();i++) {
        console.log(await dateFieldList.nth(i).inputValue())
        const eachDateField = await dateFieldList.nth(i).inputValue();
        console.log(eachDateField +" and "+ expectedDate[i])
        expect(eachDateField).toEqual(expectedDate[i]);
    }

    // await page.pause();
    //npx playwright test --debug
    //npx playwright codegen and give the url to start the recording of the steps you are going to perform
})
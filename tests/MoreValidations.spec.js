import { test, page, expect } from '@playwright/test';

test("PopUp Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(await page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(await page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(await page.locator("#displayed-text")).toBeVisible();
    page.on('dialog', dialog => dialog.accept());
    //page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
    await page.locator("a[href = '#top']").click();
})

test("Frames", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const frameLocator = page.frameLocator("#courses-iframe");
    frameLocator.locator("li a[href='lifetime-access']:visible").click();
    await expect(await frameLocator.locator("div.text h2")).toBeVisible();
    const text = await frameLocator.locator("div.text h2").textContent();
    console.log(text.split(" ")[1]);
})

test.only("screenshotAndVisualComparison", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(await page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "partialscreenshot.png"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'})
    await expect(await page.locator("#displayed-text")).toBeHidden();
})


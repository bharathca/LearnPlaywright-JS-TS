import { test, expect } from "@playwright/test";

test("@APITests clientApplication", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "dhamaka@gmail.com";
    const password = "Dhamaka@123";
    const productName = "iphone 13 pro";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState("networkidle");
    await context.storageState({ path: 'state.json' });

    //new browser context
    const context2 = await browser.newContext({ storageState: 'state.json' });
    const page2 = await context2.newPage();
    await page2.goto("https://rahulshettyacademy.com/client");
})
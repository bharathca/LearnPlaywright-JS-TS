const { test, expect, request } = require('@playwright/test')
const { ClientAppAPIUtility } = require('./ClientAppAPIUtility')

const loginPayload = { userEmail: "dhamaka@gmail.com", userPassword: "Dhamaka@123" }
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtility = new ClientAppAPIUtility(apiContext, loginPayload);
    response = await apiUtility.createOrder(orderPayload);
})

test("Place an order", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
})
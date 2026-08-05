const { test, expect, request } = require('@playwright/test')
const { ClientAppAPIUtility } = require('./ClientAppAPIUtility')

const loginPayload = { userEmail: "dhamaka@gmail.com", userPassword: "Dhamaka@123" }
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayloadOrder = { data: [], message: "No Orders" };

let token;
let orderId;
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtility = new ClientAppAPIUtility(apiContext, loginPayload);
    response = await apiUtility.createOrder(orderPayload);
})

test(`@APITests Place an order`, async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            //ignoreHTTPSErrors: true needs to be added in the playwright.config.js
            const body = JSON.stringify(fakePayloadOrder)
            route.fulfill({
                response,
                body
            });
        });
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await expect(page.locator(".mt-4")).toHaveText(" You have No Orders to show at this time. Please Visit Back Us ");
})
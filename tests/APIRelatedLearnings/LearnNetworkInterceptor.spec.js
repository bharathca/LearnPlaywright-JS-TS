const { test, expect, request } = require('@playwright/test')
const { ClientAppAPIUtility } = require('./ClientAppAPIUtility')

const loginPayload = { userEmail: "MangoMasala@gmail.com", userPassword: "MangoMasala@123" }
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayloadOrder = { data: [], message: "No Orders" };

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
            let body = JSON.stringify(fakePayloadOrder);
            route.fulfill({
                response,
                body,
            })
        })

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    await expect(page.locator('div.mt-4.ng-star-inserted')).toBeVisible();
    await expect(page.locator("div.mt-4.ng-star-inserted")).toHaveText("You have No Orders to show at this time. Please Visit Back Us");
})

test('@QW Security test request intercept', async ({ page }) => {

    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("MangoMasala@gmail.com");
    await page.locator("#userPassword").fill("MangoMasala@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})

test('Browser ', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("MangoMasala@gmail.com");

    await page.locator("#userPassword").fill("MangoMasala@123");
    await page.route('**/*.{jpeg}', route => route.abort());
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();

    // await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})
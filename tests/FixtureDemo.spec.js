const { expect } = require('@playwright/test');
const { customTest } = require('../utils/fixtures.js');

customTest("Fixture Demo", async ({ authenticatedPage, createOrder, testDataForOrder }) => {

    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");
    await authenticatedPage.locator("button[routerlink='/dashboard/myorders']").click();
    const orderListRows = await authenticatedPage.locator("tbody tr");
    await orderListRows.last().waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    
    console.log(testDataForOrder.productName)
})
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects_js/POManager');
const testData = JSON.parse(JSON.stringify(require("../utils/clientAppTestData.json")))

for (const data of testData)
    test.only(`client application ${data.productToChoose}`, async ({ page }) => {

        const userName = data.userName;
        const password = data.password
        const productToChoose = data.productToChoose;

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        
        await loginPage.hitPageUrl();
        await expect(page).toHaveTitle("Let's Shop");
        await loginPage.validLogin(userName, password);

        const dashboardPo = poManager.getDashboardPage();

        await dashboardPo.searchProductAddToCart(productToChoose);
        await dashboardPo.navigateToCartPage();

        const cartPo = poManager.getCartPage();
        
        await expect(await cartPo.getProductName()).toEqual(productToChoose);
        await cartPo.checkOutPage();
       
        
        // const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
        // expect(bool).toBeTruthy();
        
        const checkOutPage = poManager.getCheckOutPage();
        const paymentMethodsFromPage = checkOutPage.getCurrentPaymentMethods();
        const paymentMethodCount = await paymentMethodsFromPage.count();

        if (data.paymentMethods.length === paymentMethodCount) {
            for (let i = 0; i < paymentMethodCount; ++i) {
                await expect(await paymentMethodsFromPage.nth(i).textContent()).toEqual(data.paymentMethods[i]);
            }
        }

        checkOutPage.fillOutCreditCardDetails(data);
        checkOutPage.applyCouponCode(data);
        await expect(checkOutPage.getUserEmail()).toHaveText(userName)
        checkOutPage.placeOrder();
        
        // await expect(page.locator(".user__name [type='text']").first()).toHaveText(userName);
        
        await expect(await page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");
        const orderId = await page.locator("label.ng-star-inserted").textContent();
        await page.locator("button[routerlink='/dashboard/myorders']").click();
        const actualOrderID = orderId.split('|')[1].trim();


        const orderListRows = await page.locator("tbody tr");
        await orderListRows.last().waitFor();
        for (let i = 0; i < await orderListRows.count(); ++i) {
            const rowOrder = await orderListRows.nth(i).locator("th").textContent();
            console.log(rowOrder)
            if (await rowOrder === actualOrderID) {
                await orderListRows.nth(i).locator("button").first().click();
                break;
            }
        }

        const extractOrderId = await page.locator(".col-title:has-text('Order Id')").locator("..").locator(".col-text").textContent();
        await expect(extractOrderId).toEqual(actualOrderID);
    });
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects_js/POManager');
const testData = JSON.parse(JSON.stringify(require("../utils/clientAppTestData.json")))
const { customTest } = require("../utils/test-base")

for (const data of testData)
    test(`client application ${data.productToChoose}`, async ({ page }) => {

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

        const checkOutPage = poManager.getCheckOutPage();
        const paymentMethodsFromPage = checkOutPage.getCurrentPaymentMethods();

        const paymentMethodCount = await paymentMethodsFromPage.length;

        if (data.paymentMethods.length === paymentMethodCount) {
            for (let i = 0; i < paymentMethodCount; ++i) {
                await expect(await paymentMethodsFromPage.nth(i).textContent()).toEqual(data.paymentMethods[i]);
            }
        }

        await checkOutPage.fillOutCreditCardDetails(data);
        await checkOutPage.applyCouponCode(data);
        await expect(await checkOutPage.getCouponAppliedConfirmationText()).toEqual("* Coupon Applied");


        await expect(await checkOutPage.getUserEmail()).toEqual(userName);
        await checkOutPage.selectCountryFromDropDown(data.countrySequence, data.country);
        await checkOutPage.placeTheOrder();

        const thankYouPage = poManager.getThankYouPage();
        const thankYouText = await thankYouPage.getThankYouText();

        await expect(thankYouText).toEqual(data.thankYouText);
        const actualOrderID = await thankYouPage.getOrderID();
        await thankYouPage.goToOrdersPage();



        const ordersPage = poManager.getOrdersPage();
        await ordersPage.goToOrderDetails(actualOrderID);
        const orderDetailsPage = poManager.getOrderDetailsPage();
        await expect(await orderDetailsPage.getOrderID()).toEqual(actualOrderID);
    });
customTest(`client application login`, async ({ page, orderTestData }) => {

    const userName = orderTestData.userName;
    const password = orderTestData.password
    const productToChoose = orderTestData.productToChoose;

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    await loginPage.hitPageUrl();
    await expect(page).toHaveTitle("Let's Shop");
    await loginPage.validLogin(userName, password);
});

const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects_js/POManager');
const { expect, } = require('@playwright/test');


//default time for the execution of the method is 5 seconds so increase them we need to use timeout{10*1000}
Given('Login to ECommerce Application with the {string} and {string}', { timeout: 10 * 1000 }, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.hitPageUrl();
    await expect(this.page).toHaveTitle("Let's Shop");
    await loginPage.validLogin(username, password);
    this.userName = username;
});

When('Add {string} to cart', async function (product) {
    this.dashboardPo = this.poManager.getDashboardPage();
    await this.dashboardPo.searchProductAddToCart(product);
});

Then('Verify {string} is displayed in the cart', { timeout: 10 * 1000 }, async function (product) {

    await this.dashboardPo.navigateToCartPage();
    this.cartPo = this.poManager.getCartPage();
    await expect(await this.cartPo.getProductName()).toEqual(product);
});

When('Enter the valid payment details and place the Order with:', { timeout: 10 * 1000 }, async function (dataTable) {

    const data = dataTable.rowsHash();
    await this.cartPo.checkOutPage();
    const checkOutPage = this.poManager.getCheckOutPage();
    const paymentMethodsFromPage = await checkOutPage.getCurrentPaymentMethods();
    const paymentMethodCount = paymentMethodsFromPage.length;
    const paymentMethods = ['Credit Card', 'Paypal', 'SEPA', 'Invoice'];

    if (paymentMethods.length === paymentMethodCount) {
        for (let i = 0; i < paymentMethodCount; ++i) {
            await expect(paymentMethodsFromPage[i]).toEqual(paymentMethods[i]);
        }
    }

    await checkOutPage.fillOutCreditCardDetails(data);
    await checkOutPage.applyCouponCode(data);
    await expect(await checkOutPage.getCouponAppliedConfirmationText()).toEqual("* Coupon Applied");
    await expect(await checkOutPage.getUserEmail()).toEqual(this.userName);
    await checkOutPage.selectCountryFromDropDown(data.countrySequence, data.country);
    await checkOutPage.placeTheOrder();
    this.thankYouPage = this.poManager.getThankYouPage();
    const thankYouText = await this.thankYouPage.getThankYouText();

    await expect(thankYouText).toEqual(data.thankYouText);
    this.actualOrderID = await this.thankYouPage.getOrderID();

});

Then('Verify Order is present in the Order History Page', async function () {
    await this.thankYouPage.goToOrdersPage();
    const ordersPage = this.poManager.getOrdersPage();
    await ordersPage.goToOrderDetails(this.actualOrderID);
    const orderDetailsPage = this.poManager.getOrderDetailsPage();
    await expect(await orderDetailsPage.getOrderID()).toEqual(this.actualOrderID);
});
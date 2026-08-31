import { Locator, Page, expect, test } from "@playwright/test";
import { POManager } from "../pageObjects_ts/POManager";


const testData = JSON.parse(JSON.stringify(require("../utils/clientAppTestData.json")))

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
        const paymentMethodsFromPage = await checkOutPage.getCurrentPaymentMethods();

        const paymentMethodCount = paymentMethodsFromPage.length;

        if (data.paymentMethods.length === paymentMethodCount) {
            for (let i = 0; i < paymentMethodCount; ++i) {
                await expect(paymentMethodsFromPage[i]).toEqual(data.paymentMethods[i]);
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

        await expect((thankYouText ?? "").trim()).toBe("Thankyou for the order.");        const actualOrderID: string | null = await thankYouPage.getOrderID();
        if (!actualOrderID) throw new Error("Order ID is null or missing");

        await thankYouPage.goToOrdersPage();
        const ordersPage = poManager.getOrdersPage();
        await ordersPage.goToOrderDetails(actualOrderID);
        const orderDetailsPage = poManager.getOrderDetailsPage();
        await expect(await orderDetailsPage.getOrderID()).toEqual(actualOrderID);
    });
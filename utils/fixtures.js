const base = require("@playwright/test");
const { ClientAppAPIUtility } = require('../tests/APIRelatedLearnings/ClientAppAPIUtility.js');
const { request } = require('@playwright/test');

const loginPayload = { userEmail: "dhamaka@gmail.com", userPassword: "Dhamaka@123" }
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

//to customize this base , we need to extend base to test
exports.customTest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const email = "dhamaka@gmail.com";
        const password = "Dhamaka@123";

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        const emailLocator = page.getByPlaceholder("email@example.com");
        const passwordLocator = page.getByPlaceholder("enter your passsword");
        const loginLocator = page.getByRole('button', { name: 'Login' });

        await emailLocator.fill(email);
        await passwordLocator.fill(password);
        await loginLocator.click();
        await page.waitForLoadState("networkidle");

        await use(page);
        //until this we do setup and after that it is tear down. 
        // Meaning after the test gets executed , 
        // whatever is present beneath it will get executed
        await context.close();
    },
    createOrder: async ({ }, use) => {
        const apiContext = await request.newContext();
        const apiUtility = new ClientAppAPIUtility(apiContext, loginPayload);
        const response = await apiUtility.createOrder(orderPayload);
        await use(response);

        await apiContext.dispose();
    },
    testDataForOrder: {
        productName: 'ADIDAS ORIGINAL'
    }
})
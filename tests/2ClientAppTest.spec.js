const {test, expect} = require('@playwright/test');

test("Another Example Product Collection", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    console.log(await page.title());
    const emailLocator = page.locator("input#userEmail");
    const passwordLocator = page.locator("input#userPassword");
    const loginLocator = page.locator("input#login");

    await emailLocator.fill("dhamaka@gmail.com");
    await passwordLocator.fill("Dhamaka@123");
    await loginLocator.click();

    const listOfProductsLocator = page.locator(".card-body b");
    //await page.waitForLoadState("networkidle"); sometime this works 
    await listOfProductsLocator.last().waitFor();
    console.log(await listOfProductsLocator.allTextContents());
});

test.only("End To End Automation Client Application", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    console.log(await page.title());
    const email = "dhamaka@gmail.com";
    const emailLocator = page.locator("input#userEmail");
    const passwordLocator = page.locator("input#userPassword");
    const loginLocator = page.locator("input#login");
    const productToChoose = "iphone 13 pro";
    await emailLocator.fill(email);
    await passwordLocator.fill("Dhamaka@123");
    await loginLocator.click();
    const productsLocator = page.locator(".card-body")
    const listOfProductDetailsLocator = productsLocator.locator("b");
    await page.waitForLoadState("networkidle"); //sometime this works 
    await productsLocator.last().waitFor();
    for(let i = 0;i<await listOfProductDetailsLocator.count();++i) {
        console.log (await listOfProductDetailsLocator.nth(i).textContent())
        if(await listOfProductDetailsLocator.nth(i).textContent() === productToChoose) {
            await productsLocator.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("button[routerlink*='cart']").click();
    await page.locator(".cart li").first().waitFor();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();
    
    const paymentMethods = ['Credit Card', 'Paypal', 'SEPA', 'Invoice'];
    
    const paymentMethodInPage = await page.locator(".payment__type");
    const paymentMethodCount = await paymentMethodInPage.count();
    
    if(paymentMethods.length === paymentMethodCount) {
        for(let i = 0;i<paymentMethodCount;++i) {
            console.log(paymentMethods[i])
            console.log(await paymentMethodInPage.nth(i).textContent())
            if(paymentMethods[i]=== await paymentMethodInPage.nth(i).textContent()) {
                console.log("true");
            }
        }
    }
    await page.locator('.field:has(.title:has-text("Credit Card Number")) input').fill('4542 9931 9292 2407');

    await page.locator('.field:has(.title:has-text("Expiry Date")) select').first().selectOption('10');

    await page.locator('.field:has(.title:has-text("Expiry Date")) select').last().selectOption('12');

    await page.locator('.field:has(.title:has-text("CVV Code")) input').fill('344');

    await page.locator('.field:has(.title:has-text("Name on Card")) input').fill('Bharath');

    await page.locator('.field:has(.title:has-text("Apply Coupon")) input').fill('rahulshettyacademy');

    await page.locator('button:has-text("Apply Coupon")').click();

    await expect(await page.locator(".field:has(.title:has-text('Apply Coupon ')) p").first()).toHaveText("* Coupon Applied");
    
    await page.locator("[placeholder='Select Country']").pressSequentially("ind", { delay: 500 });
     
    const countryDropDownLocator = await page.locator(".ta-results");
    await countryDropDownLocator.waitFor();
    const countryDropDownOptionsLocator = await countryDropDownLocator.locator(".ta-item");
    const countryDropDownCount = await countryDropDownOptionsLocator.count();
    console.log(countryDropDownCount);
    for(let i =0; i<countryDropDownCount;++i) {
        console.log(await countryDropDownOptionsLocator.nth(i).textContent());
        if(await countryDropDownOptionsLocator.nth(i).textContent() === " India") {
            await countryDropDownOptionsLocator.nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(await page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    await page.locator("button[routerlink='/dashboard/myorders']").click();
console.log(orderId);
const actualOrderID = orderId.split('|')[1].trim();
console.log(actualOrderID);
// await page.locator("tbody").waitFor();
    const orderListRows = await page.locator("tbody tr");
    await orderListRows.last().waitFor();
    for (let i = 0 ; i<await orderListRows.count();++i) {
        const rowOrder = await orderListRows.nth(i).locator("th").textContent();
        console.log(rowOrder)
        if(await rowOrder === actualOrderID) {
            await orderListRows.nth(i).locator("button").first().click();
            break;
        }
    }
    await page.pause();
});
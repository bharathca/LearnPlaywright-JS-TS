const {test, expect} = require('@playwright/test');

test.only("End To End Automation Client Application", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "dhamaka@gmail.com";
    const password = "Dhamaka@123";
    const productToChoose = "iphone 13 pro";
    const creditCardNumber = "4542 9931 9292 2407";
    const creditCardExpiryMonth = "10";
    const creditCardExpiryYear = "12";
    const creditCardCVV = "234";
    const creditCardHolderName = "Bharath";
    const discountCoupon = "rahulshettyacademy";

    const emailLocator = page.getByPlaceholder("email@example.com")
    const passwordLocator = page.getByPlaceholder("enter your passsword");
    const loginLocator = page.getByRole('button', {name: 'Login'});


    await expect(page).toHaveTitle("Let's Shop");

    
    
    await emailLocator.fill(email);
    await passwordLocator.fill(password);
    await loginLocator.click();

    const productsLocator = page.locator(".card-body")

    const listOfProductDetailsLocator = productsLocator.locator("b");
    
    await page.waitForLoadState("networkidle"); //sometime this works 
    await productsLocator.last().waitFor();

    await productsLocator.filter({hasText:productToChoose}).getByRole('button', {name:' Add To Cart'}).click();

    await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();
    
    await page.locator(".cart li").first().waitFor();
    
    const bool = await page.getByText(productToChoose).isVisible();
    expect(bool).toBeTruthy();

    await page.getByRole("button", {name: "Checkout"}).click();
    
    const paymentMethods = ['Credit Card', 'Paypal', 'SEPA', 'Invoice'];
    await expect(page.locator(".payment__type")).toHaveText(paymentMethods);


    await page.locator('.field:has(.title:has-text("Credit Card Number")) input').fill(creditCardNumber);

    await page.locator('.field:has(.title:has-text("Expiry Date")) select').first().selectOption(creditCardExpiryMonth);

    await page.locator('.field:has(.title:has-text("Expiry Date")) select').last().selectOption(creditCardExpiryYear);

    await page.locator('.field:has(.title:has-text("CVV Code")) input').fill(creditCardCVV);

    await page.locator('.field:has(.title:has-text("Name on Card")) input').fill(creditCardHolderName);

    await page.locator('.field:has(.title:has-text("Apply Coupon")) input').fill(discountCoupon);

    await page.getByRole('button', {name: 'Apply Coupon'}).click();

    await expect(page.getByText("Coupon Applied")).toBeVisible();    

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 500 });
    
    await page.getByRole('button', {name:' India'}).nth(1).click();
    
    await page.getByText("Place Order").click();

    await expect(await page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");
    await expect(await page.getByText(" Thankyou for the order. ")).toBeVisible();
    
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    const actualOrderID = orderId.split('|')[1].trim();

    
    await page.getByText("Orders History Page").click();
    
    
    
    const orderListRows = await page.locator("tbody tr");
    await orderListRows.last().waitFor();
    await page.getByText(actualOrderID).locator("..").getByRole('button', {name: 'View'}).click();
    

    const extractOrderId = await page.locator(".col-title:has-text('Order Id')").locator("..").locator(".col-text").textContent();
    await expect(extractOrderId).toEqual(actualOrderID);
});
const { test, expect } = require('@playwright/test');

test("Client Login Proctise", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const downloadLink = await page.locator("a[href*='documents-request']");
    await expect(downloadLink).toHaveAttribute("class","blinkingText");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        downloadLink.click()
    ])

    const text = await newPage.locator("p.red").textContent();
    const splitContent = text.split("@")[1];
    const domain = splitContent.split(" ")[0]
    console.log(domain)
    
})
test("Another Example Product Collection", async ({ page }) => {
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

test("End To End Automation Client Application", async ({ page }) => {
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
    for (let i = 0; i < await listOfProductDetailsLocator.count(); ++i) {
        if (await listOfProductDetailsLocator.nth(i).textContent() === productToChoose) {
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

    if (paymentMethods.length === paymentMethodCount) {
        for (let i = 0; i < paymentMethodCount; ++i) {
            await expect(await paymentMethodInPage.nth(i).textContent()).toEqual(paymentMethods[i]);
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
    for (let i = 0; i < countryDropDownCount; ++i) {
        if (await countryDropDownOptionsLocator.nth(i).textContent() === " India") {
            await countryDropDownOptionsLocator.nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
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

test("End To End Automation Client Application with getByLocators", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveTitle("Let's Shop");

    const email = "dhamaka@gmail.com";
    const password = "Dhamaka@123";
    const productToChoose = "iphone 13 pro";

    const emailLocator = page.getByPlaceholder("email@example.com");
    const passwordLocator = page.getByPlaceholder("enter your passsword");
    const loginLocator = page.getByRole('button', { name: 'Login' }); // if tag name or anywhere if button is mentioned then we can use this  

    await emailLocator.fill(email);
    await passwordLocator.fill(password);
    await loginLocator.click();

    const productsLocator = page.locator(".card-body")
    const listOfProductDetailsLocator = productsLocator.locator("b");
    await page.waitForLoadState("networkidle"); //sometime this works 
    await productsLocator.last().waitFor();

    await productsLocator.filter({ hasText: productToChoose }).getByRole('button', { name: "Add To Cart" }).click();

    await page.locator("button[routerlink*='cart']").click();
    await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();


    await page.locator(".cart li").first().waitFor();
    const bool = await page.getByText(productToChoose).isVisible();

    expect(bool).toBeTruthy();

    await page.getByRole('button', { name: 'Checkout' }).click();

    const paymentMethods = ['Credit Card', 'Paypal', 'SEPA', 'Invoice'];

    const paymentMethodInPage = await page.locator(".payment__type");
    const paymentMethodCount = await paymentMethodInPage.count();

    if (paymentMethods.length === paymentMethodCount) {
        for (let i = 0; i < paymentMethodCount; ++i) {
            await expect(await paymentMethodInPage.nth(i).textContent()).toEqual(paymentMethods[i]);
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

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 500 });

    await page.getByRole('button', { name: ' India' }).nth(1).click();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.getByText("PLACE ORDER").click();


    await expect(await page.getByText("Thankyou for the order. ")).toBeVisible();

    const orderId = await page.locator("label.ng-star-inserted").textContent();

    await page.getByRole('listitem').getByRole('button', { name: 'Orders' }).click();

    const actualOrderID = orderId.split('|')[1].trim();


    const orderListRows = await page.locator("tbody tr");
    await orderListRows.last().waitFor();
    // for (let i = 0 ; i<await orderListRows.count();++i) {
    //     const rowOrder = await orderListRows.nth(i).locator("th").textContent();
    //     console.log(rowOrder)
    //     if(await rowOrder === actualOrderID) {
    //         await orderListRows.nth(i).locator("button").first().click();
    //         break;
    //     }
    // }
    await page.locator('tbody tr', { has: page.locator(`th:has-text("${actualOrderID}")`) }).getByRole('button', { name: 'View' }).first().click();

    const extractOrderId = await page.locator(".col-title:has-text('Order Id')").locator("..").locator(".col-text").textContent();
    await expect(extractOrderId).toEqual(actualOrderID);
});

test("End To End Automation Client Application with Playwright getByLocators", async ({page}) => {
    
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
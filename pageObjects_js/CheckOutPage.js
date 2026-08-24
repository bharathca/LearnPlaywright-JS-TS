class CheckOutPage {
    constructor(page) {
        this.page = page;
        this.paymentMethodInPage = page.locator(".payment__types .payment__type");
        this.emailAddress = page.locator(".user__name input[type = 'text']");
        this.creditCardNumber = page.locator(".field:has(.title:has-text('Credit Card Number')) input")
        this.creditCardExpiry = page.locator(".field:has(.title:has-text('Expiry Date')) select");
        this.creditCardCVV = page.locator(".field:has(.title:has-text('CVV Code')) input");
        this.creditCardHolderName = page.locator(".field:has(.title:has-text('Name on Card')) input");
        this.discountCoupon = page.locator("input[name = 'coupon']");
        this.applyDiscount = page.locator("button:has-text('Apply Coupon')");
        this.couponAppliedConfirmation = page.locator(".field:has(.title:has-text('Apply Coupon ')) p")
        this.selectCountry = page.locator(".user__name input[placeholder = 'Select Country']");
        this.listOfCountries = page.locator(".ta-results");
        this.listOfCountriesButton = this.listOfCountries.locator("button")
        this.placeOrder = page.locator(".action__submit");
    }
    async getUserEmail() {
        return await this.emailAddress.inputValue();
    }
    async selectCountryFromDropDown(countryInSequence, country) {
        await this.selectCountry.pressSequentially(countryInSequence, { delay: 150 });
        await this.listOfCountries.waitFor();
        const count = await this.listOfCountries.locator('button').count();
        for (let i = 0; i < count; i++) {
            const countryText = await this.listOfCountries.locator('button').nth(i).textContent();
            if (countryText.trim() === country) {
                await this.listOfCountries.locator('button').nth(i).click();
                break;
            }
        }
    }
    async fillOutCreditCardDetails(data) {
        await this.creditCardNumber.fill(data.creditCardNumber);
        await this.creditCardExpiry.first().selectOption(data.creditCardExpiry.split("/")[0]);
        await this.creditCardExpiry.last().selectOption(data.creditCardExpiry.split("/")[1]);
        await this.creditCardCVV.fill(data.creditCardCVV);
        await this.creditCardHolderName.fill(data.creditCardHolderName);
    }

    async applyCouponCode(data) {
        await this.discountCoupon.fill(data.couponCode);
        await this.applyDiscount.click();
    }
    async getCouponAppliedConfirmationText() {
        return await this.couponAppliedConfirmation.first().textContent();
    }

    async getCurrentPaymentMethods() {
        return await this.paymentMethodInPage.allTextContents();
    }
    async placeTheOrder() {
        await this.placeOrder.click();
    }
}
module.exports = { CheckOutPage };
class ThankYouPage {
    constructor(page) {
        this.page = page;
        this.thankYouText = this.page.locator(".hero-primary");
        this.orderID = this.page.locator("label.ng-star-inserted");
        this.myOrdersPageLink = this.page.locator("button[routerlink='/dashboard/myorders']");
    }
    async getThankYouText() {
        return await this.thankYouText.textContent();
    }
    async getOrderID() {
        return this.orderID.textContent().split('|')[1].trim();
    }
    async goToOrdersPage() {
        await this.myOrdersPageLink.click();
    }
}
module.exports = { ThankYouPage }
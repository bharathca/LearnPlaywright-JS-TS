class OrderDetailsPage {
    constructor(page) {
        this.page = page;
        this.extractedOrderID = this.page.locator(".col-title:has-text('Order Id')").locator("..").locator(".col-text");
    }
    async getOrderID() {
        return await this.extractedOrderID.textContent();
    }
}
module.exports = { OrderDetailsPage };
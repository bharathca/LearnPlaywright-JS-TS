class CartPage {
    constructor(page) {
        this.page = page;
        this.productText = page.locator(".cartSection h3");
        this.checkOutButton = page.locator("button:has-text('Checkout')");
    }
    async getProductName() {
        await this.page.locator("div li").first().waitFor();
        return await this.productText.textContent();
    }
    async checkOutPage() {
        await this.checkOutButton.click();
    }
    
}
module.exports = { CartPage }
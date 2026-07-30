class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body");
        this.cart = page.locator("[routerlink*='cart']");
    }
    async searchProductAddToCart(productName) {
        await this.products.last().waitFor();
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text = Add To Cart").click();
                break;
            }
        }
    }
    async navigateToCartPage() {
        await this.cart.click();
    }
}
module.exports = { DashboardPage }
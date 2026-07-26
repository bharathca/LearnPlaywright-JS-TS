import {Locator, Page} from "@playwright/test";

export class CartPage {
    page: Page;
    productText: Locator;
    checkOutButton: Locator;
    constructor(page: Page) {
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
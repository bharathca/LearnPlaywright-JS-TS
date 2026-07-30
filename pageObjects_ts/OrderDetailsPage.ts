import { Locator, Page } from "@playwright/test";
export class OrderDetailsPage {
    page: Page
    extractedOrderID: Locator;
    constructor(page: Page) {
        this.page = page;
        this.extractedOrderID = this.page.locator(".col-title:has-text('Order Id')").locator("..").locator(".col-text");
    }
    async getOrderID(): Promise<string | null> {
        return await this.extractedOrderID.textContent();
    }
}
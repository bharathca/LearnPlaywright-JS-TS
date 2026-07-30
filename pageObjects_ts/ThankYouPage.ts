import { Locator, Page } from "@playwright/test";

export class ThankYouPage {
    page: Page;
    thankYouText: Locator;
    orderID: Locator;
    myOrdersPageLink: Locator;
    constructor(page: Page) {
        this.page = page;
        this.thankYouText = this.page.locator(".hero-primary");
        this.orderID = this.page.locator("label.ng-star-inserted");
        this.myOrdersPageLink = this.page.locator("button[routerlink='/dashboard/myorders']");
    }
    async getThankYouText() {
        return await this.thankYouText.textContent();
    }
    async getOrderID(): Promise<string | null> {
        let getOrderID: string | null;
        getOrderID = await this.orderID.textContent()
        return getOrderID?.split('|')[1].trim() ?? null;
    }
    async goToOrdersPage() {
        await this.myOrdersPageLink.click();
    }
}
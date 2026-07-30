import { Locator, Page } from "@playwright/test";
export class OrdersPage {
    page: Page;
    listOfOrdersInRows: Locator;
    constructor(page: Page) {
        this.page = page;
        this.listOfOrdersInRows = this.page.locator("tbody tr");
    }
    async goToOrderDetails(actualOrderID: string) {
        await this.listOfOrdersInRows.last().waitFor();
        for (let i = 0; i < await this.listOfOrdersInRows.count(); ++i) {
            const rowOrder = await this.listOfOrdersInRows.nth(i).locator("th").textContent();
            if (await rowOrder === actualOrderID) {
                await this.listOfOrdersInRows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
}
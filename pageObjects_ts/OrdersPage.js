class OrdersPage {
    constructor(page) {
        this.page = page;
        this.listOfOrdersInRows = this.page.locator("tbody tr");
    }
    async goToOrderDetails(actualOrderID) {
        await this.listOfOrdersInRows.last().waitFor();
        for (let i = 0; i < await listOfOrdersInRows.count(); ++i) {
            const rowOrder = await listOfOrdersInRows.nth(i).locator("th").textContent();
            if (await rowOrder === actualOrderID) {
                await listOfOrdersInRows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
}
module.exports = { OrdersPage }
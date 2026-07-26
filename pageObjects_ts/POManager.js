const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CheckOutPage } = require("./CheckOutPage");
const { CartPage } = require("./CartPage");
const { OrdersPage } = require("./OrdersPage");
const { OrderDetailsPage } = require("./OrderDetailsPage");
const { ThankYouPage } = require("./ThankYouPage");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkOutPage = new CheckOutPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);
        this.thankYouPage = new ThankYouPage(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckOutPage() {
        return this.checkOutPage;
    }
    getOrdersPage() {
        return this.ordersPage;
    }
    getOrderDetailsPage() {
        return this.orderDetailsPage;
    }
    getThankYouPage() {
        return this.thankYouPage;
    }
}
module.exports = { POManager }
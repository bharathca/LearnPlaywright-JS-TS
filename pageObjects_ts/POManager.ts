import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CheckOutPage } from "./CheckOutPage";
import { CartPage } from "./CartPage";
import { OrdersPage } from "./OrdersPage";
import { OrderDetailsPage } from "./OrderDetailsPage";
import { ThankYouPage } from "./ThankYouPage";

export class POManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkOutPage: CheckOutPage;
    ordersPage: OrdersPage;
    orderDetailsPage: OrderDetailsPage;
    thankYouPage: ThankYouPage;

    constructor(page: Page) {
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
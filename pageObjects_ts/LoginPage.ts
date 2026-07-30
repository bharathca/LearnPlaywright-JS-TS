import { Locator, Page } from "@playwright/test";
export class LoginPage {
    page: Page;
    userNameFieldLocator: Locator;
    passwordFieldLocator: Locator;
    loginButtonLocator: Locator;
    constructor(page: Page) {
        this.page = page;
        this.userNameFieldLocator = page.locator("input#userEmail");
        this.passwordFieldLocator = page.locator("input#userPassword");
        this.loginButtonLocator = page.locator("input#login");
    }
    async hitPageUrl() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
    async validLogin(email: string, password: string) {
        await this.userNameFieldLocator.fill(email);
        await this.passwordFieldLocator.fill(password);
        await this.loginButtonLocator.click();
        await this.page.waitForLoadState('networkidle');
    }
}
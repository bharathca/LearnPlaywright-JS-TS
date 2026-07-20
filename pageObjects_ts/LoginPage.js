class LoginPage {
    constructor(page) {
        this.page = page;
        this.userNameFieldLocator = page.locator("input#userEmail");
        this.passwordFieldLocator = page.locator("input#userPassword");
        this.loginButtonLocator = page.locator("input#login");
    }
    async hitPageUrl() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
    async validLogin(email, password) {
        await this.userNameFieldLocator.fill(email);
        await this.passwordFieldLocator.fill(password);
        await this.loginButtonLocator.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };
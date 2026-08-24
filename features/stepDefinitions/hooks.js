const { AfterStep, After, Before, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects_js/POManager');
const playwright = require('@playwright/test');


Before({ timeout: 10 * 1000 }, async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

After(async function () {
    console.log("End of the test")
})

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        console.log("did i come here? ")
        const timestamp = Date.now();
        const scenarioName = pickle.name
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "_");
        console.log(scenarioName)
        await this.page.screenshot({
            path: `/test-results/screenshots/${scenarioName}_${timestamp}.png`,
            fullPage: true
        });
    }
})
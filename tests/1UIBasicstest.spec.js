const {test} = require('@playwright/test');

//await is used to make the execution in sequential order 
//when await needs to be used then async should be used 
test('First Playwright test',async ({browser})=>
{
    //chrome - plugin/cookies
    const context = browser.newContext();
});
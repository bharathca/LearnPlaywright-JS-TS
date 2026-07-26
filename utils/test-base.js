const base = require('@playwright/test');

exports.customTest = base.test.extend({
    orderTestData: {
        username: "dhamaka@gmail.com",
        password: "Dhamaka@321",
        productName: "ADIDAS ORIGINAL"
    }
})
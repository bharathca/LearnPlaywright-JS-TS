const base = require('@playwright/test');

exports.customTest = base.test.extend({
    orderTestData: {
        userName: "dhamaka@gmail.com",
        password: "Dhamaka@321",
        productToChoose: "ADIDAS ORIGINAL"
    }
})
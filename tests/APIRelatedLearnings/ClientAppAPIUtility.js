class ClientAppAPIUtility {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        //loginFlow
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            ignoreHTTPSErrors: true,
            data: this.loginPayload
        })
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();

        //OrderFlow
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            ignoreHTTPSErrors: true,
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
        const orderResponseInJson = await orderResponse.json();
        console.log(orderResponseInJson)
        response.orderId = orderResponseInJson.orders[0];
        return response;
    }
}
module.exports = { ClientAppAPIUtility }
class CheckoutStep2Page {
    constructor(page) {
        this.page = page;
        this.finishBtn = page.locator('[data-test="finish"]');
    }

    async finish () {
        await this.finishBtn.click();
    }
}

export default CheckoutStep2Page;
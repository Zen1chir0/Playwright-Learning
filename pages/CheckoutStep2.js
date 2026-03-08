class CheckoutStep2Page {
    constructor(page) {
        this.page = page;
        this.finishBtn = page.locator('[data-test="finish"]');
    }

    async finish () {
        await this.finishBtn.click();
    }

    async priceScraper () {
        const priceStrings = page.locator('[data-test="inventory-item-price"]').allTextContents();
        return priceStrings;
    }

    async uiSubtotal() {
        const subTotalinUI = page.locator('[data-test="subtotal-label"]'[1]);
        return subTotalinUI;
    }
}

export default CheckoutStep2Page;
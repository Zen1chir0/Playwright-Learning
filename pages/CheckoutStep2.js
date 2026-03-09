class CheckoutStep2Page {
    constructor(page) {
        this.page = page;
        this.finishBtn = page.locator('[data-test="finish"]');
    }

    async finish () {
        await this.finishBtn.click();
    }

    async priceScraper () {
        const priceStrings = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
        return priceStrings;
    }

    async uiSubtotal() {
        await this.page.locator('[data-test="subtotal-label"]').waitFor({ state: 'visible' });
    
        const subTotalinUI = await this.page.locator('[data-test="subtotal-label"]').textContent();
        return subTotalinUI;
    }
}

export default CheckoutStep2Page;
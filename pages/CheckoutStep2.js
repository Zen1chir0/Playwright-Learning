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

    async uiTax() {
        await this.page.locator('[data-test="tax-label"]').waitFor({ state: 'visible' });

        const totalTax = await this.page.locator('[data-test="tax-label"]').textContent();
        return totalTax;
    }

        async uiTotal() {
        await this.page.locator('[data-test="total-label"]').waitFor({ state: 'visible' });
    
        const totalinUI = await this.page.locator('[data-test="total-label"]').textContent();
        return totalinUI;
    }
}

export default CheckoutStep2Page;
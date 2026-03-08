class InventoryPage {
    constructor(page) {
        this.page = page;

        this.product1 = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.product2 = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.product3 = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        this.product4 = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
        this.cart = page.locator('[data-test="shopping-cart-link"]');
    }

        async addToCart() {
            await this.product1.click();
            await this.product2.click();
            await this.product3.click();
            await this.product4.click();
            await this.cart.click();
        } 
}

export default InventoryPage;
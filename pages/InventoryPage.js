class InventoryPage {
    constructor(page) {
        this.page = page;

        this.product = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cart = page.locator('[data-test="shopping-cart-link"]');
    }

        async addToCart() {
            await this.product.click();
            await this.cart.click();
        } 
}

export default InventoryPage;
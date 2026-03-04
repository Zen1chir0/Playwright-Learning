class CheckoutPage {
    constructor(page){
        this.page = page;
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }
}

export default CheckoutPage;
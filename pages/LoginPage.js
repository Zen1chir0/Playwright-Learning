//Class definition (Blueprint of the LOGIN PAGE)
class LoginPage {
    constructor (page) {
        this.page = page;

        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');

         }
        async login (user, pass) {
            await this.page.goto('https://www.saucedemo.com/');

            await this.usernameInput.fill(user);
            await this.passwordInput.fill(pass);
            await this.loginButton.click();
        }

}
//Export (I noticed this is just the same with web dev)
export default LoginPage;
//Class definition (Blueprint of the LOGIN PAGE)
class LoginPage {
    constructor (page) {
        this.page = page;

        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: /Login/i });

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
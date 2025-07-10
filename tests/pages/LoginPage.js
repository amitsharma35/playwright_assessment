class LoginPage {
    /**
     * Constructor for LoginPage
     * @param {object} page - Playwright's Page object
     */
    constructor(page) {
        this.page = page;

        // Locators for login elements
        this.usernameInput = page.locator('input[name="username"]'); // Username input field
        this.passwordInput = page.locator('input[name="password"]'); // Password input field
        this.loginButton = page.locator('text=Log In'); // Login button
    }

    /**
     * Logs in using the provided username and password
     * @param {string} username - The username for login
     * @param {string} password - The password for login
     * @returns {Promise<void>}
     */
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = LoginPage;

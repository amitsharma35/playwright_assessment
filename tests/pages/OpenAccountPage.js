class OpenAccountPage {
    /**
     * Constructor for OpenAccountPage
     * @param {object} page - Playwright's Page object
     */
    constructor(page) {
        this.page = page;

        // Locators for account opening elements
        this.accountTypeDropdown = page.locator('#type'); // Dropdown to select account type
        this.submitButton = page.locator('input[value="Open New Account"]'); // Button to submit the request
        this.accountNumberLocator = page.locator('#newAccountId'); // Locator for the new account number
    }

    /**
     * Creates a new savings account and returns the account number
     * @returns {Promise<string>} - The newly created account number
     */
    async createSavingsAccount() {
        await this.accountTypeDropdown.selectOption('SAVINGS'); // Select "SAVINGS" account type
        await this.submitButton.click(); // Click the "Open New Account" button

        // Ensure that the Open Account result page has loaded before checking for the account number
        await this.page.waitForLoadState('domcontentloaded');

        // Wait for the account number to be visible within a timeout period
        await this.accountNumberLocator.waitFor({ state: 'visible', timeout: 5000 });

        return await this.accountNumberLocator.innerText(); // Return the generated account number
    }
}

export default OpenAccountPage;

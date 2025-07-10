class AccountsOverviewPage {
    /**
     * Constructor for AccountsOverviewPage
     * @param {object} page - Playwright's Page object
     */
    constructor(page) {
        this.page = page;

        /**
         * Locator function to find the balance element for a specific account number
         * @param {string} accountNumber - The account number to locate balance
         * @returns {Locator} - Playwright locator for the account balance
         */
        this.balanceLocator = (accountNumber) => 
            page.locator(`text=Account #${accountNumber}`)
                .locator('..')
                .locator('.balance');
    }

    /**
     * Retrieves the account balance for a given account number
     * @param {string} accountNumber - The account number to check balance for
     * @returns {Promise<string>} - The account balance as a string
     */
    async getAccountBalance(accountNumber) {
        await this.balanceLocator(accountNumber).waitFor({ state: 'visible' });
        return await this.balanceLocator(accountNumber).innerText();
    }
}

export default AccountsOverviewPage;

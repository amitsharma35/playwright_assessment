class TransferFundsPage {
    /**
     * Constructor for TransferFundsPage
     * @param {object} page - Playwright's Page object
     */
    constructor(page) {
        this.page = page;

        // Locators for transfer funds elements
        this.fromAccountDropdown = page.locator('#fromAccountId'); // Dropdown to select source account
        this.toAccountDropdown = page.locator('#toAccountId'); // Dropdown to select destination account
        this.amountInput = page.locator('#amount'); // Input field for transfer amount
        this.transferButton = page.locator('text=Transfer'); // Button to submit the transfer
    }

    /**
     * Transfers funds between accounts
     * @param {string} fromAccount - The account number to transfer from
     * @param {string} toAccount - The account number to transfer to
     * @param {number} amount - The amount to be transferred
     * @returns {Promise<void>}
     */
    async transferFunds(fromAccount, toAccount, amount) {
        await this.fromAccountDropdown.selectOption({ value: fromAccount }); // Select source account
        await this.toAccountDropdown.selectOption({ value: toAccount }); // Select destination account
        await this.amountInput.fill(amount.toString()); // Enter transfer amount
        await this.transferButton.click(); // Click transfer button
    }
}

export default TransferFundsPage;

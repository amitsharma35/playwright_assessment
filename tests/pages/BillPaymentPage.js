class BillPaymentPage {
    /**
     * Constructor for BillPaymentPage
     * @param {object} page - Playwright's Page object
     */
    constructor(page) {
        this.page = page;

        // Locators for bill payment fields
        this.payeeNameInput = page.locator('#payeeName'); // Input field for the payee name
        this.accountDropdown = page.locator('#fromAccountId'); // Dropdown to select the account
        this.amountInput = page.locator('#amount'); // Input field for the amount
        this.payButton = page.locator('text=Pay Bill'); // Button to submit the payment
    }

    /**
     * Performs a bill payment transaction
     * @param {string} accountNumber - The account number to pay from
     * @param {string} payeeName - The name of the payee
     * @param {number} amount - The amount to be paid
     * @returns {Promise<void>}
     */
    async payBill(accountNumber, payeeName, amount) {
        await this.payeeNameInput.fill(payeeName);
        await this.accountDropdown.selectOption(accountNumber);
        await this.amountInput.fill(amount.toString());
        await this.payButton.click();
    }
}

export default BillPaymentPage;

import { expect } from '@playwright/test';

class HomePage {
    /**
     * Constructor for HomePage
     * @param {object} page - Playwright's Page object
     */
    constructor(page) {
        this.page = page;

        /**
         * Navigation links mapping 
         */
        this.navLinks = {
            openAccount: 'Open New Account',
            accountsOverview: 'Accounts Overview',
            transferFunds: 'Transfer Funds',
            billPay: 'Bill Pay',
            findTransactions: 'Find Transactions',
            updateProfile: 'Update Contact Info',
            requestLoan: 'Request Loan',
            logout: 'Log Out'
        };
    }

    /**
     * Navigates to a given section using the navigation menu
     * @param {string} linkText - The text of the navigation link to click
     * @returns {Promise<void>}
     */
    async navigateTo(linkText) {
        const linkLocator = this.page.locator(`#leftPanel a:has-text("${linkText}")`);
        await linkLocator.waitFor({ state: 'visible' });
        await linkLocator.click();
    }

    /**
     * Navigates to the "Open New Account" page
     * @returns {Promise<void>}
     */
    async navigateToOpenAccount() {
        await this.navigateTo(this.navLinks.openAccount);
    }

    /**
     * Navigates to the "Accounts Overview" page
     * @returns {Promise<void>}
     */
    async navigateToAccountsOverview() {
        await this.navigateTo(this.navLinks.accountsOverview);
    }

    /**
     * Navigates to the "Transfer Funds" page
     * @returns {Promise<void>}
     */
    async navigateToTransferFunds() {
        await this.navigateTo(this.navLinks.transferFunds);
    }

    /**
     * Navigates to the "Bill Pay" page
     * @returns {Promise<void>}
     */
    async navigateToBillPay() {
        await this.navigateTo(this.navLinks.billPay);
    }

    /**
     * Verifies that all global navigation menu links are visible
     * @returns {Promise<void>}
     */
    async verifyGlobalNavigationMenu() {
        for (const linkText of Object.values(this.navLinks)) {
            const linkLocator = this.page.locator(`#leftPanel a:has-text("${linkText}")`);
            await expect(linkLocator).toBeVisible();
        }
    }
}

export default HomePage;

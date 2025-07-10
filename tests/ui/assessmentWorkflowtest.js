import { test, expect } from '@playwright/test';
import { generateUniqueUsername } from '../../utils/helper';
import RegistrationPage from '../pages/RegistrationPage';
import HomePage from '../pages/HomePage';
import OpenAccountPage from '../pages/OpenAccountPage';
import AccountsOverviewPage from '../pages/AccountsOverviewPage';
import TransferFundsPage from '../pages/TransferFundsPage';
import BillPaymentPage from '../pages/BillPaymentPage';

test('Complete Assessment Workflow - Para Bank', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const homePage = new HomePage(page);
    const openAccountPage = new OpenAccountPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);
    const transferFundsPage = new TransferFundsPage(page);
    const billPaymentPage = new BillPaymentPage(page);

    // Step 1: Navigate to Para Bank home page
    await page.goto('/');
    
    // Step 2: Register a new user
    await page.click('text=Register');
    await registrationPage.form.waitFor({ state: 'visible' });
    const username = generateUniqueUsername();
    const password = 'SecurePassword123!';
    await registrationPage.fillForm(username, password);
    await page.locator('input[type="submit"].button[value="Register"]').click();
    await page.locator('text=Your account was created successfully. You are now logged in.').waitFor({ state: 'visible' });


    // Step 4: Verify Global Navigation Menu
    await homePage.verifyGlobalNavigationMenu();


    // Step 5: Create a Savings Account by clicking "Open New Account"

   // to get a dynamic locator for sidebar links
    const getSidebarLink = (page, linkText) => page.locator(`#leftPanel a:has-text("${linkText}")`);

    const openNewAccountLink = getSidebarLink(page, "Open New Account");

    // Ensure the link is visible and clickable before clicking
    await openNewAccountLink.waitFor({ state: 'visible' });
    await expect(openNewAccountLink).toBeEnabled();

    // Click the "Open New Account" link
    await openNewAccountLink.click();
    const accountTypeDropdown = page.locator('#type');
    await accountTypeDropdown.selectOption({ value: '1' });
    const openNewAccountButton = page.locator('input[type="button"].button[value="Open New Account"]');

    // Ensure the button is available, visible, and enabled before clicking
    await openNewAccountButton.waitFor({ state: 'visible' }); // Waits until the button is visible
    await expect(openNewAccountButton).toBeEnabled(); // Ensures the element is enabled before clicking

    // Click the button
    await openNewAccountButton.click();

    // step 7 part-1 new account id
    const newAccountLink = page.locator('#openAccountResult a#newAccountId');
    await newAccountLink.waitFor({ state: 'visible' });  // Ensure the account link is visible

    // Click the new account number link
    await newAccountLink.click();

    // Step 7: Transfer Funds from Savings Account to Another Account
    await page.locator('#leftPanel a:has-text("Transfer Funds")').click();
    await transferFundsPage.transferFunds(savingsAccountNumber, '23112', '500');
    expect(await page.locator('text=Transfer Complete!').isVisible()).toBeTruthy();

    // Step 8: Pay a Bill with the Created Account
    await page.locator('#leftPanel a:has-text("Bill Pay")').click();
    await billPaymentPage.payBill(savingsAccountNumber, '100');
    expect(await page.locator('text=Bill Payment Complete!').isVisible()).toBeTruthy();
});

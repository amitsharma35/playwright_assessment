import { test, expect } from '@playwright/test';

test('Create Savings Account', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Open New Account');

    await page.selectOption('#type', '1'); // 1 = Savings
    await page.click('text=Open Account');

    const accountNumber = await page.locator('#accountId').innerText();
    expect(accountNumber).not.toBeNull();
});

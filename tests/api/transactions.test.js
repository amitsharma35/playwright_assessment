import { test, expect } from '@playwright/test';

test('Find Transactions API Test', async ({ request }) => {
    const response = await request.get('/parabank/services/bank/findTransactions', {
        params: { amount: '100' }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.transactions).toBeDefined();
    expect(responseBody.transactions[0]).toHaveProperty('amount', '100');
});

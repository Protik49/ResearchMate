import { test, expect } from '@playwright/test';

test.describe('DemoBlaze E-Commerce E2E Flow', () => {
  test('Complete E2E: Signup -> Add Laptop -> Login -> Purchase', async ({ page }) => {
    // Generate dynamic unique credentials to prevent username collision
    const timestamp = Date.now();
    const username = `qa_user_${timestamp}`;
    const password = 'QaPassword123!';

    // Auto-accept all JavaScript alert popups on DemoBlaze
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    // ---------------------------------------------------------
    // Step 1: Navigate to DemoBlaze
    // ---------------------------------------------------------
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveTitle(/STORE/i);

    // ---------------------------------------------------------
    // Step 2: Sign Up for a New Account
    // ---------------------------------------------------------
    await page.click('#signin2');
    await expect(page.locator('#signInModal')).toBeVisible();
    await page.fill('#sign-username', username);
    await page.fill('#sign-password', password);
    await page.click('button[onclick="register()"]');

    // Wait for signup modal to dismiss
    await expect(page.locator('#signInModal')).toBeHidden({ timeout: 10000 });

    // ---------------------------------------------------------
    // Step 3: Add One Product to Cart from Laptop Category
    // ---------------------------------------------------------
    await page.click('a:has-text("Laptops")');
    // Wait for laptop cards to render and select the first available laptop
    const firstLaptop = page.locator('.card-title a').first();
    await firstLaptop.waitFor({ state: 'visible', timeout: 10000 });
    const laptopTitle = await firstLaptop.innerText();
    await firstLaptop.click();

    // Verify product detail page loaded and add to cart
    await expect(page.locator('.name')).toContainText(laptopTitle);
    await page.click('a:has-text("Add to cart")');
    await page.waitForTimeout(1000); // Allow alert auto-accept handler to complete

    // ---------------------------------------------------------
    // Step 4: Log In Using the Newly Created Account
    // ---------------------------------------------------------
    await page.click('#login2');
    await expect(page.locator('#logInModal')).toBeVisible();
    await page.fill('#loginusername', username);
    await page.fill('#loginpassword', password);
    await page.click('button[onclick="logIn()"]');

    // Assert user session is active in the navbar
    await expect(page.locator('#nameofuser')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#nameofuser')).toContainText(`Welcome ${username}`);

    // ---------------------------------------------------------
    // Step 5: Proceed to Checkout & Complete Purchase
    // ---------------------------------------------------------
    await page.click('#cartur');
    await expect(page).toHaveURL(/.*cart.html/);

    // Verify product is in cart table
    await expect(page.locator('#tbodyid tr').first()).toBeVisible({ timeout: 10000 });

    // Click Place Order
    await page.click('button:has-text("Place Order")');
    await expect(page.locator('#orderModal')).toBeVisible();

    // Fill order details
    await page.fill('#name', 'Alex Mercer');
    await page.fill('#country', 'United States');
    await page.fill('#city', 'New York');
    await page.fill('#card', '4532789012345678');
    await page.fill('#month', '11');
    await page.fill('#year', '2028');

    // Submit purchase
    await page.click('button[onclick="purchaseOrder()"]');

    // Assert purchase confirmation modal and details
    const confirmModal = page.locator('.sweet-alert');
    await expect(confirmModal).toBeVisible({ timeout: 10000 });
    await expect(confirmModal.locator('h2')).toContainText('Thank you for your purchase!');
    await expect(confirmModal.locator('p')).toContainText('Id:');
    await expect(confirmModal.locator('p')).toContainText('Amount:');

    // Close confirmation
    await page.click('button.confirm');
    await expect(confirmModal).toBeHidden();
  });
});

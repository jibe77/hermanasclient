import { test, expect } from '@playwright/test';

test.describe('Hermanas Application', () => {
    test('should redirect to login when not authenticated', async ({ page }) => {
        // Navigate to the application
        await page.goto('/');

        // Wait for redirect to login page
        await page.waitForURL('**/auth/login');

        // Verify we're on the login page
        expect(page.url()).toContain('/auth/login');
    });

    test('should not have console errors', async ({ page }) => {
        const consoleErrors: string[] = [];

        // Listen for console errors
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        // Navigate to the application
        await page.goto('/');

        // Wait for the page to be stable
        await page.waitForLoadState('networkidle');

        // Assert there are no console errors
        expect(consoleErrors).toEqual([]);
    });

    test('should have proper meta tags', async ({ page }) => {
        await page.goto('/');

        // Check that the page has a title
        await expect(page).toHaveTitle(/Hermanas/);
    });
});

import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('correct index structure', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('MultiTheFranky');

    await expect(page.getByRole('heading', { name: 'Timeline' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Knowledge/i })).toBeVisible();
  });
});

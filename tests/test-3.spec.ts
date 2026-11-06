import { test, expect } from '@playwright/test';

test('log out test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@test.dk');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('textbox', { name: 'Password' }).press('Tab');
  await page.getByRole('button', { name: 'Log In' }).press('Enter');
  await page.getByRole('button', { name: '×' }).dblclick();
});
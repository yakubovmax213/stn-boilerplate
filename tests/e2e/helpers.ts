import { Page } from '@playwright/test';
import { TEST_PASSWORD } from './constants';

export const login = async (page: Page) => {
  await page.goto('/login');

  const emailInput = page.getByPlaceholder('Enter your email');
  const passwordInput = page.getByPlaceholder('Enter your password');
  const submitBtn = page.getByRole('button', {
    name: 'Sign in to your account',
  });

  await emailInput.fill(process.env.TEST_USER_EMAIL ?? '');
  await passwordInput.fill(TEST_PASSWORD);
  await submitBtn.click();
  await page.waitForURL('/');
};

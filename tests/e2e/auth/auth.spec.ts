import { test, expect } from '@playwright/test';
import { TEST_PASSWORD } from '../constants';
import { deleteUserByEmail } from '@/lib/api/db';
import { login } from '../helpers';

test.describe('login', () => {
  test('login happy path', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Login' }).click();
    const emailInput = page.getByPlaceholder('Enter your email');
    const passwordInput = page.getByPlaceholder('Enter your password');
    const submitBtn = page.getByRole('button', {
      name: 'Sign in to your account',
    });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    await emailInput.fill('yakubovmax11@gmail.com');
    await passwordInput.fill(TEST_PASSWORD);
    await submitBtn.click();

    await page.waitForURL('/');

    await expect(page).toHaveURL('/');
    await expect(page.getByText('Chats list')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Create category' })
    ).toBeVisible();
  });

  test('displays error when email does not exist', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.getByPlaceholder('Enter your email');
    const passwordInput = page.getByPlaceholder('Enter your password');
    const submitBtn = page.getByRole('button', {
      name: 'Sign in to your account',
    });

    await emailInput.fill('test-user-non-existing565@teste2e.com');
    await passwordInput.fill(TEST_PASSWORD);
    await submitBtn.click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('displays error when password is not correct', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.getByPlaceholder('Enter your email');
    const passwordInput = page.getByPlaceholder('Enter your password');
    const submitBtn = page.getByRole('button', {
      name: 'Sign in to your account',
    });

    await emailInput.fill(process.env.TEST_USER_EMAIL ?? '');
    await passwordInput.fill('INCORRECT_PASSWORD');
    await submitBtn.click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('can not access to chats when not authenticated', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        name: 'You should be logged in to see the chat list',
      })
    ).toBeVisible();
  });

  test('can not access to login and register pages when authenticated', async ({
    page,
  }) => {
    await login(page);

    await page.goto('/login');

    await expect(page).toHaveURL('/');

    await expect(
      page.getByRole('button', { name: 'Create category' })
    ).toBeVisible();

    await page.goto('/register');
    await page.waitForURL('/');

    await expect(page).toHaveURL('/');
  });
});

test.describe('register', () => {
  let registeredUserEmail = '';

  test('register happy path', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Register' }).click();
    const emailInput = page.getByPlaceholder('Enter your email');
    const passwordInput = page.getByPlaceholder('Enter your password');
    const confirmPasswordInput = page.getByPlaceholder('Confirm your password');
    const submitBtn = page.getByRole('button', {
      name: 'Create account',
    });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(confirmPasswordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    registeredUserEmail = `test-new-user${Date.now()}@teste2e.com`;
    await emailInput.fill(registeredUserEmail);
    await passwordInput.fill(TEST_PASSWORD);
    await confirmPasswordInput.fill(TEST_PASSWORD);
    await submitBtn.click();

    await page.waitForURL('/');

    await expect(page).toHaveURL('/');

    await expect(page.getByText('Chats list')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Create category' })
    ).toBeVisible();
  });

  test('displays error when passwords do not match', async ({ page }) => {
    await page.goto('/register');

    const emailInput = page.getByPlaceholder('Enter your email');
    const passwordInput = page.getByPlaceholder('Enter your password');
    const confirmPasswordInput = page.getByPlaceholder('Confirm your password');
    const submitBtn = page.getByRole('button', {
      name: 'Create account',
    });

    await emailInput.fill(`test-new-user${Date.now()}@teste2e.com`);
    await passwordInput.fill(TEST_PASSWORD);
    await confirmPasswordInput.fill('NOT_MATCH_PASSWORD');
    await submitBtn.click();

    await expect(page.getByText('Passwords must match')).toBeVisible();
  });

  test.afterAll(async () => {
    if (registeredUserEmail) {
      await deleteUserByEmail(registeredUserEmail);
    }
  });
});

test('logout happy path', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: /User:/ }).click();
  await page.getByRole('button', { name: 'Log out' }).click();

  await expect(
    page.getByRole('heading', {
      name: 'You should be logged in to see the chat list',
    })
  ).toBeVisible();
});

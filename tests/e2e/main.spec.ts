import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('create category, chat & send message flow', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'Create category' }).click();

  const categoryNameInput = page.getByPlaceholder('Enter category name');
  const categoryColorDropdown = page.getByRole('button', {
    name: 'Select category color',
  });

  const createCategoryBtn = page.getByRole('button', {
    name: 'Create category',
  });

  await expect(
    page.getByRole('heading', { level: 3, name: 'Create new category' })
  ).toBeVisible();
  await expect(categoryNameInput).toBeVisible();
  await expect(categoryColorDropdown).toBeVisible();
  await expect(createCategoryBtn).toBeVisible();

  await categoryNameInput.fill('Test category');
  await categoryColorDropdown.click();
  await page.getByText('Dodger blue').click();

  await createCategoryBtn.click();

  await expect(page.getByText('Category created successfully')).toBeVisible();

  const createChatBtn = page.locator('button', { hasText: 'Create chat' });
  await createChatBtn.click();

  await expect(
    page.getByRole('heading', { level: 3, name: 'Create new chat' })
  ).toBeVisible();

  const chatNameInput = page.getByPlaceholder('Enter chat name');
  const selectCategoryDropdown = page.getByRole('button', {
    name: 'Select chat category',
  });

  const systemPromptInput = page.getByPlaceholder(
    /Enter system prompt for chat/
  );

  await expect(chatNameInput).toBeVisible();
  await expect(selectCategoryDropdown).toBeVisible();
  await expect(systemPromptInput).toBeVisible();

  await chatNameInput.fill('New created chat');
  await selectCategoryDropdown.click();
  await page.getByText('Test category').click();

  await systemPromptInput.fill('Wanna test you');
  await page.getByText('gpt-3.5-turbo').click();

  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Create chat' })
    .click();

  await page.locator('text=New created chat').click();

  await page.waitForURL('chat/**');
  await expect(page.getByTestId('messageList')).toBeVisible();

  const questionInput = page.getByPlaceholder(
    'Enter your question to PawsitiveAI'
  );

  await expect(questionInput).toBeVisible();
  await questionInput.fill('Hi, how you works?');
  await questionInput.press('Enter');

  await expect(page.getByTestId('message-received')).toBeVisible({
    timeout: 30000,
  });
});

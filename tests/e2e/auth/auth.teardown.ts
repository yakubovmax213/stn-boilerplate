import { test as setup } from '@playwright/test';
import { deleteUser } from '@/lib/api/db';

setup('delete user', async () => {
  try {
    await deleteUser(process.env.TEST_USER_ID ?? '');
  } catch (err) {
    console.log('failed remove user', (err as Error)?.message);
  }
});

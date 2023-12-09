import { test as setup } from '@playwright/test';
import { createUser } from '@/lib/api/db';
import * as argon from 'argon2';
import { TEST_PASSWORD } from '../constants';

setup('authenticate', async () => {
  const passwordHash = await argon.hash(TEST_PASSWORD, {
    secret: Buffer.from(process.env.AUTH_SECRET ?? ''),
  });

  const { id = '', email } = await createUser({
    email: `test${Date.now()}@teste2e.com`,
    password: passwordHash,
  });

  process.env.TEST_USER_ID = id;
  process.env.TEST_USER_EMAIL = email ?? '';
});

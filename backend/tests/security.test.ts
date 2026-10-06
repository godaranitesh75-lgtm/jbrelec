import assert from 'node:assert/strict';
import test from 'node:test';

import { getJwtSecret, hashPassword, verifyPassword } from '../src/services/auth.js';

test('password hashes use a modern password hashing algorithm', async () => {
  const hash = await hashPassword('Passw0rd!123');
  assert.match(hash, /^\$2[aby]\$/);
});

test('jwt secret must be explicitly configured instead of a default shared secret', () => {
  const secret = getJwtSecret();
  assert.ok(secret.length >= 32);
  assert.ok(secret !== 'jbr_electrical_secret_key_2024_secure_production_key');
});

test('password verification matches the stored hash', async () => {
  const hash = await hashPassword('StrongPassword!2024');
  assert.equal(await verifyPassword(hash, 'StrongPassword!2024'), true);
  assert.equal(await verifyPassword(hash, 'WrongPassword!2024'), false);
});

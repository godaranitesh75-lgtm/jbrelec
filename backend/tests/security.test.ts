import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer, type Server } from 'node:http';

import { getJwtSecret, hashPassword, verifyPassword } from '../src/services/auth.js';
import { app } from '../src/app.js';

let server: Server;
let baseUrl: string;

before(async () => {
  server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Test API failed to start.');
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

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

test('allows the Vercel storefront and Android app origins through CORS', async () => {
  for (const origin of ['https://jbr-electrical.vercel.app', 'capacitor://localhost', 'https://localhost']) {
    const response = await fetch(`${baseUrl}/api/products`, {
      method: 'OPTIONS',
      headers: {
        Origin: origin,
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization,content-type',
      },
    });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), origin);
    assert.match(response.headers.get('access-control-allow-methods') ?? '', /GET/);
  }
});

test('requires an authenticated admin for the mobile catalog API', async () => {
  const response = await fetch(`${baseUrl}/api/admin/products`);
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { message: 'Authentication required' });
});

test('requires authentication before accepting a Cloudinary image upload', async () => {
  const response = await fetch(`${baseUrl}/api/uploads/image`, { method: 'POST' });
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { message: 'Authentication required' });
});

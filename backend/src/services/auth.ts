import jwt, { type SignOptions, type Secret } from 'jsonwebtoken';
import crypto from 'node:crypto';

const jwtSecret: Secret = process.env.JWT_SECRET ?? 'jbr_electrical_secret_key_2024_secure_production_key';
const expiresIn = process.env.JWT_EXPIRES_IN ?? '7d';

function hashWithSha256(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export async function hashPassword(password: string) {
  return `$sha256$${hashWithSha256(password)}`;
}

export async function verifyPassword(hash: string, password: string) {
  const expected = hash.startsWith('$sha256$') ? hash.slice('$sha256$'.length) : null;
  if (!expected) {
    return false;
  }

  return expected === hashWithSha256(password);
}

export function signJwt(payload: Record<string, unknown>) {
  const options = { expiresIn: expiresIn as string | number } as SignOptions;
  return jwt.sign(payload, jwtSecret, options);
}

export function verifyJwt(token: string) {
  return jwt.verify(token, jwtSecret) as Record<string, unknown>;
}

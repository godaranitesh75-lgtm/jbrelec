import jwt, { type SignOptions, type Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

const legacySha256Prefix = '$sha256$';
const defaultDevSecret = 'development-secret-do-not-use-in-production-change-me';
const expiresIn = process.env.JWT_EXPIRES_IN ?? '7d';

export function getJwtSecret(): Secret {
  const configuredSecret = process.env.JWT_SECRET ?? process.env.AUTH_JWT_SECRET ?? defaultDevSecret;

  if (process.env.NODE_ENV === 'production' && (!configuredSecret || configuredSecret.length < 32 || configuredSecret === defaultDevSecret)) {
    throw new Error('JWT_SECRET must be set to a strong secret in production.');
  }

  if (!process.env.JWT_SECRET && !process.env.AUTH_JWT_SECRET) {
    return crypto.randomBytes(32).toString('hex');
  }

  return configuredSecret;
}

function hashWithSha256(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(hashValue: string, password: string) {
  if (hashValue.startsWith('$2a$') || hashValue.startsWith('$2b$') || hashValue.startsWith('$2y$')) {
    return bcrypt.compare(password, hashValue);
  }

  if (hashValue.startsWith(legacySha256Prefix)) {
    const expected = hashValue.slice(legacySha256Prefix.length);
    return expected === hashWithSha256(password);
  }

  return false;
}

export function signJwt(payload: Record<string, unknown>) {
  const jwtSecret = getJwtSecret();
  const options = { expiresIn: expiresIn as string | number } as SignOptions;
  return jwt.sign(payload, jwtSecret, options);
}

export function verifyJwt(token: string) {
  const jwtSecret = getJwtSecret();
  return jwt.verify(token, jwtSecret) as Record<string, unknown>;
}

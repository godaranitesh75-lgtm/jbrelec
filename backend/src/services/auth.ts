import jwt, { type SignOptions, type Secret } from 'jsonwebtoken';
import argon2 from 'argon2';

const jwtSecret: Secret = process.env.JWT_SECRET ?? 'jbr_electrical_secret_key_2024_secure_production_key';
const expiresIn = process.env.JWT_EXPIRES_IN ?? '7d';

export function hashPassword(password: string) {
  return argon2.hash(password);
}

export function verifyPassword(hash: string, password: string) {
  return argon2.verify(hash, password);
}

export function signJwt(payload: Record<string, unknown>) {
  const options = { expiresIn: expiresIn as string | number } as SignOptions;
  return jwt.sign(payload, jwtSecret, options);
}

export function verifyJwt(token: string) {
  return jwt.verify(token, jwtSecret) as Record<string, unknown>;
}

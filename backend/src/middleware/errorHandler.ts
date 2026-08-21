import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  void _next;
  console.error(err);
  const message = err instanceof Error ? err.message : 'Internal server error';
  return res.status(500).json({ message });
}

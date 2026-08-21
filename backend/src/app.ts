import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authRouter } from './routes/auth.js';
import { productRouter } from './routes/products.js';
import { orderRouter } from './routes/orders.js';
import { deliveryRouter } from './routes/deliveries.js';
import { adminRouter } from './routes/admin.js';
import { accountRouter } from './routes/account.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.resolve(__dirname, '../../dist');
const frontendIndex = path.join(frontendDist, 'index.html');

export const app = express();

app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => res.json({ status: 'ok', environment: process.env.NODE_ENV ?? 'development' }));

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/deliveries', deliveryRouter);
app.use('/api/admin', adminRouter);
app.use('/api/account', accountRouter);

app.use(express.static(frontendDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  return res.sendFile(frontendIndex);
});

app.use(errorHandler);

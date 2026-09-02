import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { authRouter } from './routes/auth.js';
import { productRouter } from './routes/products.js';
import { orderRouter } from './routes/orders.js';
import { deliveryRouter } from './routes/deliveries.js';
import { adminRouter } from './routes/admin.js';
import { accountRouter } from './routes/account.js';
import { blogRouter } from './routes/blog.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const candidateDistPaths = [
  path.resolve(__dirname, '../../dist'),
  path.resolve(__dirname, '../../../dist'),
  path.resolve(process.cwd(), 'dist'),
  path.resolve(process.cwd(), '../dist'),
];

const frontendDist = candidateDistPaths.find((candidate) => existsSync(path.join(candidate, 'index.html')));
const frontendIndex = frontendDist ? path.join(frontendDist, 'index.html') : null;
const adminProductsHtml = path.resolve(__dirname, '../../admin-products.html');

export const app = express();

app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => res.json({ status: 'ok', environment: process.env.NODE_ENV ?? 'development' }));

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/deliveries', deliveryRouter);
app.use('/api/admin', adminRouter);
app.use('/api/account', accountRouter);
app.use('/api/blog', blogRouter);

if (frontendDist) {
  app.use(express.static(frontendDist));
}

app.get(['/admin-products.html', '/admin-products', '/admin-panel'], (_req, res) => {
  if (!existsSync(adminProductsHtml)) {
    return res.status(404).json({ message: 'Admin HTML file not found.' });
  }

  return res.sendFile(adminProductsHtml);
});

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  if (!frontendIndex) {
    return res.status(404).json({
      message: 'Frontend build not found. Run the frontend build in the project root before starting the backend.',
    });
  }

  return res.sendFile(frontendIndex);
});

app.use(errorHandler);


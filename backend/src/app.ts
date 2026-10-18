import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
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
import { uploadRouter } from './routes/uploads.js';
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

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://jbr-electrical.vercel.app',
  'capacitor://localhost',
  'http://localhost',
  'https://localhost',
];
const configuredOrigins = (process.env.CORS_ORIGIN ?? process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])];

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 250,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { message: 'Too many authentication attempts, please try again later.' },
});

export const app = express();

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", 'https:', 'http://localhost:5173', 'http://localhost:3000'],
    },
  },
}));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', environment: process.env.NODE_ENV ?? 'development' }));

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/deliveries', deliveryRouter);
app.use('/api/admin', adminRouter);
app.use('/api/account', accountRouter);
app.use('/api/blog', blogRouter);
app.use('/api/uploads', uploadRouter);

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

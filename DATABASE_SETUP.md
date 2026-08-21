# JBR Electrical - Database Setup Guide

## Overview
This document provides complete instructions for setting up and managing the JBR Electrical e-commerce platform database and backend.

---

## Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **npm**: v9+
- **PostgreSQL**: Database already configured (Neon Cloud)
- **Git**: For version control

---

## Initial Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

The `.env` file is already configured in `/backend/.env` with:

```
DATABASE_URL=postgresql://neondb_owner:npg_TnUizRlZ6D7W@ep-green-term-awhyorsd.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require
PORT=4000
NODE_ENV=development
JWT_SECRET=jbr_electrical_secret_key_2024_secure_production_key
```

### 3. Automated Setup (Recommended)

Run the complete setup with a single command:

```bash
npm run setup
```

This will:
- Generate Prisma client
- Push schema to database
- Seed initial data

### 4. Manual Setup (Alternative)

If you prefer step-by-step setup:

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database (creates all tables)
npm run prisma:push

# Seed initial data
npm run seed
```

---

## Database Architecture

### Core Entities

1. **Users & Profiles**
   - `User`: Base user model with authentication
   - `CustomerProfile`: Customer-specific data
   - `AdminProfile`: Admin accounts
   - `StaffProfile`: Staff members
   - `DeliveryBoyProfile`: Delivery partners

2. **Products & Catalog**
   - `Brand`: Product brands
   - `Category`: Product categories
   - `Product`: Product listings
   - `ProductVariant`: Product variations
   - `Inventory`: Stock management

3. **Orders & Transactions**
   - `Order`: Customer orders
   - `OrderItem`: Items in orders
   - `Payment`: Payment records
   - `Refund`: Refund tracking
   - `OrderStatusHistory`: Order status timeline

4. **Delivery & Logistics**
   - `Delivery`: Delivery assignments
   - `DeliveryLocation`: Real-time tracking locations

5. **Shopping & Carts**
   - `Cart`: Customer shopping carts
   - `CartItem`: Items in carts

6. **Support & Communication**
   - `Notification`: User notifications
   - `Quotation`: Customer quotations
   - `AuditLog`: System audit trail

---

## Test Credentials

After setup, use these credentials for testing:

### Admin Account
- **Email**: admin@jbrelectrical.com
- **Password**: Password123!
- **Role**: Administrator

### Staff Account
- **Email**: staff@jbrelectrical.com
- **Password**: Password123!
- **Role**: Staff

### Delivery Account
- **Email**: delivery@jbrelectrical.com
- **Password**: Password123!
- **Role**: Delivery Boy

### Customer Accounts
- **Email**: customer1@jbrelectrical.com through customer5@jbrelectrical.com
- **Password**: Password123!
- **Role**: Customer

---

## Running the Application

### Development Mode

```bash
npm run dev
```

The backend will run on `http://localhost:4000`

Health check endpoint: `http://localhost:4000/api/health`

### Production Build

```bash
npm run build
npm start
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new customer
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products?search=query` - Search products

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/:id/cancel` - Cancel order

### Account
- `GET /api/account/profile` - Get customer profile
- `GET /api/account/addresses` - Get customer addresses
- `POST /api/account/addresses` - Add new address

### Deliveries
- `GET /api/deliveries/:orderId` - Get delivery status
- `GET /api/deliveries/:orderId/tracking` - Real-time tracking

---

## Database Operations

### Reset Database

⚠️ **Warning**: This deletes all data!

```bash
npx prisma migrate reset
npm run seed
```

### Generate Database Schema Changes

```bash
npx prisma migrate dev --name <migration_name>
```

### View Database UI

```bash
npx prisma studio
```

Opens interactive database browser at `http://localhost:5555`

---

## Troubleshooting

### Issue: Database Connection Failed

**Solution**:
```bash
# Verify DATABASE_URL in .env
# Check internet connection
# Verify Neon Cloud project is active
npm run prisma:push
```

### Issue: Missing Prisma Client

**Solution**:
```bash
npm run prisma:generate
```

### Issue: Port 4000 Already in Use

**Solution**:
```bash
# Change PORT in .env or use different port
PORT=5000 npm run dev
```

### Issue: Token Verification Failed

**Solution**:
- Verify JWT_SECRET matches in .env
- Check token expiration (default 7 days)
- Clear browser cookies and re-login

---

## Security Best Practices

1. **Never commit `.env` file** - It contains secrets
2. **Rotate JWT_SECRET** - Change in production
3. **Use HTTPS** - Always use SSL/TLS in production
4. **Validate Input** - All endpoints validate user input
5. **Hash Passwords** - Using Argon2 algorithm
6. **Audit Logging** - Track all user actions

---

## Monitoring & Maintenance

### Check Database Health

```bash
curl http://localhost:4000/api/health
```

Expected response:
```json
{ "status": "ok", "environment": "development" }
```

### Monitor Logs

```bash
npm run dev 2>&1 | tee server.log
```

### Backup Database

```bash
# Neon Cloud handles automated backups
# Download backup from Neon dashboard
```

---

## Support & Contacts

- **Database Issues**: Check Neon Cloud console
- **Backend Issues**: Review server logs
- **API Documentation**: `/api/health` endpoint confirms connectivity

---

## Next Steps

1. ✅ Setup complete!
2. 📁 Review schema in `backend/prisma/schema.prisma`
3. 🚀 Start development: `npm run dev`
4. 📖 Read API documentation
5. 🧪 Test endpoints with Postman/Insomnia

---

**Last Updated**: August 2024
**Version**: 1.0
**Status**: Production Ready

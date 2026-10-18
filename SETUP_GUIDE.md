# JBR Electrical - Complete Setup Guide

## Project Overview

JBR Electrical is a professional e-commerce platform for electrical products and accessories. Built with React + TypeScript (frontend) and Express.js + PostgreSQL (backend), it provides:

- 🛍️ Product catalog with search and filtering
- 👤 Customer accounts and profiles
- 📦 Order management system
- 🚚 Real-time delivery tracking
- 💳 Payment processing
- 📱 Responsive design

---

## Quick Start

### Prerequisites
- Node.js v18+ (LTS)
- npm v9+
- Internet connection (for external dependencies)

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Setup Database

```bash
cd backend
npm run setup
cd ..
```

This automatically:
- Generates Prisma client
- Creates database schema
- Seeds initial data
- Creates test accounts

### Step 3: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

Visit: `http://localhost:5173`

---

## Project Structure

```
jbrelec/
├── src/                          # Frontend React app
│   ├── views/                   # Page components
│   │   ├── Contact.tsx          # Contact page
│   │   ├── About.tsx            # About page
│   │   ├── Services.tsx         # Services page
│   │   ├── Brands.tsx           # Brands page
│   │   └── ...
│   ├── App.tsx                  # Main app component
│   ├── api.ts                   # API client
│   ├── auth.tsx                 # Authentication logic
│   └── main.tsx                 # Entry point
│
├── backend/                      # Express.js backend
│   ├── src/
│   │   ├── routes/              # API routes
│   │   │   ├── auth.ts          # Authentication
│   │   │   ├── orders.ts        # Orders
│   │   │   ├── products.ts      # Products
│   │   │   └── ...
│   │   ├── services/            # Business logic
│   │   ├── middleware/          # Express middleware
│   │   ├── libs/                # Utilities
│   │   └── server.ts            # Server entry
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Seed data
│   ├── .env                     # Environment config
│   └── package.json
│
├── DATABASE_SETUP.md            # Database guide
├── SETUP_GUIDE.md               # This file
└── package.json
```

---

## Configuration

### Frontend (.env in root)

No `.env` needed for development. API calls default to `http://localhost:4000`

### Backend (.env in backend/)

Set these variables in `backend/.env` for local development and in the backend
service environment for deployment:
```
DATABASE_URL=postgresql://...    # Neon Cloud connection
PORT=4000                        # Backend port
NODE_ENV=development             # Environment
JWT_SECRET=...                   # JWT signing key
CLOUDINARY_CLOUD_NAME=...        # Cloudinary cloud name
CLOUDINARY_API_KEY=...           # Cloudinary API key
CLOUDINARY_API_SECRET=...        # Keep this secret on the backend only
```

The admin product form uploads photos through the authenticated backend endpoint
`POST /api/uploads/image`. It stores the returned Cloudinary URLs in the product
record in Neon. Configure the three Cloudinary variables in the backend's local
`.env` file and in the deployed backend service environment; do not add them to
the frontend environment.

---

## Test Accounts

After `npm run setup`, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@jbrelectrical.com | Password123! |
| Staff | staff@jbrelectrical.com | Password123! |
| Delivery | delivery@jbrelectrical.com | Password123! |
| Customer | customer1@jbrelectrical.com | Password123! |

---

## Available Scripts

### Frontend

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
npm run typecheck    # Check TypeScript types
```

### Backend

```bash
npm run dev          # Start dev server with auto-reload
npm run build        # Build TypeScript to JavaScript
npm start            # Run production build
npm run setup        # Complete database setup
npm run seed         # Seed database with test data
npm run prisma:*     # Prisma CLI commands
```

---

## Key Features

### 🏠 Homepage
- Product categories
- Featured products gallery
- Customer testimonials
- Call-to-action sections

### 📦 Products
- Browse by category
- Search functionality
- Product details modal
- Stock availability
- Price comparison

### 👥 Customer Portal
- Create account / Login
- View order history
- Track deliveries
- Manage addresses
- Update profile

### 🛒 Shopping
- Add to cart
- Quick checkout
- Multiple addresses
- Order confirmation

### 📍 Tracking
- Real-time delivery status
- Delivery boy location
- Estimated arrival
- Delivery history

### 📱 Professional Pages
- **About**: Company story and team
- **Services**: Support and solutions
- **Brands**: Brand partners showcase
- **Contact**: Get in touch form and office info

---

## API Overview

### Health Check
```bash
GET http://localhost:4000/api/health
```

### Authentication
```bash
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Products
```bash
GET /api/products
GET /api/products?search=lamp
GET /api/products/:id
```

### Orders
```bash
POST /api/orders
GET /api/orders
GET /api/orders/:id
POST /api/orders/:id/cancel
GET /api/orders/:id/tracking
```

### Account
```bash
GET /api/account/profile
GET /api/account/addresses
POST /api/account/addresses
```

---

## Database Management

### View Database (Interactive UI)
```bash
cd backend
npx prisma studio
```

Opens: `http://localhost:5555`

### Create Migration
```bash
cd backend
npx prisma migrate dev --name <name>
```

### Reset Database (⚠️ Deletes all data)
```bash
cd backend
npx prisma migrate reset
```

---

## Deployment Ready

### Frontend Deployment
```bash
npm run build
# Outputs to: dist/
# Deploy 'dist/' folder to Vercel, Netlify, or any static host
```

### Backend Deployment
```bash
cd backend
npm run build
npm start
# Deploy with Node.js hosting (Heroku, Railway, Render, etc.)
```

---

## Professional Features

✅ **Responsive Design** - Mobile, tablet, desktop
✅ **Modern UI/UX** - Clean, professional interface
✅ **SEO Optimized** - Proper meta tags and structure
✅ **Accessibility** - WCAG 2.1 compliant
✅ **Security** - Encrypted passwords, JWT auth, input validation
✅ **Performance** - Optimized assets, lazy loading
✅ **Error Handling** - Graceful error messages
✅ **Logging** - Audit trail and activity logs
✅ **Scalable** - Modular architecture

---

## Troubleshooting

### Port Conflicts
```bash
# Check ports
lsof -i :4000  # Backend
lsof -i :5173  # Frontend

# Use different ports
PORT=5000 npm run dev
```

### Database Connection Issues
```bash
# Verify connection
npm run prisma:push

# Check DATABASE_URL in .env
cat backend/.env
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npm run typecheck
```

---

## Performance Tips

1. **Enable Caching** - Set cache headers in production
2. **Optimize Images** - Compress product images
3. **Database Indexes** - Already configured in schema
4. **Code Splitting** - React handles this automatically
5. **Monitor Performance** - Use browser DevTools

---

## Security Checklist

- ✅ Environment variables secured
- ✅ Passwords hashed with Argon2
- ✅ JWT tokens for authentication
- ✅ CORS enabled for frontend
- ✅ Input validation on all endpoints
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Rate limiting ready to implement
- ✅ Audit logging enabled

---

## Support & Contact

**For Issues:**
- Check the logs: `npm run dev 2>&1 | tee app.log`
- Review error messages
- Consult DATABASE_SETUP.md

**JBR Electrical Contact:**
- 📍 Syed Jung Lane, Troop Bazaar, Koti, Hyderabad
- 📞 6377374179
- 📧 jabraram8015@gmail.com

---

## Next Steps

1. ✅ Run `npm run setup` in backend/
2. ✅ Start both dev servers
3. ✅ Visit http://localhost:5173
4. ✅ Test with provided credentials
5. ✅ Customize branding and content
6. ✅ Deploy to production

---

## Documentation

- `DATABASE_SETUP.md` - Database administration
- `backend/prisma/schema.prisma` - Database schema
- `src/api.ts` - Frontend API client

---

**Version**: 1.0 Production Ready
**Last Updated**: August 2024
**Status**: ✅ All Systems Operational

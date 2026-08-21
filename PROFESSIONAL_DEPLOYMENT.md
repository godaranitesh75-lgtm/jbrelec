# JBR Electrical - Professional Deployment Guide

## Production Deployment Checklist

### Pre-Deployment

- [ ] Run all tests: `npm run test` (if available)
- [ ] Build frontend: `npm run build`
- [ ] Build backend: `cd backend && npm run build`
- [ ] Check for TypeScript errors: `npm run typecheck`
- [ ] Review security: Validate all secrets
- [ ] Performance audit: Lighthouse scores >90
- [ ] Database backup: Create snapshot
- [ ] SSL certificates: Obtain valid certificates

### Environment Setup

#### Production .env (backend/)

```env
DATABASE_URL=postgresql://prod_user:prod_password@prod_db_host:5432/jbr_prod?sslmode=require
PORT=5000
NODE_ENV=production
JWT_SECRET=generate_secure_random_string_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://jbrelectrical.com
ADMIN_EMAIL=admin@jbrelectrical.com
```

#### Production Frontend Config

Update `src/api.ts`:
```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'https://api.jbrelectrical.com';
```

---

## Deployment Platforms

### Option 1: Railway.app (Recommended)

**Backend Deployment:**
```bash
npm install -g railway
railway login
railway init
# Select backend directory
railway up
```

**Frontend Deployment:**
- Connect GitHub repository
- Select `dist` as build output
- Set build command: `npm run build`

### Option 2: Heroku

**Backend:**
```bash
heroku login
heroku create jbr-electrical-backend
git push heroku main
heroku config:set JWT_SECRET=your_secret_here
```

**Frontend (Vercel recommended instead)**

### Option 3: Self-Hosted (VPS)

**1. Server Setup (Ubuntu 22.04)**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

**2. Database Setup**

```bash
sudo -u postgres createdb jbr_prod
sudo -u postgres psql
# In psql:
CREATE USER jbr_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE jbr_prod TO jbr_user;
\q
```

**3. Backend Deployment**

```bash
# Clone repository
cd /var/www
git clone <your-repo> jbr-electrical
cd jbr-electrical/backend

# Install dependencies
npm install --production

# Build
npm run build

# Create .env file
sudo nano .env
# Paste production config

# Start with PM2
pm2 start dist/src/server.js --name "jbr-backend"
pm2 save
pm2 startup
```

**4. Frontend Deployment**

```bash
cd /var/www/jbr-electrical
npm install --production

# Build
npm run build

# Copy to Nginx
sudo cp -r dist/* /var/www/html/
```

**5. Nginx Configuration**

Create `/etc/nginx/sites-available/jbr-electrical`:

```nginx
server {
    listen 80;
    server_name jbrelectrical.com www.jbrelectrical.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name jbrelectrical.com www.jbrelectrical.com;

    ssl_certificate /etc/letsencrypt/live/jbrelectrical.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jbrelectrical.com/privkey.pem;

    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/jbr-electrical /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**6. SSL Certificate (Let's Encrypt)**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d jbrelectrical.com -d www.jbrelectrical.com
```

---

## Monitoring & Maintenance

### Application Monitoring

```bash
# Monitor with PM2
pm2 monit

# View logs
pm2 logs

# Update backend
pm2 restart jbr-backend
pm2 save
```

### Database Monitoring

```bash
# Connect to production database
psql -h your_db_host -U jbr_user -d jbr_prod

# Check database size
SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) 
FROM pg_database;

# Monitor connections
SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;
```

### Backup Strategy

```bash
# Daily backup script (/usr/local/bin/backup-jbr.sh)
#!/bin/bash
BACKUP_DIR="/backups/jbr-electrical"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Database backup
pg_dump -h localhost -U jbr_user -d jbr_prod | gzip > $BACKUP_DIR/db_$TIMESTAMP.sql.gz

# Keep last 7 days
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +7 -delete

echo "Backup completed: $TIMESTAMP"
```

Schedule with cron:
```bash
# 2 AM daily
0 2 * * * /usr/local/bin/backup-jbr.sh
```

---

## Performance Optimization

### Frontend Optimization

1. **Code Splitting**
```typescript
// Already enabled with Vite
```

2. **Asset Optimization**
```bash
# Optimize images before deployment
# Use tools like: ImageOptim, TinyPNG, or similar
```

3. **Caching Headers** (Nginx)
```nginx
location ~* \.js$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}

location ~* \.css$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}

location ~* \.(png|jpg|svg|gif)$ {
    expires 365d;
    add_header Cache-Control "public, immutable";
}
```

### Backend Optimization

1. **Database Indexes** - Already configured in Prisma schema
2. **Connection Pooling** - Configure in production:

```env
# Add to .env
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public&connection_limit=5&pool_timeout=5&pool_idle_in_transaction_session_timeout=5000"
```

3. **Caching Layer** (Redis - Optional)
```bash
# Install Redis
docker run -d -p 6379:6379 redis:latest

# Configure in backend if needed
```

---

## Security Hardening

### API Security

```typescript
// Rate limiting (add to backend/src/app.ts)
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
```

### HTTPS/SSL

- ✅ Configured in Nginx above
- Certificate auto-renewal: `certbot renew --quiet` (daily cron)

### CORS

Production CORS configuration:
```typescript
app.use(cors({
  origin: 'https://jbrelectrical.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Environment Security

Never commit `.env`:
```bash
# .gitignore (already configured)
.env
.env.production
.env.local
```

---

## Monitoring Tools

### Application Performance

- **New Relic**: `npm install newrelic`
- **DataDog**: Python agent for full-stack monitoring
- **Sentry**: Error tracking `npm install @sentry/node`

### Server Monitoring

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Monitor in real-time
htop
```

---

## Disaster Recovery

### Restore from Backup

```bash
# Restore database
gunzip < /backups/jbr-electrical/db_20240820_020000.sql.gz | psql -h localhost -U jbr_user -d jbr_prod

# Restart application
pm2 restart jbr-backend
```

### Failover Procedure

1. Detect failure (automated monitoring)
2. Isolate affected services
3. Restore from backup
4. Verify data integrity
5. Resume operations

---

## Compliance & Legal

- ✅ Data Protection: All user passwords hashed
- ✅ GDPR Ready: User data export available
- ✅ Audit Logging: All transactions logged
- ✅ Terms of Service: Required at signup
- ✅ Privacy Policy: Available on website

---

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify database connectivity
- [ ] Check SSL certificate validity
- [ ] Test payment processing
- [ ] Verify email notifications
- [ ] Monitor error logs (24 hours)
- [ ] Verify backup procedures
- [ ] Test disaster recovery
- [ ] Document any changes
- [ ] Notify team of deployment

---

## Incident Response

### If Production is Down

1. **Immediate Response** (First 5 minutes)
   - Check server status
   - Review recent logs
   - Check database connectivity
   - Restart application: `pm2 restart all`

2. **Investigation** (5-30 minutes)
   - Review error logs
   - Check system resources
   - Verify database
   - Check external dependencies

3. **Resolution** (30+ minutes)
   - Deploy hotfix or rollback
   - Verify fixes
   - Notify users
   - Document incident

### Escalation

- **Level 1**: Automatic restart
- **Level 2**: Rollback to previous version
- **Level 3**: Restore from backup

---

## Support & Contacts

**Emergency Support:**
- 📞 6377374179
- 📧 jabraram8015@gmail.com

**System Status:**
- Check: `https://jbrelectrical.com/api/health`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Aug 2024 | Initial production deployment |

---

**Status**: ✅ Production Ready
**Last Updated**: August 2024
**Maintained By**: JBR Electrical Team

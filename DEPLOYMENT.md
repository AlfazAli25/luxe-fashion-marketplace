# Deployment Guide

## Prerequisites
- Node.js 18+ and npm 9+
- MongoDB Atlas account (or MongoDB instance)
- Vercel/Netlify account (for frontend)
- Render/Railway/Heroku account (for backend)

## Backend Deployment (Render/Railway)

### 1. Prepare Backend
```bash
cd backend
npm install
```

### 2. Environment Variables
Set these in your hosting platform:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_string
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### 3. Deploy to Render
1. Connect GitHub repository
2. Select `backend` folder as root directory
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables
6. Deploy

### 4. Seed Database (One-time)
After deployment, run:
```bash
npm run seed
```

## Frontend Deployment (Vercel/Netlify)

### 1. Prepare Frontend
```bash
cd frontend
npm install
```

### 2. Environment Variables
Create `.env.production`:
```
VITE_API_URL=https://your-backend-domain.com/api
VITE_API_BASE_URL=https://your-backend-domain.com
```

### 3. Deploy to Vercel
```bash
npm install -g vercel
cd frontend
vercel --prod
```

Or use Vercel dashboard:
1. Import GitHub repository
2. Select `frontend` folder
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variables
7. Deploy

### 4. Deploy to Netlify
```bash
cd frontend
npm run build
```
Then drag `dist` folder to Netlify or use CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Post-Deployment

### Update CORS
Update backend `.env`:
```
FRONTEND_URL=https://your-actual-frontend-domain.com
```

### Test Endpoints
- Backend health: `https://your-backend.com/api/health`
- Frontend: `https://your-frontend.com`

### Create Demo Accounts
1. Register a buyer account
2. Register a seller account
3. Test full flow

## MongoDB Atlas Setup

1. Create cluster at mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP: 0.0.0.0/0 (allow all)
4. Get connection string
5. Replace `<password>` with your password
6. Add to backend environment variables

## Security Checklist
- ✅ Strong JWT_SECRET (32+ random characters)
- ✅ MongoDB connection string secured
- ✅ CORS configured with specific frontend URL
- ✅ Environment variables not committed to git
- ✅ HTTPS enabled on both frontend and backend
- ✅ Rate limiting (optional, add express-rate-limit)

## Monitoring
- Check backend logs regularly
- Monitor MongoDB Atlas metrics
- Set up error tracking (Sentry, optional)

## Troubleshooting

### CORS Errors
- Verify FRONTEND_URL in backend .env
- Check frontend API URLs

### Database Connection Failed
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

### Images Not Loading
- Check if backend URL is correct in frontend .env
- Verify uploads folder exists and is accessible

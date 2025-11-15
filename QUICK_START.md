# Quick Start Guide

## Local Development

### 1. Clone & Install
```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 2. Configure Environment

**Backend (.env):**
```bash
cd backend
# Copy example and edit
copy .env.example .env
```
Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):**
```bash
cd frontend
# Copy example and edit
copy .env.example .env
```
Content:
```
VITE_API_URL=http://localhost:5000/api
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Seed Database
```bash
cd backend
npm run seed
```

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

### 5. Test Application

**Demo Accounts:**
- Seller: `seller@demo.com` / `seller123`
- Create buyer account via registration

**Test Features:**
- Browse products: http://localhost:3000
- Filter by category (Men, Women, Accessories)
- Filter by badge (New Arrivals)
- Add to cart (buyer account)
- Checkout and create order
- View seller dashboard (seller account)

## Production Deployment

### Quick Deploy Commands

**Backend to Render:**
1. Push to GitHub
2. Connect repository on Render
3. Set environment variables
4. Deploy

**Frontend to Vercel:**
```bash
cd frontend
npm install -g vercel
vercel --prod
```

**Frontend to Netlify:**
```bash
cd frontend
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Common Commands

### Backend
```bash
npm run dev          # Start development server
npm start            # Start production server
npm run seed         # Seed database with products
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify .env file exists
- Check port 5000 is available

### Frontend can't connect to backend
- Verify backend is running
- Check VITE_API_URL in frontend .env
- Check CORS settings in backend

### Database connection failed
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
- Check connection string format
- Ensure database user has correct permissions

### Products not showing
- Run seed script: `npm run seed`
- Check backend logs for errors
- Verify MongoDB connection

## Project Structure
```
Kryptonix_Project/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Express server
│   ├── seedProducts.js  # Database seeder
│   └── .env            # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── stores/      # Zustand stores
│   │   └── utils/       # API utilities
│   └── .env            # Environment variables
└── README.md
```

## Next Steps

1. ✅ Local development working
2. ✅ Test all features
3. 📝 Review PRODUCTION_CHECKLIST.md
4. 🚀 Deploy to production
5. 🔍 Verify deployment
6. 🎉 Launch!

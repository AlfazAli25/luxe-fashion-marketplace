# Setup Guide - LUXE Fashion Marketplace

## ✅ What's Ready

Your project is now **production-ready** with:
- ✅ Dark theme frontend connected to backend
- ✅ All API integrations working
- ✅ Zustand state management
- ✅ Framer Motion animations
- ✅ Responsive design
- ✅ Old frontend backed up as `frontend-old-backup`

## 🚀 Steps to Run

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
```

Backend will run on http://localhost:5000

### 2. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:3000

## 📤 Push to GitHub

```bash
# Navigate to project root
cd c:\Users\alfaz\OneDrive\Desktop\Kryptonix_Project

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: LUXE Fashion Marketplace with dark theme"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## 🗑️ Clean Up (Optional)

After confirming everything works, you can delete the old frontend backup:

```bash
rmdir /s /q frontend-old-backup
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_here
```

### Frontend
No .env needed - API proxy configured in vite.config.js

## 📦 What Changed

### Removed
- ❌ Old teal-themed frontend (backed up)
- ❌ Standalone dark-theme examples

### Added
- ✅ New dark theme frontend in `/frontend`
- ✅ Connected to existing backend
- ✅ Zustand stores (auth, cart)
- ✅ Modern components (Navbar, ProductCard)
- ✅ Pages (Home, Login, Register, Products)

## 🎨 Features

- **Dark Theme** - Premium black with teal accents
- **Glassmorphism** - Frosted glass effects
- **Animations** - Smooth Framer Motion transitions
- **3D Ready** - Three.js integration prepared
- **State Management** - Zustand with persistence
- **API Connected** - All backend endpoints integrated

## 🧪 Test the App

1. Register a new account (buyer or seller)
2. Login with credentials
3. Browse products
4. Add items to cart (buyer)
5. View cart with animations
6. Test seller dashboard (if seller account)

## 🚢 Production Deployment

### Backend
1. Deploy to Railway/Render/Heroku
2. Set environment variables
3. Connect MongoDB Atlas

### Frontend
1. Update API_BASE_URL in `src/utils/api.js` to your backend URL
2. Build: `npm run build`
3. Deploy to Vercel/Netlify

## 📝 Notes

- Backend must be running before frontend
- MongoDB must be running locally or use Atlas
- All routes are protected with JWT
- Cart syncs with backend automatically

## 🆘 Troubleshooting

**Frontend can't connect to backend:**
- Check backend is running on port 5000
- Check CORS is enabled in backend
- Check API_BASE_URL in frontend

**MongoDB connection error:**
- Start MongoDB service
- Or use MongoDB Atlas connection string

**Port already in use:**
- Change port in vite.config.js (frontend)
- Change PORT in .env (backend)

# LUXE Fashion Marketplace - Dark Theme Frontend

Premium dark-themed fashion marketplace connected to your existing backend.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: http://localhost:3000
Backend should be running on: http://localhost:5000

## ✅ Features

- **Dark Theme** - Premium aesthetic with teal/cyan accents
- **Connected to Backend** - All APIs integrated
- **Zustand State Management** - Cart & Auth
- **Framer Motion Animations** - Smooth transitions
- **Responsive Design** - Mobile-first
- **3D Product Viewer** - Three.js integration ready

## 📁 Project Structure

```
src/
├── components/     # Reusable components (Navbar, ProductCard)
├── pages/          # Page components (Home, Login, Products)
├── stores/         # Zustand stores (auth, cart)
├── utils/          # API utilities
└── main.jsx        # Entry point
```

## 🔌 Backend Connection

All API calls go through `src/utils/api.js` which connects to:
- Base URL: `http://localhost:5000/api`
- Auth endpoints: `/auth/login`, `/auth/register`
- Product endpoints: `/products`
- Cart endpoints: `/cart`

## 🎨 Design System

- **Primary Color**: #00D9C0 (Teal)
- **Secondary**: #7C3AED (Purple)
- **Background**: #0A0A0B (Deep Black)
- **Typography**: Inter font family

## 📦 Dependencies

- React 18
- Vite (build tool)
- Tailwind CSS
- Framer Motion
- Zustand
- Axios
- React Router
- React Three Fiber

## 🔧 Environment

Make sure your backend is running on port 5000 before starting the frontend.

## 🌐 Production Build

```bash
npm run build
```

Build output will be in `dist/` folder.

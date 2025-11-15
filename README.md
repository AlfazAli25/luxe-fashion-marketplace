# LUXE Fashion Marketplace - MERN Stack

A premium dark-themed fashion e-commerce platform with 3D effects, built with MongoDB, Express, React, and Node.js.

## 🎨 Features

### Dark Theme UI
- Premium aesthetic with teal/cyan accents
- Glassmorphism effects
- Smooth Framer Motion animations
- 3D product viewer (Three.js)
- Fully responsive design

### For Buyers
- Browse products with advanced filtering
- 3D product previews
- Shopping cart with animations
- Secure checkout
- Order tracking

### For Sellers
- Intuitive dashboard
- Product management
- Sales analytics
- Order fulfillment

## 🚀 Quick Start

**📖 See [QUICK_START.md](QUICK_START.md) for detailed setup instructions**

### Backend Setup

```bash
cd backend
npm install

# Create .env file
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key

npm run dev
```

Backend runs on: http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

## 📦 Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS (Dark Theme)
- Framer Motion
- Three.js / React Three Fiber
- Zustand (State Management)
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Multer (File Uploads)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Seller)
- `PUT /api/products/:id` - Update product (Seller)
- `DELETE /api/products/:id` - Delete product (Seller)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `DELETE /api/cart/remove/:itemId` - Remove from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get buyer orders
- `GET /api/orders/seller-orders` - Get seller orders

## 📁 Project Structure

```
Kryptonix_Project/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── utils/
│   └── package.json
└── README.md
```

## 🎨 Design System

- **Primary**: #00D9C0 (Teal)
- **Secondary**: #7C3AED (Purple)
- **Background**: #0A0A0B (Deep Black)
- **Typography**: Inter

## 🔒 Security

- JWT authentication
- Password hashing with bcrypt
- Protected routes
- CORS enabled

## 📱 Responsive

- Mobile-first design
- Tablet optimized
- Desktop enhanced

## 🚢 Deployment

### Quick Deploy

**Backend (Render/Railway):**
1. Connect GitHub repository
2. Set environment variables (see `.env.example`)
3. Deploy from `backend` folder
4. Run seed script: `npm run seed`

**Frontend (Vercel/Netlify):**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables (see `.env.example`)
5. Deploy

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions**

### Environment Variables

**Backend (.env):**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend-url.com/api
VITE_API_BASE_URL=https://your-backend-url.com
```

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

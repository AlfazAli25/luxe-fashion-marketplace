# Premium Dark Fashion Marketplace

A production-ready, dark-themed clothing marketplace with 3D effects, built for both buyers and sellers.

## 🎨 Design System

### Color Palette (Dark Theme - Default)

#### Premium Variant (Rich & Saturated)
```css
--bg-primary: #0A0A0B        /* Main background */
--bg-elevated: #141416       /* Cards, modals */
--bg-surface: #1C1C1F        /* Elevated surfaces */
--primary: #00D9C0           /* Teal accent */
--primary-hover: #00F5D4     /* Hover state */
--secondary: #7C3AED         /* Purple accent */
--accent: #F59E0B            /* Gold/amber */
--success: #10B981           /* Green */
--warning: #F59E0B           /* Amber */
--error: #EF4444             /* Red */
--text-primary: #F9FAFB      /* Main text - WCAG AA */
--text-secondary: #D1D5DB    /* Secondary text */
--text-muted: #9CA3AF        /* Muted text */
--border: #27272A            /* Borders */
--border-hover: #3F3F46      /* Hover borders */
```

#### Muted Variant (Soft & Subtle)
```css
--bg-primary: #18181B        /* Softer black */
--bg-elevated: #27272A       /* Lighter cards */
--primary: #14B8A6           /* Softer teal */
--accent: #D97706            /* Muted amber */
```

**Usage Rule**: Use Premium for hero sections, CTAs, and key interactions. Use Muted for content-heavy pages and dashboards.

### Typography
- **Headings**: Inter (700-900 weight)
- **Body**: Inter (400-600 weight)
- **Mono**: JetBrains Mono (code/numbers)

**Scale**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 40px, 48px, 64px

### Spacing Scale
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

### Border Radius
- Small: 8px
- Medium: 12px
- Large: 16px
- XL: 24px

### Shadows (Glassmorphism)
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4)
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5)
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6)
--shadow-glow: 0 0 24px rgba(0, 217, 192, 0.3)
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run Storybook
npm run storybook
```

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^10.16.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0",
  "three": "^0.158.0",
  "tailwindcss": "^3.3.0",
  "zustand": "^4.4.0",
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0"
}
```

## 🎭 Features

### Buyer Features
- ✅ Product discovery with 3D previews
- ✅ Advanced filtering & search
- ✅ Interactive product galleries
- ✅ Smooth cart animations
- ✅ Streamlined checkout
- ✅ Order tracking

### Seller Features
- ✅ Intuitive dashboard
- ✅ Drag & drop product uploads
- ✅ Inventory management
- ✅ Sales analytics
- ✅ Order fulfillment

### Technical Features
- ✅ Dark theme (default) with toggle
- ✅ Fully responsive (mobile-first)
- ✅ WCAG AA accessible
- ✅ Framer Motion animations
- ✅ 3D product previews (Three.js)
- ✅ Optimistic UI updates
- ✅ Skeleton loaders
- ✅ Infinite scroll
- ✅ Reduced motion support

## 🏗️ Architecture

### State Management (Zustand)
```javascript
// Cart, Auth, Theme stores
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
```

### Component Structure
```
components/
├── global/          # Navbar, Footer, Layout
├── buyer/           # Product cards, filters, cart
├── seller/          # Dashboard, forms, analytics
└── ui/              # Buttons, inputs, modals
```

## 🎨 Design Tokens

All design tokens are in `tailwind.config.js` and can be accessed via Tailwind classes or CSS variables.

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation (Tab, Enter, Esc)
- Focus visible states
- Screen reader support
- Color contrast WCAG AA compliant
- Reduced motion preference respected

## 🎬 Animations

All animations use Framer Motion and respect `prefers-reduced-motion`:

```javascript
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
```

## 📱 Responsive Breakpoints

```javascript
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

## 🔧 Performance Tips

1. **Images**: Use WebP format, lazy loading, and CDN (Cloudinary/Imgix)
2. **Code splitting**: Dynamic imports for routes
3. **Bundle size**: Tree-shaking, code splitting
4. **Caching**: Service workers, HTTP caching
5. **3D**: LOD (Level of Detail) for Three.js models

## 🔌 Recommended Integrations

- **Payment**: Stripe, PayPal
- **Auth**: Auth0, Clerk, Supabase
- **Images**: Cloudinary, Imgix
- **Analytics**: Mixpanel, PostHog
- **Search**: Algolia, Meilisearch
- **Email**: SendGrid, Resend

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📚 Storybook

```bash
npm run storybook
```

View components in isolation at `http://localhost:6006`

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT

## 🤝 Contributing

See CONTRIBUTING.md for guidelines.

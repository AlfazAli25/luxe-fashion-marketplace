const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const dummyProducts = [
  // NEW ARRIVALS
  {
    name: 'Premium Leather Jacket',
    description: 'Handcrafted premium leather jacket with modern fit and timeless style',
    price: 299,
    category: 'Men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Black', 'Brown', 'Navy'],
    stock: 50,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    badge: 'NEW',
    discount: 0
  },
  {
    name: 'Silk Shirt',
    description: 'Premium silk shirt with mother of pearl buttons',
    price: 159,
    originalPrice: 199,
    category: 'Women',
    size: ['S', 'M', 'L', 'XL'],
    color: ['White', 'Black', 'Ivory'],
    stock: 45,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
    badge: 'NEW',
    discount: 20
  },
  {
    name: 'Designer Sunglasses',
    description: 'Premium polarized sunglasses with UV protection',
    price: 249,
    category: 'Accessories',
    size: ['One Size'],
    color: ['Black', 'Tortoise'],
    stock: 35,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
    badge: 'NEW',
    discount: 0
  },
  {
    name: 'Knit Cardigan',
    description: 'Cozy knit cardigan with button closure',
    price: 119,
    category: 'Women',
    size: ['S', 'M', 'L'],
    color: ['Cream', 'Gray', 'Black'],
    stock: 50,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    badge: 'NEW',
    discount: 0
  },

  // TRENDING
  {
    name: 'Oversized Hoodie',
    description: 'Comfortable oversized fit hoodie with premium cotton blend',
    price: 79,
    category: 'Men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Black', 'Gray', 'White'],
    stock: 120,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    badge: 'TRENDING',
    discount: 0
  },
  {
    name: 'Cashmere Sweater',
    description: 'Luxurious 100% cashmere sweater with ribbed details',
    price: 199,
    category: 'Women',
    size: ['S', 'M', 'L'],
    color: ['Beige', 'Black', 'Navy'],
    stock: 40,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    badge: 'TRENDING',
    discount: 0
  },
  {
    name: 'Leather Sneakers',
    description: 'Minimalist leather sneakers with premium Italian leather',
    price: 179,
    category: 'Accessories',
    size: ['7', '8', '9', '10', '11', '12'],
    color: ['White', 'Black'],
    stock: 60,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
    badge: 'TRENDING',
    discount: 0
  },
  {
    name: 'Denim Jacket',
    description: 'Vintage-inspired denim with modern cut and premium wash',
    price: 129,
    category: 'Men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Blue', 'Black'],
    stock: 75,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800',
    badge: 'TRENDING',
    discount: 0
  },

  // SALE
  {
    name: 'Tailored Wool Coat',
    description: 'Classic tailored coat in premium wool blend for sophisticated style',
    price: 359,
    originalPrice: 449,
    category: 'Women',
    size: ['S', 'M', 'L'],
    color: ['Charcoal', 'Black', 'Camel'],
    stock: 30,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
    badge: 'SALE',
    discount: 20
  },
  {
    name: 'Blazer',
    description: 'Tailored blazer with modern fit and premium fabric',
    price: 263,
    originalPrice: 329,
    category: 'Men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Navy', 'Charcoal', 'Black'],
    stock: 40,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    badge: 'SALE',
    discount: 20
  },
  {
    name: 'Cotton Dress',
    description: 'Elegant cotton dress with flattering silhouette',
    price: 111,
    originalPrice: 139,
    category: 'Women',
    size: ['XS', 'S', 'M', 'L'],
    color: ['Black', 'Navy', 'Burgundy'],
    stock: 55,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    badge: 'SALE',
    discount: 20
  },
  {
    name: 'Wool Scarf',
    description: 'Soft merino wool scarf with classic pattern',
    price: 55,
    originalPrice: 69,
    category: 'Accessories',
    size: ['One Size'],
    color: ['Gray', 'Navy', 'Black'],
    stock: 90,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800',
    badge: 'SALE',
    discount: 20
  },

  // REGULAR PRODUCTS
  {
    name: 'Minimalist White Tee',
    description: 'Essential cotton tee with perfect drape and comfortable fit',
    price: 49,
    category: 'Men',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    color: ['White', 'Black', 'Gray'],
    stock: 100,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    discount: 0
  },
  {
    name: 'Slim Fit Chinos',
    description: 'Versatile chinos for any occasion with modern slim fit',
    price: 89,
    category: 'Men',
    size: ['28', '30', '32', '34', '36'],
    color: ['Khaki', 'Black', 'Navy'],
    stock: 80,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800',
    discount: 0
  },
  {
    name: 'Joggers',
    description: 'Comfortable joggers with tapered fit and elastic waist',
    price: 69,
    category: 'Men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Black', 'Gray', 'Navy'],
    stock: 95,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    discount: 0
  },
  {
    name: 'Jeans',
    description: 'Classic denim jeans with comfortable fit and durable fabric',
    price: 89,
    category: 'Men',
    size: ['28', '30', '32', '34', '36'],
    color: ['Blue', 'Black'],
    stock: 70,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    discount: 0
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let seller = await User.findOne({ role: 'seller' });
    
    if (!seller) {
      const hashedPassword = await bcrypt.hash('seller123', 10);
      seller = await User.create({
        name: 'Demo Seller',
        email: 'seller@demo.com',
        password: hashedPassword,
        role: 'seller'
      });
      console.log('Created demo seller (email: seller@demo.com, password: seller123)');
    }

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const productsWithSeller = dummyProducts.map(product => ({
      ...product,
      seller: seller._id
    }));

    await Product.insertMany(productsWithSeller);
    console.log(`✅ Successfully added ${dummyProducts.length} products!`);
    console.log('📦 Sections: NEW (4), TRENDING (4), SALE (4), REGULAR (4)');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

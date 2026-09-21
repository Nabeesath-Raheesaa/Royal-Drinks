import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Royal Cola',
    slug: 'royal-cola',
    description: 'Experience the crown jewel of dark sodas. Royal Cola is meticulously crafted with real kola nut extract, organic cane sugar, and a proprietary blend of 12 exotic botanical spices including cinnamon bark and Madagascar vanilla.',
    shortDescription: 'Signature artisanal cola infused with exotic botanicals and Madagascar vanilla.',
    price: 120,
    category: 'Cola',
    size: '330ml Glass Bottle',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 120,
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    ingredients: ['Carbonated Alpine Spring Water', 'Pure Cane Sugar', 'Kola Nut Extract', 'Natural Spices', 'Caramel Color', 'Citric Acid'],
    nutritionalFacts: {
      calories: '140 kcal',
      sugar: '32g',
      caffeine: '34mg',
      sodium: '15mg',
      carbs: '35g'
    }
  },
  {
    name: 'Royal Orange',
    slug: 'royal-orange',
    description: 'Sun-kissed Valencia oranges harvested at peak ripeness, combined with subtle orange blossom essence and vibrant sparkling spring water. A velvety citrus indulgence for true connoisseurs.',
    shortDescription: 'Lush Valencia orange elixir delicately floral and effervescent.',
    price: 110,
    category: 'Orange',
    size: '330ml Glass Bottle',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 85,
    rating: 4.8,
    reviewsCount: 26,
    featured: true,
    ingredients: ['Carbonated Spring Water', 'Valencia Orange Juice (15%)', 'Orange Blossom Extract', 'Pure Cane Sugar', 'Natural Citric Acid'],
    nutritionalFacts: {
      calories: '130 kcal',
      sugar: '29g',
      caffeine: '0mg',
      sodium: '10mg',
      carbs: '32g'
    }
  },
  {
    name: 'Royal Lemon',
    slug: 'royal-lemon',
    description: 'Distilled from cold-pressed Sicilian lemons, Royal Lemon delivers an exhilarating burst of zesty lemon peel and crisp, thirst-quenching minerality balanced with raw mountain honey.',
    shortDescription: 'Crisp Sicilian lemon spritz with mountain honey undertones.',
    price: 99,
    category: 'Lemon',
    size: '330ml Glass Bottle',
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 90,
    rating: 4.7,
    reviewsCount: 19,
    featured: true,
    ingredients: ['Carbonated Water', 'Sicilian Lemon Juice', 'Lemon Zest Essence', 'Raw Wildflower Honey', 'Cane Sugar'],
    nutritionalFacts: {
      calories: '115 kcal',
      sugar: '26g',
      caffeine: '0mg',
      sodium: '12mg',
      carbs: '28g'
    }
  },
  {
    name: 'Royal Berry',
    slug: 'royal-berry',
    description: 'A dark, dramatic fusion of wild blackberries, tayberries, and elderflowers. Finished with micro-fine champagne carbonation that caresses the palate with deep fruity complexity.',
    shortDescription: 'Velvety blackberry & elderflower brew with micro-fine bubbles.',
    price: 135,
    category: 'Berry',
    size: '330ml Glass Bottle',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 60,
    rating: 4.95,
    reviewsCount: 42,
    featured: true,
    ingredients: ['Blackberry Extract', 'Elderflower Infusion', 'Carbonated Mineral Water', 'Cane Sugar', 'Natural Tartaric Acid'],
    nutritionalFacts: {
      calories: '125 kcal',
      sugar: '28g',
      caffeine: '0mg',
      sodium: '8mg',
      carbs: '30g'
    }
  },
  {
    name: 'Royal Citrus',
    slug: 'royal-citrus',
    description: 'An uplifting cocktail of ruby red grapefruit, Key lime, and kaffir lime leaves. Delivers a sophisticated sweet-tart equilibrium that refreshes every senses.',
    shortDescription: 'Ruby grapefruit & Key lime nectar with subtle botanicals.',
    price: 115,
    category: 'Citrus',
    size: '330ml Glass Bottle',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 75,
    rating: 4.6,
    reviewsCount: 14,
    featured: false,
    ingredients: ['Carbonated Water', 'Ruby Grapefruit Juice', 'Key Lime Essence', 'Kaffir Lime Leaf Extract', 'Cane Sugar'],
    nutritionalFacts: {
      calories: '120 kcal',
      sugar: '27g',
      caffeine: '0mg',
      sodium: '10mg',
      carbs: '29g'
    }
  },
  {
    name: 'Royal Energy',
    slug: 'royal-energy',
    description: 'Elevate your performance naturally. Engineered with organic green tea extract, Amazonian guarana berry, panax ginseng, and natural B-complex vitamins for smooth, clean focus without jitter.',
    shortDescription: 'Clean botanical stamina elixir with green tea & organic guarana.',
    price: 150,
    category: 'Energy',
    size: '355ml Sleek Can',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 100,
    rating: 4.85,
    reviewsCount: 31,
    featured: true,
    ingredients: ['Carbonated Alpine Water', 'Organic Guarana Extract', 'Green Tea Caffeine', 'Panax Ginseng', 'Vitamin B3, B6, B12', 'Agave Nectar'],
    nutritionalFacts: {
      calories: '90 kcal',
      sugar: '18g',
      caffeine: '120mg',
      sodium: '25mg',
      carbs: '20g'
    }
  },
  {
    name: 'Royal Sparkling',
    slug: 'royal-sparkling',
    description: 'Pure untouched mountain spring water infused with delicate white peach nectar and subtle hints of elderberry flower. Crisp, elegant, and perfectly balanced for fine dining.',
    shortDescription: 'Effervescent alpine spring water with white peach nectar.',
    price: 105,
    category: 'Sparkling',
    size: '500ml Glass Bottle',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 110,
    rating: 4.75,
    reviewsCount: 22,
    featured: false,
    ingredients: ['Alpine Mineral Spring Water', 'White Peach Essence', 'Natural Minerals', 'Light Carbonation'],
    nutritionalFacts: {
      calories: '45 kcal',
      sugar: '9g',
      caffeine: '0mg',
      sodium: '5mg',
      carbs: '10g'
    }
  },
  {
    name: 'Royal Vintage Velvet',
    slug: 'royal-vintage-velvet',
    description: 'Limited Reserve Edition. Oak-aged black cherry reduction blended with smoked Madagascar bourbon vanilla and rare cacao bean bitters. Bottled in small artisanal batches.',
    shortDescription: 'Limited Reserve oak-aged black cherry & Madagascar vanilla brew.',
    price: 180,
    category: 'Berry',
    size: '330ml Gold Foil Bottle',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 40,
    rating: 5.0,
    reviewsCount: 50,
    featured: true,
    ingredients: ['Oak-Aged Black Cherry Reduction', 'Madagascar Bourbon Vanilla', 'Artisanal Cacao Bitters', 'Sparkling Mineral Water', 'Demerara Sugar'],
    nutritionalFacts: {
      calories: '155 kcal',
      sugar: '34g',
      caffeine: '0mg',
      sodium: '10mg',
      carbs: '37g'
    }
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/royal_drinks';
    await mongoose.connect(mongoUri);
    console.log('🌱 Connected to MongoDB for database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    console.log('🧹 Existing collections cleared.');

    // Seed Admin & Demo Customer
    const adminUser = await User.create({
      name: 'Royal Admin',
      email: 'admin@royaldrinks.com',
      password: 'admin123',
      role: 'admin',
    });

    const customerUser = await User.create({
      name: 'Lord Arthur Sterling',
      email: 'customer@royaldrinks.com',
      password: 'user123',
      role: 'user',
    });

    console.log(`👤 Accounts created:\n  - Admin: admin@royaldrinks.com (password: admin123)\n  - Customer: customer@royaldrinks.com (password: user123)`);

    // Seed Products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`🍾 Created ${createdProducts.length} sample Royal Drinks products.`);

    // Seed a sample order for demonstration
    await Order.create({
      user: customerUser._id,
      items: [
        {
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          image: createdProducts[0].image,
          price: createdProducts[0].price,
          quantity: 2,
          size: createdProducts[0].size,
        },
        {
          product: createdProducts[1]._id,
          name: createdProducts[1].name,
          image: createdProducts[1].image,
          price: createdProducts[1].price,
          quantity: 1,
          size: createdProducts[1].size,
        }
      ],
      shippingAddress: {
        fullName: 'Lord Arthur Sterling',
        email: 'customer@royaldrinks.com',
        phone: '+1 (555) 987-6543',
        address: '742 Kensington Palace Gardens',
        city: 'London',
        state: 'Greater London',
        pinCode: 'W8 4QP',
      },
      subtotal: 350,
      deliveryFee: 0,
      totalAmount: 350,
      paymentMethod: 'Royal Pay Privilege Card',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
    });

    console.log('📦 Sample order created successfully!');
    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();

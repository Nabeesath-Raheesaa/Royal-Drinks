import Product from '../models/Product.js';

// @desc    Get all products with filtering, search, sorting & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;

    const query = {};

    // Search keyword
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { shortDescription: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Category filter
    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }

    // Featured filter
    if (req.query.featured === 'true') {
      query.featured = true;
    }

    // Sorting
    let sortOptions = {};
    if (req.query.sort === 'price-low') {
      sortOptions = { price: 1 };
    } else if (req.query.sort === 'price-high') {
      sortOptions = { price: -1 };
    } else if (req.query.sort === 'rating') {
      sortOptions = { rating: -1 };
    } else {
      sortOptions = { createdAt: -1 }; // newest
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const featuredProducts = await Product.find({ featured: true }).limit(6);
    res.json(featuredProducts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by ID or Slug
// @route   GET /api/products/:identifier
// @access  Public
export const getProductByIdOrSlug = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    let product;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(identifier);
    } else {
      product = await Product.findOne({ slug: identifier.toLowerCase() });
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      shortDescription,
      category,
      size,
      image,
      images,
      stock,
      featured,
      ingredients,
      nutritionalFacts,
    } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      res.status(400);
      throw new Error('A product with a similar name already exists');
    }

    const product = new Product({
      name,
      slug,
      price: Number(price),
      description,
      shortDescription: shortDescription || description.slice(0, 100),
      category,
      size: size || '330ml',
      image,
      images: images || [image],
      stock: stock ? Number(stock) : 50,
      featured: featured || false,
      ingredients: ingredients || ['Carbonated Water', 'Natural Extracts', 'Cane Sugar'],
      nutritionalFacts: nutritionalFacts || { calories: '140 kcal', sugar: '32g', caffeine: '0mg', sodium: '15mg', carbs: '35g' },
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      if (req.body.name) {
        product.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
      product.description = req.body.description || product.description;
      product.shortDescription = req.body.shortDescription || product.shortDescription;
      product.category = req.body.category || product.category;
      product.size = req.body.size || product.size;
      product.image = req.body.image || product.image;
      if (req.body.images) product.images = req.body.images;
      product.stock = req.body.stock !== undefined ? Number(req.body.stock) : product.stock;
      if (req.body.featured !== undefined) product.featured = req.body.featured;
      if (req.body.ingredients) product.ingredients = req.body.ingredients;
      if (req.body.nutritionalFacts) product.nutritionalFacts = req.body.nutritionalFacts;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product successfully removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('You have already submitted a review for this drink');
      }

      const review = {
        user: req.user._id,
        userName: req.user.name,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);
      product.reviewsCount = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review submitted successfully' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

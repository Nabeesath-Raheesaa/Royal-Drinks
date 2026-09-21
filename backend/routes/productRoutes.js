import express from 'express';
import {
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);

router.route('/:identifier')
  .get(getProductByIdOrSlug);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.post('/:id/reviews', protect, createProductReview);

export default router;

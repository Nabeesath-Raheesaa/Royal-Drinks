import express from 'express';
import {
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getAdminStats,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, admin, getUsers);
router.get('/admin/stats', protect, admin, getAdminStats);

router.route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

router.put('/:id/role', protect, admin, updateUserRole);

export default router;

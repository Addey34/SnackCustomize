import { Router } from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
} from '../controllers/categoryController.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router: Router = Router();

// GET all categories (public)
router.get('/', getAllCategoriesController);

// GET category by ID (public)
router.get('/:id', getCategoryByIdController);

// POST create category (admin)
router.post('/', verifyToken, isAdmin, createCategoryController);

// PUT update category (admin)
router.put('/:id', verifyToken, isAdmin, updateCategoryController);

// DELETE category (admin)
router.delete('/:id', verifyToken, isAdmin, deleteCategoryController);

export default router;

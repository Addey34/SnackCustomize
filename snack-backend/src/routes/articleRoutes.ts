import { Router } from 'express';
import {
  createArticleController,
  deleteArticleController,
  getAllArticlesController,
  getArticleByIdController,
  updateArticleController,
} from '../controllers/articleController.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router: Router = Router();

// GET all articles (public)
router.get('/', getAllArticlesController);

// GET article by ID (public)
router.get('/:id', getArticleByIdController);

// POST create article (admin)
router.post('/', verifyToken, isAdmin, createArticleController);

// PUT update article (admin)
router.put('/:id', verifyToken, isAdmin, updateArticleController);

// DELETE article (admin)
router.delete('/:id', verifyToken, isAdmin, deleteArticleController);

export default router;

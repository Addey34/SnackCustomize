import { Router } from 'express';
import {
  getAllUsersController,
  getUserController,
  updateUserController,
} from '../controllers/userController.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router: Router = Router();

// GET all users (admin)
router.get('/', verifyToken, isAdmin, getAllUsersController);

// GET current user profile
router.get('/:id', verifyToken, getUserController);

// PUT update current user profile
router.put('/:id', verifyToken, updateUserController);

export default router;

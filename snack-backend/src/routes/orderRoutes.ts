import { Router } from 'express';
import {
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrdersController,
  updateOrderController,
} from '../controllers/orderController.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router: Router = Router();

// GET all orders (admin)
router.get('/', verifyToken, isAdmin, getAllOrdersController);

// GET orders (user)
router.get('/:id', verifyToken, getOrdersController);

// CREATE order (user)
router.post('/', verifyToken, createOrderController);

// UPDATE order (admin)
router.put('/:id', verifyToken, isAdmin, updateOrderController);

// DELETE order (admin)
router.delete('/:id', verifyToken, isAdmin, deleteOrderController);

export default router;

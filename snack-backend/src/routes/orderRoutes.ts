import { Router, type Request, type Response } from 'express';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';
import {
  createOrderSchema,
  updateOrderSchema,
} from '../validation/orderSchema.js';

const router: Router = Router();

// GET all orders (admin)
router.get('/', verifyToken, isAdmin, async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('client', 'name email')
      .populate('items.article');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching orders', error: err });
  }
});

// GET orders (user)
router.get('/me', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await Order.find({ client: userId }).populate(
      'items.article',
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching your orders', error: err });
  }
});

// CREATE order (user)
router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ msg: 'Données invalides', errors: parsed.error.issues });
    }
    const order = await Order.create({
      ...parsed.data,
      client: (req as any).user.id,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Error création de la commande', error: err });
  }
});

// UPDATE order (admin)
router.put(
  '/:id',
  verifyToken,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const parsed = updateOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res
          .status(400)
          .json({ msg: 'Données invalides', errors: parsed.error.issues });
      }
      const order = await Order.findByIdAndUpdate(req.params.id, parsed.data, {
        new: true,
      });
      res.json(order);
    } catch (err) {
      res.status(500).json({ msg: 'Error updating order', error: err });
    }
  },
);

// DELETE order (admin)
router.delete(
  '/:id',
  verifyToken,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Deleted' });
    } catch (err) {
      res.status(500).json({ msg: 'Error deleting order', error: err });
    }
  },
);

export default router;

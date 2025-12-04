import type { Request, Response } from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getUserOrders,
  updateOrder,
} from '../services/orderService.js';
import { createOrderSchema } from '../validation/orderSchema.js';

// Créer une commande
export const createOrderController = async (req: Request, res: Response) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ msg: 'Invalid data', errors: parsed.error.issues });
    }
    const order = await createOrder(parsed.data);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating order', error: err });
  }
};

// Récupérer toutes les commandes
export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching orders', error: err });
  }
};

// Récupérer les commandes d'un utilisateur
export const getOrdersController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ msg: 'Missing user ID' });
  }
  try {
    const orders = await getUserOrders(id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching user orders', error: err });
  }
};

// Mettre à jour une commande
export const updateOrderController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ msg: 'Missing order ID' });
  }
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ msg: 'Invalid data', errors: parsed.error.issues });
    }
    const order = await updateOrder(id, parsed.data);
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating order', error: err });
  }
};

// Supprimer une commande
export const deleteOrderController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ msg: 'Missing order ID' });
  }
  try {
    const response = await deleteOrder(id);
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting order', error: err });
  }
};

import Order from '../models/Order.js';
import type {
  CreateOrderData,
  UpdateOrderData,
} from '../validation/orderSchema.js';

export const createOrder = async (data: CreateOrderData) => {
  try {
    const order = await Order.create(data);
    return order;
  } catch (err) {
    console.error('Error creating order', err);
    throw new Error('Error creating order');
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await Order.find()
      .populate('client')
      .populate('items.article');
    return orders;
  } catch (err) {
    console.error('Error fetching orders', err);
    throw new Error('Error fetching orders');
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const orders = await Order.find({ client: userId }).populate(
      'items.article',
    );
    return orders;
  } catch (err) {
    console.error('Error fetching user orders', err);
    throw new Error('Error fetching user orders');
  }
};

export const updateOrder = async (id: string, data: UpdateOrderData) => {
  try {
    const order = await Order.findByIdAndUpdate(id, data, { new: true });
    return order;
  } catch (err) {
    console.error('Error updating order', err);
    throw new Error('Error updating order');
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      throw new Error('Order not found');
    }
  } catch (err) {
    console.error('Error deleting order', err);
    throw new Error('Error deleting order');
  }
};

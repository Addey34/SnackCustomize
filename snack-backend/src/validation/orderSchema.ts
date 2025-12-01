import { z } from 'zod';

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

export const orderItemSchema = z.object({
  article: objectIdSchema,
  quantity: z.number().min(1, 'La quantité doit être au moins 1'),
});

export const createOrderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .nonempty('La commande doit contenir au moins un article'),
  total: z.number().min(0, 'Le total doit être positif'),
});

export const updateOrderSchema = z.object({
  items: z.array(orderItemSchema).optional(),
  total: z.number().min(0).optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

export type OrderItemData = z.infer<typeof orderItemSchema>;
export type CreateOrderData = z.infer<typeof createOrderSchema>;
export type UpdateOrderData = z.infer<typeof updateOrderSchema>;

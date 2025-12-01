import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .optional(),
  email: z.string().email('Email invalide').optional(),
  password: z.string().min(6, 'Mot de passe trop court').optional(),
  role: z.enum(['admin', 'client']).optional(),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;

import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom de la catégorie doit contenir au moins 2 caractères'),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom de la catégorie doit contenir au moins 2 caractères')
    .optional(),
});

export type CreateCategoryData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;

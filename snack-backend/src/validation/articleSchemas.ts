import { z } from 'zod';

// Schema pour valider les ObjectId de MongoDB
const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

// Schéma pour valider les données d'un article
export const articleSchema = z
  .object({
    name: z.string().min(1, 'Le nom est requis'),
    price: z.number().positive('Le prix doit être positif'),
    category: objectIdSchema,
    description: z.string().optional(),
    image: z.string().optional(),
    promo: z
      .number()
      .min(0, 'Promo minimale 10')
      .max(100, 'Promo maximale 70')
      .optional(),
  })
  .strict();

// TypeScript type inferred from the article schema
export type ArticleData = z.infer<typeof articleSchema>;

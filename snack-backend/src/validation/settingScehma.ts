import { z } from 'zod';

// Schéma de validation pour les settings
export const settingSchema = z.object({
  title: z.string().optional(),
  logo: z.string().optional(),
  colorTheme: z.string().optional(),
});

// Type TypeScript des données validées
export type SettingData = z.infer<typeof settingSchema>;

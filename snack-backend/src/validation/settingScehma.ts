import { z } from 'zod';

export const settingsSchema = z.object({
  themeColor: z.string().optional(),
  logoUrl: z.string().url('L’URL du logo doit être valide').optional(),
});

export type SettingsData = z.infer<typeof settingsSchema>;

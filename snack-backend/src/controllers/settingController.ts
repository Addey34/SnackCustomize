import type { Request, Response } from 'express';
import {
  createDefaultSettings,
  getSettings,
  updateSettings,
} from '../services/settingService.js';
import { settingSchema } from '../validation/settingScehma.js';

// Récupérer les paramètres de l'application
export const getSettingsController = async (req: Request, res: Response) => {
  try {
    const settings = await getSettings();
    return res.json(settings);
  } catch (err) {
    return res.status(500).json({ msg: 'Erreur serveur', error: err });
  }
};

// Créer les paramètres par défaut de l'application
export const createDefaultSettingsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const settings = await createDefaultSettings();
    return res.json(settings);
  } catch (err) {
    return res.status(500).json({ msg: 'Erreur serveur', error: err });
  }
};

// Mettre à jour les paramètres de l'application
export const updateSettingsController = async (req: Request, res: Response) => {
  try {
    const validatedData = settingSchema.parse(req.body);
    const updatedSettings = await updateSettings(validatedData);
    return res.json(updatedSettings);
  } catch (err) {
    return res.status(400).json({ msg: 'Erreur serveur', error: err });
  }
};

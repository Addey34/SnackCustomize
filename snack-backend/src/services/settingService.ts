import Setting from '../models/Setting.js';
import type { SettingData } from '../validation/settingScehma.js';

export const createDefaultSettings = async () => {
  try {
    const existingSettings = await Setting.findOne();
    if (!existingSettings) {
      const defaultSettings = new Setting();
      await defaultSettings.save();
      return defaultSettings;
    }
    return existingSettings;
  } catch (error) {
    throw new Error('Impossible de créer les paramètres par défaut.');
  }
};

export const getSettings = async () => {
  try {
    const settings = await Setting.findOne();
    return settings;
  } catch (error) {
    throw new Error('Impossible de récupérer les paramètres.');
  }
};

// Fonction pour mettre à jour les settings
export const updateSettings = async (data: SettingData) => {
  try {
    const settings = await Setting.findOne();
    if (!settings) {
      throw new Error('Settings non trouvés.');
    }

    // Mise à jour des paramètres
    if (data.title) settings.title = data.title;
    if (data.logo) settings.logo = data.logo;
    if (data.colorTheme) settings.colorTheme = data.colorTheme;

    await settings.save();
    return settings;
  } catch (error) {
    throw new Error('Impossible de mettre à jour les paramètres.');
  }
};

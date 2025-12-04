import React, { useEffect, useState } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { createSettingsApi, getSettingsApi, updateSettingsApi } from '../services/settingsService';

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState({
    title: '',
    logo: '',
    colorTheme: '',
  });

  const updateSettings = async (newSettings: { title?: string; logo?: string; colorTheme?: string }) => {
    try {
      const updatedSettings = await updateSettingsApi(newSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres du site', error);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettingsApi();
        if (!response) {
          createSettingsApi();
        } else {
          setSettings(response);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des paramètres du site', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};


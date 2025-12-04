import { createContext } from 'react';

export interface SettingsContextType {
  title: string;
  logo: string;
  colorTheme: string;
  updateSettings: (newSettings: { title: string, logo: string, colorTheme: string }) => void;
}

export const SettingsContext = createContext<SettingsContextType>( {
  title: '',
  logo: '',
  colorTheme: '',
  updateSettings: () => {},
});



import api from '../api/api';

export const createSettingsApi = async () => {
  const res = await api.post('/settings');
  return res.data;
}
export const getSettingsApi = async () => {
  const res = await api.get('/settings');
  return res.data;
}

export const updateSettingsApi = async (newSettings: { title?: string; logo?: string; colorTheme?: string }) => {
  const res = await api.put('/settings', newSettings);
  return res.data;
};

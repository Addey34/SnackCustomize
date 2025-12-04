import api from '../api/api';

export const getUserApi = async (userId: string) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

export const updateUserApi = async (userId: string, field: string, value: string) => {
  const res = await api.put(`/users/${userId}`, { [field]: value });
  return res.data;
}
import api from '../api/api';

export const loginApi = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', res.data.token);
  return res.data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
};

export const getCurrentUserApi = async () => {
  const res = await api.get('/users/me');
  return res.data;
};

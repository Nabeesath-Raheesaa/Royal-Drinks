import API from './api.js';

export const authService = {
  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await API.post('/auth/register', { name, email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await API.put('/auth/me', userData);
    return response.data;
  },
};

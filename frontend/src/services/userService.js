import API from './api.js';

export const userService = {
  getUsers: async () => {
    const response = await API.get('/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await API.get(`/users/${id}`);
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await API.put(`/users/${id}/role`, { role });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  },

  getAdminStats: async () => {
    const response = await API.get('/users/admin/stats');
    return response.data;
  },
};

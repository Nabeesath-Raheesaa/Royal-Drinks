import API from './api.js';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await API.post('/orders', orderData);
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await API.get(`/orders/${id}`);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await API.get('/orders/user/myorders');
    return response.data;
  },

  getAllOrders: async () => {
    const response = await API.get('/orders');
    return response.data;
  },

  updateOrderStatus: async (id, statusData) => {
    const response = await API.put(`/orders/${id}/status`, statusData);
    return response.data;
  },
};

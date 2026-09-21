import API from './api.js';

export const productService = {
  getProducts: async (params = {}) => {
    const response = await API.get('/products', { params });
    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await API.get('/products/featured');
    return response.data;
  },

  getProductByIdOrSlug: async (identifier) => {
    const response = await API.get(`/products/${identifier}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await API.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await API.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await API.delete(`/products/${id}`);
    return response.data;
  },

  addReview: async (productId, reviewData) => {
    const response = await API.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  },
};

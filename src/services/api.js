import axios from 'axios';

const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000'
  : 'https://virtual-tryon-backend-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes
});

export const virtualTryOnService = {
  async processImage(userImage, clothingImage, category, selectedApi = 'idm-vton') {
    const formData = new FormData();
    formData.append('userImage', userImage);
    formData.append('clothingImage', clothingImage);
    formData.append('category', category);
    formData.append('selectedApi', selectedApi); // 👈 Multi-API support added

    try {
      const response = await api.post('/api/process-image', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || error.message);
    }
  },

  async checkHealth() {
    const response = await api.get('/api/health');
    return response.data;
  }
};

export default api;
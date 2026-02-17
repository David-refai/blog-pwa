import axios from 'axios';
import { toast } from '../utils/toast.js';
import { mockData } from './mocks.js';

const getIsProduction = () => import.meta.env.PROD || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');
const getApiUrl = () => getIsProduction() ? '' : 'http://localhost:3000';

const handle = async (promise) => {
  const isProduction = getIsProduction();
  try {
    const res = await promise;
    return res.data;
  } catch (err) {
    if (isProduction) {
      console.warn('Production mode: API call failed, falling back to mock data where applicable.');
    }
    console.error(err);
    toast.show(err.response?.data?.message || err.message || 'API Error', 'error');
    throw err;
  }
};

export const api = {
  get: async (url) => {
    if (getIsProduction()) {
      // Simple mock router for demo purposes on GitHub Pages
      if (url.startsWith('/users')) {
        const email = new URLSearchParams(url.split('?')[1]).get('email');
        if (email) return mockData.users.filter(u => u.email === email);
        return mockData.users;
      }
      if (url.startsWith('/products')) return mockData.products;
    }
    return handle(axios.get(`${getApiUrl()}${url}`));
  },
  post: async (url, data) => {
    if (getIsProduction()) {
      toast.show('Read-only mode: Data would be saved in a real environment', 'success');
      return data;
    }
    return handle(axios.post(`${getApiUrl()}${url}`, data));
  },
  put: async (url, data) => {
    if (getIsProduction()) {
      toast.show('Read-only mode: Data would be updated in a real environment', 'success');
      return data;
    }
    return handle(axios.put(`${getApiUrl()}${url}`, data));
  },
  delete: async (url) => {
    if (getIsProduction()) {
      toast.show('Read-only mode: Data would be deleted in a real environment', 'success');
      return { success: true };
    }
    return handle(axios.delete(`${getApiUrl()}${url}`));
  }
};

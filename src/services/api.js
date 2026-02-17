import axios from 'axios';
import { toast } from '../utils/toast.js';

const getApiUrl = () => 'http://localhost:3000';

const handle = async (promise) => {
  try {
    const res = await promise;
    return res.data;
  } catch (err) {
    console.error(err);
    toast.show(err.response?.data?.message || err.message || 'API Error', 'error');
    throw err;
  }
};

export const api = {
  get: async (url) => handle(axios.get(`${getApiUrl()}${url}`)),
  post: async (url, data) => handle(axios.post(`${getApiUrl()}${url}`, data)),
  put: async (url, data) => handle(axios.put(`${getApiUrl()}${url}`, data)),
  delete: async (url) => handle(axios.delete(`${getApiUrl()}${url}`))
};

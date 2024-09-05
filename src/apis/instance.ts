import axios from 'axios';

export const templateInstance = axios.create({
  baseURL: '/pool',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

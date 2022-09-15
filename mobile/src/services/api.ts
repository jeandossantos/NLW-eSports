import axios from 'axios';

const baseURL = 'http://192.168.56.1:3001';

export const api = axios.create({
  baseURL,
});

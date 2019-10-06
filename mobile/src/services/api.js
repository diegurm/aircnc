import axios  from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.112.1:3333'
})

export default api;

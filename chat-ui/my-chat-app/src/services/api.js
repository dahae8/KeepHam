import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your actual server URL
});

export default api;

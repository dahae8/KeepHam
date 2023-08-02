// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 서버의 API 주소로 변경해주세요
});

// 토큰이 있을 경우, 요청 헤더에 토큰을 추가하는 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

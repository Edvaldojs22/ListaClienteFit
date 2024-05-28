import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

const api = axios.create({
  baseURL: "http://paixaodecristorsa.site:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para adicionar o token JWT em todos os pedidos
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function isTokenExpired(token) {
  if (!token) {
    return true;
  }

  const decoded = VueJwtDecode.decode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp < currentTime;
}

export default api;

import axios from "axios";
import { logout } from "@utils/auth";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       logout();
//       window.location.href = "/login";
//       toast.error("Sessão expirada. Faça login novamente.", {
//         autoClose: false,
//       });
//     }
//     return Promise.reject(error);
//   },
// );

export default api;

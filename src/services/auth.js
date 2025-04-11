import api from "./api";
import { toast } from "react-toastify";

export const authApiServices = {
  register: async ({ email, password, nickname }) => {
    const response = await api.post(`/auth/register`, {
      email,
      password,
      nickname,
    });
    return response.data;
  },
  login: async ({ email, password }) => {
    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  },

  logout: async () => {
    const response = await api.post(`auth/logout`);
    return response.data;
  },

  forgotPassword: async ({ email }) => {
    try {
      const response = await api.post(`/auth/forgot-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  },

  resetPassword: async (token, data) => {
    try {
      const encodedToken = encodeURIComponent(token);
      const response = await api.post(`/auth/reset-password/${encodedToken}`, {
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error || "Erro ao resetar senha");
      throw error;
    }
  },
};

import api from "./api";
import { toast } from "react-toastify";

export const authApiServices = {
  register: async ({ email, password, nickname }, clearForm) => {
    try {
      const response = await api.post(`/auth/register`, {
        email,
        password,
        nickname,
      });
      toast.success("Conta criada com sucesso!");
      clearForm();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  },

  login: async (email, password) => {
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });
    const token = response.data.acess_token;
    localStorage.setItem("token", token);
    return response.data;
  },

  logout: async () => {
    const response = await api.post(`auth/logout`);
    return response.data;
  },
};

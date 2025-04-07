import api from "./api";

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
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.post(`auth/logout`);
    return response.data;
  },
};

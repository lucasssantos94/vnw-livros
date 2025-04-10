import api from "./api";

export const userApiServices = {
  getDonateBooks: async (userId) => {
    try {
      const response = await api.get(`users/${userId}/books`);
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar livros:", error);
      throw error;
    }
  },
  updateProfile: async (data) => {
    try {
      const response = await api.put(`users/update`, data);
      return response.data;
    } catch (error) {
      console.log("Erro ao atualizar perfil:", error);
      throw error;
    }
  },
  changePassword: async (data) => {
    try {
      const response = await api.put(`users/password`, data);
      return response.data;
    } catch (error) {
      console.log("Erro ao atualizar senha:", error);
      throw error;
    }
  },
};

export default userApiServices;

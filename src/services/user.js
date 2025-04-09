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
};

export default userApiServices;

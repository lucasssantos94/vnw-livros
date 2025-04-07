import api from "./api";

const baseUrlApi = import.meta.env.VITE_API_URL;

const booksApiServices = {
  donate: async (data) => {
    try {
      const response = await api.post(`${baseUrlApi}/books/`, data);
      return response.data;
    } catch (error) {
      console.log("Erro ao cadastrar livro:", error);
      throw error;
    }
  },
};

export default booksApiServices;

import api from "./api";

const baseUrlApi = import.meta.env.VITE_API_URL;

const booksApiServices = {
  getAll: async () => {
    try {
      const response = await api.get(`${baseUrlApi}/books`);
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar livros:", error);
      throw error;
    }
  },
  searchBook: async (title) => {
    try {
      const response = await api.get(`${baseUrlApi}/books/${title}`);
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar livro:", error);
      throw error;
    }
  },

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

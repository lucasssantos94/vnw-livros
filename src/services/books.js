import api from "./api";

const booksApiServices = {
  getAll: async () => {
    try {
      const response = await api.get(`books/`);
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar livros:", error);
      throw error;
    }
  },
  searchBook: async (title) => {
    try {
      const response = await api.get(`books/${title}`);
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar livro:", error);
      throw error;
    }
  },

  donate: async (data) => {
    try {
      const response = await api.post(`books/`, data);
      return response.data;
    } catch (error) {
      console.log("Erro ao cadastrar livro:", error);
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await api.delete(`books/${id}`);
      return response.data;
    } catch (error) {
      console.log("Erro ao deletar livro:", error);
      throw error;
    }
  },
};

export default booksApiServices;

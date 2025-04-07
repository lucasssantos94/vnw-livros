import api from "./api";

const baseUrlApi = import.meta.env.VITE_API_URL;

export const adminApiServices = {
  getUsers: async () => {
    try {
      const response = await api.get(`${baseUrlApi}/admin/users`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getBooks: async () => {
    try {
      const response = await api.get(`${baseUrlApi}/admin/books`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

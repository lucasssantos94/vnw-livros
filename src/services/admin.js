import api from "./api";

export const adminApiServices = {
  getUsers: async () => {
    try {
      const response = await api.get(`admin/users`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getBooks: async () => {
    try {
      const response = await api.get(`admin/books`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

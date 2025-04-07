import axios from "axios";

const baseUrlApi = import.meta.env.VITE_API_URL;

export const bookApiServices = {
  getAll: async () => {
    const response = await axios.get(`${baseUrlApi}/books`);
    return response.data;
  },
  donateBook: async (bookData) => {
    const response = await axios.post(`${baseUrlApi}/books`, bookData);
    return response.data;
  },
  searchBook: async (title) => {
    const response = await axios.get(`${baseUrlApi}/books/${title}`);
    return response.data;
  },
};

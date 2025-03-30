import axios from "axios";

const baseUrlApi = import.meta.env.VITE_API_URL;

export const bookApiServices = {
  getAll: async () => {
    const response = await axios.get(`${baseUrlApi}/livros`);
    return response.data;
  },
  donateBook: async (bookData) => {
    const response = await axios.post(`${baseUrlApi}/doar`, bookData);
    return response.data;
  },
};

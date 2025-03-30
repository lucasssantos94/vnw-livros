import axios from "axios";

const baseUrlApi = import.meta.env.VITE_API_URL;

export const bookApiServices = {
  getAll: async () => {
    const response = await axios.get(`${baseUrlApi}/livros`);
    return response.data;
  },
};

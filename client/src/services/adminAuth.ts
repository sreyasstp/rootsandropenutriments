import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://server-rooots.onrender.com";

export const adminLogin = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
    email,
    password,
  });

  return response.data;
};

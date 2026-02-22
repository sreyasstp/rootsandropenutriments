import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const adminLogin = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
    email,
    password,
  });

  return response.data;
};

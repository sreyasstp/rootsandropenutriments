import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://server-rooots.onrender.com";

export const googleLoginApi = async (token: string) => {
  const res = await axios.post(`${BASE_URL}/api/auth/google`, {
    token,
  });

  return res.data;
};

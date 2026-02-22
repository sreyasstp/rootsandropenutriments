import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const googleLoginApi = async (token: string) => {
  const res = await axios.post(`${BASE_URL}/api/auth/google`, {
    token,
  });

  return res.data;
};

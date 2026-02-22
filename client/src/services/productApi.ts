import axios from "axios";
import { Product } from "../types/Product";

const API = import.meta.env.VITE_API_URL + "/api/products";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API);
  return res.data;
};

export const createProduct = async (data: Product) => {
  return axios.post(API, data);
};

export const updateProduct = async (id: string, data: Product) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteProduct = async (id: string) => {
  return axios.delete(`${API}/${id}`);
};

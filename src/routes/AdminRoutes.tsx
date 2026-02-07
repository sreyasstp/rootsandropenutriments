import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Settings from "../pages/admin/Settings";
import ProductFormPage from "../pages/admin/ProductFormPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="orders" element={<Orders />} />
      <Route path="customers" element={<Customers />} />
      <Route path="settings" element={<Settings />} />
      <Route path="products/new" element={<ProductFormPage />} />
      <Route path="products/:id/edit" element={<ProductFormPage />} />
    </Routes>
  );
}

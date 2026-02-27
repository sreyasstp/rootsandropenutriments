import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Products from "../pages/admin/AdminProducts";
import ProductFormPage from "../pages/admin/ProductFormPage";

export default function AdminMap() {
    return (
        <Routes>
            {/* /admin → redirect to dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />

            {/* Products Routes */}
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<ProductFormPage />} />
            <Route path="products/:id/edit" element={<ProductFormPage />} />

            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
        </Routes>
    );
}
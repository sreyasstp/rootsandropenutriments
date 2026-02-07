import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import { ProductDetail } from "./components/ProductDetail";
import { ContactPage } from "./pages/ContactPage";
import { CataloguePage } from "./pages/CataloguePage";
import { CheckoutPage } from "./pages/CheckoutPage";

import PublicLayout from "./layouts/PublicLayout";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./pages/admin/AdminLogin";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // ✅ ADD THIS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScrollToTop } from "./components/ScrollToTop";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
      <BrowserRouter>
        <ScrollToTop />

        {/* ✅ AUTH PROVIDER MUST WRAP HEADER */}
        <AuthProvider>
          <CartProvider>
            <Routes>

              {/* 🌐 PUBLIC WEBSITE */}
              <Route element={<PublicLayout />}>
                <Route index element={<App />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="catalogue" element={<CataloguePage />} />
                <Route path="checkout" element={<CheckoutPage />} />
              </Route>

              {/* 🔐 ADMIN */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={<AdminRoutes />} />

            </Routes>

            <ToastContainer
              position="bottom-center"
              autoClose={1500}
              hideProgressBar
            />
          </CartProvider>
        </AuthProvider>

      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);

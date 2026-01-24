import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { ProductDetail } from './components/ProductDetail';
import { ContactPage } from './pages/ContactPage';
import { CataloguePage } from './pages/CataloguePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './index.css';
import { CheckoutPage } from "./pages/CheckoutPage";

import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Header />

          <main className="pt-20">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/catalogue" element={<CataloguePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

            </Routes>
          </main>

          <Footer />

          <ToastContainer
            position="bottom-center"
            autoClose={1500}
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable={false}
            theme="light"
          />
        </div>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Hero } from "./components/Hero";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Features } from "./components/Features";
import { WomenInitiative } from "./components/WomenInitiative";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

const Products = lazy(() =>
  import("./components/Products").then((module) => ({
    default: module.Products,
  }))
);

const About = lazy(() =>
  import("./components/About").then((module) => ({
    default: module.About,
  }))
);

const AdminLogin = lazy(() =>
  import("./pages/admin/AdminLogin")
);

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Features />
      <WomenInitiative />

      <Suspense fallback={<div />}>
        <Products />
      </Suspense>

      <Suspense fallback={<div />}>
        <About />
      </Suspense>

      <WhatsAppFloat />
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Suspense>
  );
}

export default App;

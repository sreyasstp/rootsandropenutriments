import { lazy, Suspense } from "react";
import { useAuth } from "./context/AuthContext";

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

function App() {
  const { loading } = useAuth();

  // ⭐ WAIT until Supabase restores session
  if (loading) {
    return null; 
    // OR loader UI
    // return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

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

export default App;
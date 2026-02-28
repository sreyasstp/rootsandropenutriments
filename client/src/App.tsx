import { lazy, Suspense } from "react";

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

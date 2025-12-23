import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Products } from './components/Products';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <Hero />
        <Features />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

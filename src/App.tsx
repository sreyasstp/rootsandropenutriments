import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Products } from './components/Products';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export type Page = 'home' | 'about' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-20">
        {currentPage === 'home' && (
          <>
            <Hero />
            <Features />
            <Products />
          </>
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;

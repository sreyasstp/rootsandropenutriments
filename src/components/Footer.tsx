import { Heart } from 'lucide-react';
import type { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#004606] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Roots & Rope</h3>
            <p className="text-white/80 leading-relaxed">
              Nutriment from farm to family. Bringing you nature's finest products with love and care.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Certifications</h4>
            <ul className="space-y-2 text-white/80">
              <li>FSSAI Certified</li>
              <li>100% Plant Based</li>
              <li>No Added Preservatives</li>
              <li>Premium Quality</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/80 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-400 fill-current" /> by Roots & Rope Nutriment
          </p>
          <p className="text-white/60 text-sm mt-2">
            © {new Date().getFullYear()} Roots & Rope Nutriment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

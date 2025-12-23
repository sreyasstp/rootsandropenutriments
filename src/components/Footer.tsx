import { Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#004606]">Roots & Rope</h3>
            <p className="text-gray-600 leading-relaxed">
              Nutriment from farm to family. Bringing you nature's finest products with love and care.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-[#004606]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#products"
                  onClick={(e) => handleNavClick(e, '#products')}
                  className="text-gray-600 hover:text-[#004606] transition-colors cursor-pointer"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="text-gray-600 hover:text-[#004606] transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="tel:+918606441950" className="text-gray-600 hover:text-[#004606] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-[#004606]">Certifications</h4>
            <ul className="space-y-2 text-gray-600">
              <li>FSSAI Certified</li>
              <li>100% Plant Based</li>
              <li>No Added Preservatives</li>
              <li>Premium Quality</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/make_in_india.jpg"
              alt="Make in India"
              className="h-16 object-contain"
            />
          </div>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by{' '}
            <a
              href="https://zeevocdigital.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#004606] hover:text-[#006608] font-semibold transition-colors"
            >
              Zeevoc Digital
            </a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} Roots & Rope Nutriment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

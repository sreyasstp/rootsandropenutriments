import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer'; // ✅ adjust path if needed

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Cart count from context
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
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
    } else {
      navigate(href);
    }
  };

  // ✅ Open cart drawer popup
  const handleCartClick = () => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(true);
  };

  const allNavLinks = [
    { href: '#products', label: 'Products' },
    { href: '#about', label: 'About' },
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/contact', label: 'Contact' }
  ];

  const navLinks = allNavLinks.filter((link) => {
    if (link.href === '/contact' && location.pathname === '/contact') return false;
    if (link.href === '/catalogue' && location.pathname === '/catalogue') return false;
    return true;
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleLogoClick}
            >
              <img
                src="/roots_logo.jpg"
                alt="Roots & Rope"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[#004606] font-medium hover:text-[#005708] transition-colors relative group cursor-pointer"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#004606] group-hover:w-full transition-all duration-300" />
                </a>
              ))}

              {/* ✅ Cart Button */}
              <button
                onClick={handleCartClick}
                className="relative p-2 text-[#004606] hover:text-[#005708] transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[11px] leading-[18px] text-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="md:hidden flex items-center gap-2">
              {/* ✅ Mobile Cart */}
              <button
                onClick={handleCartClick}
                className="relative p-2 text-[#004606]"
                aria-label="Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[11px] leading-[18px] text-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#004606]"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-3 px-2 text-[#004606] font-medium hover:text-[#005708] transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* ✅ Cart Drawer Popup */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

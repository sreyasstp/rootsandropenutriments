import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';
import { products } from '../data/products';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Search
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  // ✅ Cart count from context
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Close search dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!searchRef.current) return;
      if (!searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // ✅ Filtered results
  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];

    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 6);
  }, [search]);

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);

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

  const handleCartClick = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(true);
  };

  const handleResultClick = (id: number) => {
    setSearch('');
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    navigate(`/product/${id}`);
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
        <div className="relative">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top row */}
            <div className="flex items-center justify-between h-20 gap-3">
              {/* Logo */}
              <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
                <img
                  src="/roots_logo.jpg"
                  alt="Roots & Rope"
                  className="h-16 w-auto object-contain"
                />
              </div>

              {/* ✅ Desktop Search */}
              <div className="hidden md:flex flex-1 max-w-md" ref={searchRef}>
                <div className="relative w-full">
                  <div className="flex items-center gap-2 bg-[#f2ecdc]/50 border border-[#004606]/20 rounded-xl px-3 py-2">
                    <Search className="w-5 h-5 text-[#004606]" />
                    <input
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setIsSearchOpen(true);
                      }}
                      onFocus={() => setIsSearchOpen(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setIsSearchOpen(false);
                      }}
                      placeholder="Search products..."
                      className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500"
                    />
                  </div>

                  {/* Desktop results */}
                  {isSearchOpen && search.trim() && (
                    <div className="absolute top-[48px] left-0 right-0 bg-white rounded-xl shadow-xl border overflow-hidden z-50">
                      {results.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500">No products found</div>
                      ) : (
                        results.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleResultClick(p.id)}
                            className="w-full flex items-center gap-3 p-3 hover:bg-[#f2ecdc]/40 text-left"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-contain bg-[#f2ecdc]"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-[#004606]">{p.name}</p>
                              <p className="text-xs text-gray-500">{p.category}</p>
                            </div>
                            <div className="text-sm font-bold text-[#004606]">₹{p.prices[0]}</div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop menu + cart */}
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

                {/* ✅ Cart */}
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

              {/* ✅ Mobile icons */}
              <div className="md:hidden flex items-center gap-2">
                {/* Search icon */}
                <button
                  onClick={() => {
                    setIsSearchOpen((prev) => !prev);
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2 text-[#004606]"
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                </button>

                {/* Cart */}
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

                {/* Menu */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                    setIsSearchOpen(false);
                  }}
                  className="p-2 text-[#004606]"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </nav>

          {/* ✅ Mobile Search Popup */}
          {isSearchOpen && (
            <div className="md:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg z-50">
              <div className="px-4 py-3" ref={searchRef}>
                <div className="flex items-center gap-2 bg-[#f2ecdc]/50 border border-[#004606]/20 rounded-xl px-3 py-2">
                  <Search className="w-5 h-5 text-[#004606]" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setIsSearchOpen(false);
                    }}
                    placeholder="Search products..."
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500"
                  />
                  <button
                    onClick={() => {
                      setSearch('');
                      setIsSearchOpen(false);
                    }}
                    className="p-1"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5 text-[#004606]" />
                  </button>
                </div>

                {/* Results */}
                {search.trim() && (
                  <div className="mt-3 bg-white border rounded-xl overflow-hidden">
                    {results.length === 0 ? (
                      <div className="p-3 text-sm text-gray-500">No products found</div>
                    ) : (
                      results.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleResultClick(p.id)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-[#f2ecdc]/40 text-left"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-contain bg-[#f2ecdc]"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#004606]">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.category}</p>
                          </div>
                          <div className="text-sm font-bold text-[#004606]">₹{p.prices[0]}</div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ✅ Mobile Menu FULL WIDTH */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg">
              <div className="px-4 py-4 space-y-2">
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
            </div>
          )}
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

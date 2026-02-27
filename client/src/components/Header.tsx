import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from './GoogleLoginButton';
import { searchProducts, getFeaturedProducts } from '../services/productApi';
import { Product, getDefaultVariant } from '../types/Product';

const SEARCH_SUGGESTIONS_LIMIT = 5;

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // 🔍 Search
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [defaultProducts, setDefaultProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { cartCount } = useCart();

  // Load default suggestions once on mount — from Supabase featured products
  useEffect(() => {
    getFeaturedProducts().then((all) => {
      const defaults = all.slice(0, SEARCH_SUGGESTIONS_LIMIT);
      setDefaultProducts(defaults);
      setSearchResults(defaults);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search on outside click
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

  // Close profile menu on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!profileMenuRef.current) return;
      if (!profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Debounced search against Supabase
  useEffect(() => {
    const q = search.trim();

    if (!q) {
      setSearchResults(defaultProducts);
      return;
    }

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      try {
        const results = await searchProducts(q);
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      }
    }, 250);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [search, defaultProducts]);

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsProfileMenuOpen(false);
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
    setIsProfileMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const handleCartClick = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsProfileMenuOpen(false);
    setIsCartOpen(true);
  };

  // ✅ Only change: navigate by slug instead of id
  const handleResultClick = (slug: string) => {
    setSearch('');
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleProfileNavigation = (path: string) => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const allNavLinks = [
    { href: '#products', label: 'Products' },
    { href: '#about', label: 'About' },
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/contact', label: 'Contact' },
  ];

  const navLinks = allNavLinks.filter((link) => {
    if (link.href === '/contact' && location.pathname === '/contact') return false;
    if (link.href === '/catalogue' && location.pathname === '/catalogue') return false;
    return true;
  });

  const SearchResultList = ({ results }: { results: Product[] }) => (
    <>
      {!search.trim() && (
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
          Popular Products
        </div>
      )}
      {results.length === 0 ? (
        <div className="p-4 text-sm text-gray-500">No products found</div>
      ) : (
        results.map((p) => {
          const defaultVariant = getDefaultVariant(p);
          return (
            <button
              key={p.id}
              onMouseDown={(e) => {
                e.preventDefault();
                handleResultClick(p.slug);
              }}
              onClick={() => handleResultClick(p.slug)}
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
              <div className="text-sm font-bold text-[#004606]">
                ₹{defaultVariant?.price ?? '—'}
              </div>
            </button>
          );
        })
      )}
    </>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}
      >
        <div className="relative">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 gap-3">
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

              {/* Desktop Search */}
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
                      placeholder="Search products..."
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>

                  {isSearchOpen && (
                    <div className="absolute top-[48px] left-0 right-0 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                      <SearchResultList results={searchResults} />
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop menu + auth + cart */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#004606] font-medium hover:text-[#005708] transition"
                  >
                    {link.label}
                  </a>
                ))}

                {!user ? (
                  <GoogleLoginButton />
                ) : (
                  <div className="relative" ref={profileMenuRef}>
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <img
                        src={user.user_metadata?.avatar_url || '/default-avatar.png'}
                        alt={user.user_metadata?.full_name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-left text-sm">
                        <p className="font-medium text-gray-900 truncate">
                          {user.user_metadata?.full_name?.split(' ')[0] || 'User'}
                        </p>
                      </div>
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <button
                          onClick={() => handleProfileNavigation('/profile')}
                          className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-900 hover:bg-gray-50 transition"
                        >
                          <User className="w-4 h-4 text-[#004606]" />
                          <span className="text-sm font-medium">My Profile</span>
                        </button>
                        <button
                          onClick={() => handleProfileNavigation('/orders')}
                          className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-900 hover:bg-gray-50 transition"
                        >
                          <ShoppingCart className="w-4 h-4 text-[#004606]" />
                          <span className="text-sm font-medium">My Orders</span>
                        </button>
                        <hr className="my-2" />
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <button onClick={handleCartClick} className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                  <ShoppingCart className="w-6 h-6 text-[#004606]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] px-1 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile icons */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsSearchOpen((p) => !p);
                    setIsMobileMenuOpen(false);
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <Search className="w-6 h-6 text-[#004606]" />
                </button>

                <button onClick={handleCartClick} className="relative">
                  <ShoppingCart className="w-6 h-6 text-[#004606]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] px-1 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                    setIsSearchOpen(false);
                    setIsProfileMenuOpen(false);
                  }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-[#004606]" />
                  ) : (
                    <Menu className="w-6 h-6 text-[#004606]" />
                  )}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden bg-white border-t shadow-lg">
              <div className="px-4 py-3" ref={searchRef}>
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
                <div className="mt-3 border rounded-xl overflow-hidden">
                  <SearchResultList results={searchResults} />
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t shadow-lg">
              <div className="px-4 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#004606] font-medium py-2 border-b last:border-b-0"
                  >
                    {link.label}
                  </a>
                ))}

                {!user ? (
                  <GoogleLoginButton />
                ) : (
                  <div className="space-y-3 pt-2 border-t">
                    <button
                      onClick={() => handleProfileNavigation('/profile')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-[#004606] font-medium hover:bg-[#004606]/5 rounded-lg transition"
                    >
                      <User className="w-5 h-5" />
                      My Profile
                    </button>
                    <button
                      onClick={() => handleProfileNavigation('/orders')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-[#004606] font-medium hover:bg-[#004606]/5 rounded-lg transition"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 font-medium hover:bg-red-50 rounded-lg transition"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { products, categories } from '../data/products';

import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [showAll, setShowAll] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<Set<number>>(new Set());

  // ✅ Mobile View Toggle (1 column or 2 columns) - mobile only
  const [mobileView, setMobileView] = useState<'one' | 'two'>(() => {
    const saved = localStorage.getItem('mobile_products_view');
    return saved === 'two' ? 'two' : 'one';
  });

  const navigate = useNavigate();
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ Hook MUST be inside component
  const { addToCart } = useCart();

  // ✅ Save view preference
  useEffect(() => {
    localStorage.setItem('mobile_products_view', mobileView);
  }, [mobileView]);

  const filteredProducts =
    selectedCategory === 'All Products'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 12);
  const hasMoreProducts = filteredProducts.length > 12;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleProducts((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      productRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [displayedProducts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAll(false);
    setVisibleProducts(new Set());
    productRefs.current = [];
  };

  const handleBuyNow = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    const message = `Hi, I want to buy:\n\nProduct: ${productName}`;
    const whatsappUrl = `https://wa.me/917012426181?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // ✅ Add to cart
  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();

    const fullProduct = products.find((p) => p.id === productId);
    if (!fullProduct) return;

    const defaultPackSize = fullProduct.packSizes[0];

    addToCart(fullProduct, defaultPackSize, 1);

    toast.success(`${fullProduct.name} added to cart ✅`);
  };

  return (
    <section id="products" className="py-20 bg-[#f2ecdc]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Explore our range of premium natural products, carefully sourced and processed for your family
          </p>

          <a
            href="/roots_and_rope_catalogue.pdf"
            download="Roots_and_Rope_Catalogue.pdf"
            className="inline-flex items-center gap-2 bg-[#d4a574] hover:bg-[#c49563] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ChevronDown className="w-5 h-5" />
            Download Full Catalogue
          </a>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#004606] text-white shadow-lg scale-105'
                  : 'bg-white text-[#004606] hover:bg-[#f2ecdc] hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ✅ Mobile View Toggle */}
        {/* <div className="flex justify-center mb-10 md:hidden">
          <div className="inline-flex bg-white border rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setMobileView('one')}
              className={`px-5 py-2 text-sm font-semibold transition ${
                mobileView === 'one'
                  ? 'bg-[#004606] text-white'
                  : 'text-[#004606] hover:bg-[#f2ecdc]'
              }`}
            >
              1x
            </button>
            <button
              onClick={() => setMobileView('two')}
              className={`px-5 py-2 text-sm font-semibold transition ${
                mobileView === 'two'
                  ? 'bg-[#004606] text-white'
                  : 'text-[#004606] hover:bg-[#f2ecdc]'
              }`}
            >
              2x
            </button>
          </div>
        </div> */}

        {/* ✅ Grid */}
        <div
          className={`grid gap-6 justify-items-center ${
            mobileView === 'two' ? 'grid-cols-2' : 'grid-cols-1'
          } sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
        >
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              data-index={index}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden group hover:-translate-y-1 cursor-pointer w-full max-w-sm transition-all duration-700 ${
                visibleProducts.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: visibleProducts.has(index)
                  ? `${(index % 4) * 100}ms`
                  : '0ms'
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative overflow-hidden bg-[#f2ecdc] h-64 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#004606] mb-2">{product.name}</h3>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-[#004606]">
                      ₹{product.prices[0]}
                    </span>
                    {product.prices.length > 1 && (
                      <span className="text-sm text-gray-500">
                        - ₹{product.prices[product.prices.length - 1]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.packSizes.map((size, i) => (
                      <span
                        key={i}
                        className="bg-[#f2ecdc] text-[#004606] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {size}
                        {product.unit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <button
                    onClick={(e) => handleAddToCart(e, product.id)}
                    className="w-full bg-[#004606] hover:bg-[#006609] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>

                  {/* Optional Buy Now */}
                  {/* <button
                    onClick={(e) => handleBuyNow(e, product.name)}
                    className="w-full bg-white border-2 border-[#004606] text-[#004606] font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#f2ecdc]"
                  >
                    Buy Now
                  </button> */}

                  <span className="block text-xs text-gray-500 uppercase tracking-wide text-center">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No products */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category</p>
          </div>
        )}

        {/* Load More */}
        {hasMoreProducts && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-[#004606] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#006609] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Load More
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

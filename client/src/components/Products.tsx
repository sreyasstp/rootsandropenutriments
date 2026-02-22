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

  // ✅ Selected pack size per product
  const [selectedPack, setSelectedPack] = useState<Record<number, string>>({});

  const navigate = useNavigate();
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { addToCart } = useCart();

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
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleProducts((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    productRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => productRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, [displayedProducts]);

  useEffect(() => {
    const defaultPacks: Record<number, string> = {};
  
    displayedProducts.forEach((product) => {
      // Don't override if user already selected
      if (!selectedPack[product.id] && product.packSizes?.length > 0) {
        defaultPacks[product.id] = product.packSizes[0]; // smallest size
      }
    });
  
    if (Object.keys(defaultPacks).length > 0) {
      setSelectedPack((prev) => ({ ...prev, ...defaultPacks }));
    }
  }, [displayedProducts]);
  

  const getPriceForPack = (product: any) => {
    const selectedSize = selectedPack[product.id];
    if (!selectedSize) return product.prices[0];
  
    const index = product.packSizes.indexOf(selectedSize);
    return index !== -1 ? product.prices[index] : product.prices[0];
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAll(false);
    setVisibleProducts(new Set());
    productRefs.current = [];
  };

  // ✅ Pack select handler
  const handlePackSelect = (
    e: React.MouseEvent,
    productId: number,
    pack: string
  ) => {
    e.stopPropagation();
    setSelectedPack((prev) => ({ ...prev, [productId]: pack }));
  };

  // ✅ Add to cart (qty fixed = 1)
  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const pack = selectedPack[productId];

    if (!pack) {
      toast.error('Please select a pack size');
      return;
    }

    addToCart(product, pack, 1);
    toast.success(`${product.name} (${pack}${product.unit}) added to cart`);
  };

  return (
    <section id="products" className="py-20 bg-[#f2ecdc]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600">
            Premium natural products for your family
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                selectedCategory === category
                  ? 'bg-[#004606] text-white'
                  : 'bg-white text-[#004606] hover:bg-[#f2ecdc]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              data-index={index}
              onClick={() => navigate(`/product/${product.id}`)}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl w-full max-w-sm cursor-pointer transition-all duration-700 ${
                visibleProducts.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Image */}
              <div className="h-64 bg-[#f2ecdc] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="max-w-[90%] max-h-[90%] object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#004606] mb-2">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-[#004606]">
                  ₹{getPriceForPack(product)}
                                    </span>
                  {product.prices.length > 1 && (
                    <span className="text-sm text-gray-400 line-through">
                      {/* ₹{product.prices[product.prices.length - 1]} */}
                    </span>
                  )}
                </div>

                {/* ✅ Pack size selector */}
                <div
                  className="flex flex-wrap gap-2 mb-5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {product.packSizes.map((size) => {
                    const isSelected = selectedPack[product.id] === size;
                    return (
                      <button
                        key={size}
                        onClick={(e) =>
                          handlePackSelect(e, product.id, size)
                        }
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                          isSelected
                            ? 'bg-[#004606] text-white border-[#004606]'
                            : 'bg-[#f2ecdc] text-[#004606] border-transparent hover:border-[#004606]'
                        }`}
                      >
                        {size}
                        {product.unit}
                      </button>
                    );
                  })}
                </div>

                {/* Add to cart */}
                <button
                  onClick={(e) => handleAddToCart(e, product.id)}
                  className="w-full bg-[#004606] hover:bg-[#006609] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                <span className="block text-xs text-gray-500 text-center mt-3">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMoreProducts && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="bg-[#004606] text-white px-8 py-4 rounded-xl font-semibold"
            >
              Load More <ChevronDown className="inline w-5 h-5 ml-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

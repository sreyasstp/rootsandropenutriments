import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 🔥 added
import { getProducts, getCategories } from '../services/productApi';
import { Product, getDefaultVariant, getPriceForSize } from '../types/Product';

export function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All Products']);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [showAll, setShowAll] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<Set<number>>(new Set());
  const [selectedPack, setSelectedPack] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { addToCart } = useCart();

  // 🔥 Auth state
  const { session, loading: authLoading } = useAuth();

  // Load products + categories from Supabase
  useEffect(() => {

    console.log("👤 Auth loading:", authLoading);
    console.log("🔐 Session:", session);

    if (authLoading) {
      console.log("⏳ Waiting for auth...");
      return;
    }

    const load = async () => {

      console.log("🚀 Load started");

      try {
        console.log("📡 Calling Supabase APIs...");
        console.log("JWT present?", !!session?.access_token);

        const [prods, cats] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        console.log("✅ Products response:", prods);
        console.log("📦 Product count:", prods?.length);
        console.log("✅ Categories response:", cats);

        setProducts(prods);
        setCategories(cats);

      } catch (err) {
        console.error("❌ Failed to load products:", err);
        toast.error("Could not load products. Please try again.");
      } finally {
        console.log("🏁 Load finished");
        setLoading(false);
      }
    };

    load();

  }, [authLoading, session]);

  const filteredProducts =
    selectedCategory === 'All Products'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 12);
  const hasMoreProducts = filteredProducts.length > 12;

  // Intersection animation
  useEffect(() => {
    console.log("👀 Observing products:", displayedProducts.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            console.log("🎯 Visible product index:", index);
            setVisibleProducts((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    productRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => productRefs.current.forEach((ref) => ref && observer.unobserve(ref));

  }, [displayedProducts]);

  // Set default pack selection
  useEffect(() => {

    console.log("📦 Setting default packs");

    const defaults: Record<string, string> = {};

    displayedProducts.forEach((product) => {
      if (!selectedPack[product.id]) {
        const defaultVariant = getDefaultVariant(product);
        if (defaultVariant) {
          defaults[product.id] = defaultVariant.pack_size;
          console.log("🟢 Default pack set:", product.name, defaultVariant.pack_size);
        }
      }
    });

    if (Object.keys(defaults).length > 0) {
      setSelectedPack((prev) => ({ ...prev, ...defaults }));
    }

  }, [displayedProducts]);

  const handleCategoryChange = (category: string) => {
    console.log("📂 Category changed:", category);
    setSelectedCategory(category);
    setShowAll(false);
    setVisibleProducts(new Set());
    productRefs.current = [];
  };

  const handlePackSelect = (e: React.MouseEvent, productId: string, packSize: string) => {
    e.stopPropagation();
    console.log("📦 Pack selected:", productId, packSize);
    setSelectedPack((prev) => ({ ...prev, [productId]: packSize }));
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();

    const packSize = selectedPack[product.id];
    console.log("🛒 Add to cart:", product.name, packSize);

    if (!packSize) {
      toast.error('Please select a pack size');
      return;
    }

    addToCart(product, packSize, 1);
    toast.success(`${product.name} (${packSize}${product.unit}) added to cart`);
  };

  if (loading || authLoading) {
    console.log("⏳ UI Loading...");
    return (
      <div className="py-20 text-center text-gray-500">Loading products…</div>
    );
  }

  console.log("🟢 Rendering products:", displayedProducts.length);

  return (
    <section id="products" className="py-20 bg-[#f2ecdc]/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#004606] mb-4">Our Products</h2>
          <p className="text-lg text-gray-600">Premium natural products for your family</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-lg font-medium transition ${selectedCategory === category
                ? 'bg-[#004606] text-white'
                : 'bg-white text-[#004606]'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedProducts.map((product, index) => {
            const currentPackSize = selectedPack[product.id];
            const price = getPriceForSize(product, currentPackSize);

            return (
              <div
                key={product.id}
                ref={(el) => (productRefs.current[index] = el)}
                data-index={index}
                onClick={() => navigate(`/product/${product.slug}`)}
                className={`bg-white rounded-xl shadow-md cursor-pointer transition-all duration-700 ${visibleProducts.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  }`}
              >
                {/* Image */}
                <div className="h-64 bg-[#f2ecdc] flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-[90%] max-h-[90%] object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#004606] mb-2">{product.name}</h3>

                  <div className="text-2xl font-bold text-[#004606] mb-4">₹{price}</div>

                  {/* Pack sizes */}
                  <div
                    className="flex flex-wrap gap-2 mb-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.product_variants.map((variant) => {
                      const selected = selectedPack[product.id] === variant.pack_size;
                      return (
                        <button
                          key={variant.id}
                          onClick={(e) => handlePackSelect(e, product.id, variant.pack_size)}
                          className={`px-4 py-1.5 rounded-full text-sm font-semibold ${selected
                            ? 'bg-[#004606] text-white'
                            : 'bg-[#f2ecdc] text-[#004606]'
                            }`}
                        >
                          {variant.pack_size}
                          {product.unit}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full bg-[#004606] text-white py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>

                  <span className="block text-xs text-gray-500 text-center mt-3">
                    {product.category}
                  </span>
                </div>
              </div>
            );
          })}
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
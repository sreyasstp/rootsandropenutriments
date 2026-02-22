import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { products as localProducts, categories } from "../data/products";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { getProducts } from "../services/productApi";
import { Product } from "../types/Product";
const USE_API = false; // 🔴 set to false temporarily

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [showAll, setShowAll] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<Set<number>>(new Set());
  const [selectedPack, setSelectedPack] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { addToCart } = useCart();

  // ✅ API FIRST → JSON FALLBACK
  // useEffect(() => {
  //   const loadProducts = async () => {
  //     try {
  //       const apiProducts = await getProducts();
  //       setProducts(apiProducts);
  //     } catch (err) {
  //       console.error("API failed, using local JSON", err);
  //       toast.warn("Using offline product data");
  //       setProducts(localProducts as Product[]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadProducts();
  // }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (USE_API) {
          const apiProducts = await getProducts();
  
          // Extra safety check
          if (!apiProducts || apiProducts.length === 0) {
            throw new Error("Empty API response");
          }
  
          setProducts(apiProducts);
        } else {
          // 🔥 Force JSON temporarily
          console.warn("API disabled, using local JSON");
          setProducts(localProducts as Product[]);
        }
      } catch (err) {
        console.error("API failed, using local JSON", err);
        toast.warn("Using offline product data");
        setProducts(localProducts as Product[]);
      } finally {
        setLoading(false);
      }
    };
  
    loadProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 12);

  const hasMoreProducts = filteredProducts.length > 12;

  // ✅ Intersection animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleProducts((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    productRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () =>
      productRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, [displayedProducts]);

  // ✅ Default pack selection
  useEffect(() => {
    const defaults: Record<string, string> = {};

    displayedProducts.forEach((product: any) => {
      const key = product._id ?? product.id;
      if (!selectedPack[key] && product.packSizes?.length > 0) {
        defaults[key] = product.packSizes[0];
      }
    });

    if (Object.keys(defaults).length > 0) {
      setSelectedPack((prev) => ({ ...prev, ...defaults }));
    }
  }, [displayedProducts]);

  const getPriceForPack = (product: any) => {
    const key = product._id ?? product.id;
    const selectedSize = selectedPack[key];
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

  const handlePackSelect = (
    e: React.MouseEvent,
    productKey: string,
    pack: string
  ) => {
    e.stopPropagation();
    setSelectedPack((prev) => ({ ...prev, [productKey]: pack }));
  };

  const handleAddToCart = (e: React.MouseEvent, productKey: string) => {
    e.stopPropagation();

    const product: any = products.find(
      (p: any) => p._id === productKey || p.id === productKey
    );

    if (!product) return;

    const pack = selectedPack[productKey];
    if (!pack) {
      toast.error("Please select a pack size");
      return;
    }

    addToCart(product, pack, 1);
    toast.success(`${product.name} (${pack}${product.unit}) added to cart`);
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading products…
      </div>
    );
  }

  return (
    <section id="products" className="py-20 bg-[#f2ecdc]/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#004606] mb-4">
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
                  ? "bg-[#004606] text-white"
                  : "bg-white text-[#004606]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedProducts.map((product: any, index) => {
            const key = product._id ?? product.id;

            return (
              <div
                key={key}
                ref={(el) => (productRefs.current[index] = el)}
                data-index={index}
                onClick={() => navigate(`/product/${key}`)}
                className={`bg-white rounded-xl shadow-md cursor-pointer transition-all duration-700 ${
                  visibleProducts.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
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
                  <h3 className="text-xl font-bold text-[#004606] mb-2">
                    {product.name}
                  </h3>

                  <div className="text-2xl font-bold text-[#004606] mb-4">
                    ₹{getPriceForPack(product)}
                  </div>

                  {/* Pack sizes */}
                  <div
                    className="flex flex-wrap gap-2 mb-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.packSizes.map((size: string) => {
                      const selected = selectedPack[key] === size;
                      return (
                        <button
                          key={size}
                          onClick={(e) =>
                            handlePackSelect(e, key, size)
                          }
                          className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                            selected
                              ? "bg-[#004606] text-white"
                              : "bg-[#f2ecdc] text-[#004606]"
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
                    onClick={(e) => handleAddToCart(e, key)}
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
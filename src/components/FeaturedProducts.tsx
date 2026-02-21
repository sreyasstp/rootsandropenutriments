import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';

export function FeaturedProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ derive featured products from master list
  const featuredProducts: Product[] = products.filter(
    (product) => product.isFeatured
  );

  const [visibleProducts, setVisibleProducts] = useState<Set<number>>(new Set());
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ selected pack per product
  const [selectedPack, setSelectedPack] = useState<Record<number, string>>({});

  // intersection observer animation
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
      { threshold: 0.15, rootMargin: '50px' }
    );

    productRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () =>
      productRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  // set default pack (smallest)
  useEffect(() => {
    setSelectedPack((prev) => {
      const updated = { ...prev };
  
      featuredProducts.forEach((product) => {
        if (!updated[product.id] && product.packSizes.length > 0) {
          updated[product.id] = product.packSizes[0];
        }
      });
  
      return updated;
    });
  }, [featuredProducts]);

  // get price for selected pack
  const getPriceForPack = (product: Product) => {
    const selectedSize = selectedPack[product.id];
    if (!selectedSize) return product.prices[0];

    const index = product.packSizes.indexOf(selectedSize);
    return index !== -1 ? product.prices[index] : product.prices[0];
  };

  // pack select
  const handlePackSelect = (
    e: React.MouseEvent,
    productId: number,
    pack: string
  ) => {
    e.stopPropagation();
    setSelectedPack((prev) => ({ ...prev, [productId]: pack }));
  };

  // add to cart
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();

    const pack = selectedPack[product.id];
    if (!pack) {
      toast.error('Please select a pack size');
      return;
    }

    addToCart(product, pack, 1);
    toast.success(`${product.name} (${pack}${product.unit}) added to cart`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#f2ecdc] via-[#faf8f0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#004606]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-[#004606] text-sm font-semibold uppercase">
              Featured Collection
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-6">
            Our Premium Products
          </h2>
          <p className="text-gray-600">
            100% Natural • Preservative Free • Traditionally Sourced
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              data-index={index}
              onClick={() => navigate(`/product/${product.id}`)}
              className={`group bg-white rounded-3xl overflow-hidden cursor-pointer
                shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)]
                transition-all duration-700 ease-out
                ${
                  visibleProducts.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }
                hover:-translate-y-2`}
              style={{
                transitionDelay: visibleProducts.has(index)
                  ? `${index * 150}ms`
                  : '0ms'
              }}
            >
              {/* Image */}
              <div className="relative h-72 bg-[#f2ecdc] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {product.tagline && (
                  <span className="inline-block bg-[#004606]/5 text-[#004606] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {product.tagline}
                  </span>
                )}

                <h3 className="text-2xl font-extrabold tracking-tight text-[#004606] mb-1">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-3xl font-extrabold text-[#004606]">
                    ₹{getPriceForPack(product)}
                  </span>
                </div>

                {product.featuredDescription && (
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {product.featuredDescription}
                  </p>
                )}

                {/* Pack selector */}
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
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all
                          ${
                            isSelected
                              ? 'bg-[#004606] text-white shadow-md scale-105'
                              : 'bg-[#f7f3e8] text-[#004606] border border-[#004606]/10 hover:border-[#004606]/40'
                          }`}
                      >
                        {size}
                        {product.unit}
                      </button>
                    );
                  })}
                </div>

                {/* CTA */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-gradient-to-r from-[#004606] to-[#006609]
                    hover:from-[#006609] hover:to-[#008c0f]
                    text-white font-semibold py-3 rounded-lg
                    shadow-lg hover:shadow-xl
                    transition-all duration-300
                    flex items-center justify-center gap-2
                    active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <a
            href="#products"
            className="inline-flex items-center gap-2 bg-white text-[#004606] font-bold px-8 py-4 rounded-xl border-2 border-[#004606] hover:bg-[#f2ecdc] transition"
          >
            View all Products
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
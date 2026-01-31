import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const featuredProducts = [
  {
    id: 13,
    name: 'Raw Banana Powder',
    image: '/raw_banana_powder.jpg',
    tagline: 'Rich in Resistant Starch',
    description: 'Easily digestible and traditionally used for baby food'
  },
  {
    id: 14,
    name: 'Arrow Root Powder',
    image: '/arrowroot_powder.jpg',
    tagline: 'Gentle & Gluten-Free',
    description: 'A natural superfood that supports gut health and digestion'
  },
  {
    id: 7,
    name: 'Virgin Coconut Oil',
    image: '/virgin_coconut_oil.jpg',
    tagline: 'Pure & Hot Processed',
    description: 'Stable, high-quality oil suitable for regular cooking'
  },
  {
    id: 11,
    name: 'Sprouted Ragi Flour',
    image: '/sprouted_raggi_flour.png',
    tagline: 'Sprouted for Better Nutrition',
    description:
      'Traditionally prepared ragi flour suitable for daily cooking and nourishment'
  },
  {
    id: 5,
    name: 'Honey',
    image: '/honey.jpg',
    tagline: 'Raw & Unprocessed',
    description: 'Pure natural sweetness sourced directly from nature'
  },
  {
    id: 3,
    name: 'Almond Gum',
    image: '/almond_gum.jpg',
    tagline: 'Traditional Nourishment',
    description: 'Time-tested natural food for strength and vitality'
  }
];

export function FeaturedProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [visibleProducts, setVisibleProducts] = useState<Set<number>>(new Set());
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 🔹 Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState<any>(null);
  const [popupPack, setPopupPack] = useState<string | null>(null);
  const [popupQty, setPopupQty] = useState(1);

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

  // 🔹 Get default price
  const getDefaultPrice = (product: any) => product.prices[0];

  return (
    <>
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
            {featuredProducts.map((item, index) => {
              const product = products.find((p) => p.id === item.id);
              if (!product) return null;

              return (
                <div
                  key={item.id}
                  ref={(el) => (productRefs.current[index] = el)}
                  data-index={index}
                  onClick={() => navigate(`/product/${item.id}`)}
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
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block bg-[#004606]/5 text-[#004606] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {item.tagline}
                    </span>

                    <h3 className="text-2xl font-extrabold text-[#004606] mb-1">
                      {item.name}
                    </h3>

                    <div className="text-3xl font-extrabold text-[#004606] mb-3">
                      ₹{getDefaultPrice(product)}
                    </div>

                    <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Add to cart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPopupProduct(product);
                        setPopupPack(null);
                        setPopupQty(1);
                        setShowPopup(true);
                      }}
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
              );
            })}
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

      {/* ================= POPUP ================= */}
      {showPopup && popupProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#004606] mb-4">
              Select Pack & Quantity
            </h3>

            {/* Pack sizes */}
            <div className="flex flex-wrap gap-2 mb-5">
              {popupProduct.packSizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setPopupPack(size)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      popupPack === size
                        ? 'bg-[#004606] text-white'
                        : 'bg-[#f7f3e8] text-[#004606] border'
                    }`}
                >
                  {size}
                  {popupProduct.unit}
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold">Quantity</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setPopupQty(Math.max(1, popupQty - 1))}
                  className="px-3 py-1 text-lg"
                >
                  −
                </button>
                <span className="px-4">{popupQty}</span>
                <button
                  onClick={() => setPopupQty(popupQty + 1)}
                  className="px-3 py-1 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="w-1/2 border py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!popupPack) {
                    toast.error('Please select a pack size');
                    return;
                  }

                  addToCart(popupProduct, popupPack, popupQty);
                  toast.success(
                    `${popupProduct.name} (${popupPack}${popupProduct.unit}) added to cart`
                  );
                  setShowPopup(false);
                }}
                className="w-1/2 bg-[#004606] text-white py-3 rounded-lg font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

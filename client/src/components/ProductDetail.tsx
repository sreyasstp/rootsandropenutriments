import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ArrowLeft, Check, Leaf, Shield, Heart,
  ShoppingCart, Plus, Minus, CreditCard,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { getProductBySlug } from '../services/productApi';
import { Product, ProductVariant, getDefaultVariant } from '../types/Product';

export function ProductDetail() {
  const { addToCart } = useCart();
  const { user, login } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!slug) return;

    setLoading(true);
    getProductBySlug(slug)
      .then((prod) => {
        if (!prod) return;
        setProduct(prod);
        setSelectedVariant(getDefaultVariant(prod) ?? prod.product_variants[0] ?? null);
      })
      .catch(() => toast.error('Failed to load product'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    addToCart(product, selectedVariant.pack_size, quantity);
    toast.success(`${product.name} added to cart`);
  };

  /**
   * Buy Now:
   * - Adds item to cart immediately (preserved in localStorage)
   * - If signed in  → go straight to /checkout
   * - If guest      → store redirect intent, trigger Google login.
   *                   After OAuth redirect, AuthContext merges cart
   *                   and sends them to /checkout automatically.
   */
  const handleBuyNow = () => {
    if (!product || !selectedVariant) return;
    addToCart(product, selectedVariant.pack_size, quantity);

    if (user) {
      navigate('/checkout');
    } else {
      sessionStorage.setItem('post_login_redirect', '/checkout');
      login();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button onClick={() => navigate('/')} className="text-[#004606] hover:underline">
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const selectedPrice = selectedVariant?.price ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2ecdc]/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="hidden sm:flex items-center gap-2 text-[#004606] hover:text-[#006609] mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* ── Image ── */}
          <div className="relative">
            <div className="sticky top-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ── Details ── */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-[#004606]/10 text-[#004606] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
                {product.name}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                <Leaf className="w-5 h-5" /><span className="font-medium">100% Natural</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5" /><span className="font-medium">No Preservatives</span>
              </div>
              <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg">
                <Heart className="w-5 h-5" /><span className="font-medium">Premium Quality</span>
              </div>
            </div>

            {/* Size / Qty / CTA card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#004606]">Select Size</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#004606]">₹{selectedPrice}</div>
                  <div className="text-sm text-gray-500">per pack</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {product.product_variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => { setSelectedVariant(variant); setQuantity(1); }}
                    className={`flex flex-col items-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-md hover:shadow-xl transition-all ${selectedVariant?.id === variant.id
                        ? 'bg-gradient-to-br from-[#004606] to-[#006609] text-white'
                        : 'bg-gray-100 text-[#004606] hover:bg-gray-200'
                      }`}
                  >
                    <span>{variant.pack_size}{product.unit}</span>
                    <span className={`text-sm font-semibold mt-1 ${selectedVariant?.id === variant.id ? 'text-white/90' : 'text-gray-600'
                      }`}>
                      ₹{variant.price}
                    </span>
                  </button>
                ))}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#004606] mb-4">Quantity</h3>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5 text-[#004606]" />
                </button>
                <span className="text-2xl font-bold text-[#004606] min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#004606]" />
                </button>
              </div>

              <div className="bg-[#f2ecdc] rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-[#004606]">
                    ₹{selectedPrice * quantity}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{quantity} × ₹{selectedPrice}</div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#004606] hover:bg-[#006609] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-white border-2 border-[#004606] text-[#004606] font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg hover:bg-[#f2ecdc]"
                >
                  <CreditCard className="w-6 h-6" />
                  Buy Now
                </button>
              </div>

              {!user && (
                <p className="text-center text-xs text-gray-400 mt-3">
                  You'll be asked to sign in before checkout
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Benefits + Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {(product.benefits?.length ?? 0) > 0 && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#004606] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
                Health Benefits
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm sm:text-base lg:text-lg">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(product.features?.length ?? 0) > 0 && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#004606] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
                Product Features
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-[#004606] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm sm:text-base lg:text-lg">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {product.usage && (
          <div className="bg-gradient-to-br from-[#004606] to-[#006609] rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
              How to Use
            </h3>
            <p className="text-white/95 text-sm sm:text-base lg:text-lg leading-relaxed">
              {product.usage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
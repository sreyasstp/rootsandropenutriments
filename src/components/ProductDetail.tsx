import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { products } from '../data/products';
import { ArrowLeft, Check, Leaf, Shield, Heart, ShoppingCart, Plus, Minus } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product && product.packSizes.length > 0) {
      setSelectedSize(`${product.packSizes[0]}${product.unit}`);
      setSelectedPrice(product.prices[0]);
    }
  }, [id, product]);

  const handleBuyNow = () => {
    const message = `Hi, I want to buy:\n\nProduct: ${product?.name}\nSize: ${selectedSize}\nQuantity: ${quantity}`;
    const whatsappUrl = `https://wa.me/917012426181?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-[#004606] hover:underline"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2ecdc]/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/')}
          className="hidden sm:flex items-center gap-2 text-[#004606] hover:text-[#006609] mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
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

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                <Leaf className="w-5 h-5" />
                <span className="font-medium">100% Natural</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5" />
                <span className="font-medium">No Preservatives</span>
              </div>
              <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Premium Quality</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#004606]">Select Size</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#004606]">₹{selectedPrice}</div>
                  <div className="text-sm text-gray-500">per pack</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {product.packSizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedSize(`${size}${product.unit}`);
                      setSelectedPrice(product.prices[index]);
                    }}
                    className={`flex flex-col items-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-md hover:shadow-xl transition-all ${
                      selectedSize === `${size}${product.unit}`
                        ? 'bg-gradient-to-br from-[#004606] to-[#006609] text-white'
                        : 'bg-gray-100 text-[#004606] hover:bg-gray-200'
                    }`}
                  >
                    <span>{size}{product.unit}</span>
                    <span className={`text-sm font-semibold mt-1 ${
                      selectedSize === `${size}${product.unit}`
                        ? 'text-white/90'
                        : 'text-gray-600'
                    }`}>
                      ₹{product.prices[index]}
                    </span>
                  </button>
                ))}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#004606] mb-4">Quantity</h3>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={decrementQuantity}
                  className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5 text-[#004606]" />
                </button>
                <span className="text-2xl font-bold text-[#004606] min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#004606]" />
                </button>
              </div>

              <div className="bg-[#f2ecdc] rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-[#004606]">₹{selectedPrice * quantity}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {quantity} × ₹{selectedPrice}
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#004606] hover:bg-[#006609] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                Buy Now on WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {product.benefits && product.benefits.length > 0 && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#004606] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
                Health Benefits
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm sm:text-base lg:text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#004606] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
                Product Features
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-[#004606] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm sm:text-base lg:text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {product.usage && (
          <div className="bg-gradient-to-br from-[#004606] to-[#006609] rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">How to Use</h3>
            <p className="text-white/95 text-sm sm:text-base lg:text-lg leading-relaxed">
              {product.usage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

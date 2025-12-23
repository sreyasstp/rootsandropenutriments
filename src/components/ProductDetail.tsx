import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { products } from '../data/products';
import { ArrowLeft, Check, Leaf, Shield, Heart } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

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
          className="flex items-center gap-2 text-[#004606] hover:text-[#006609] mb-8 font-medium transition-colors"
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
              <h3 className="text-xl sm:text-2xl font-bold text-[#004606] mb-4">Available Sizes</h3>
              <div className="flex flex-wrap gap-3">
                {product.packSizes.map((size, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#004606] to-[#006609] text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    {size}{product.unit}
                  </div>
                ))}
              </div>
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

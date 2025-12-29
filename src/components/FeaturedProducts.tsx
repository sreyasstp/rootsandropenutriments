import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const featuredProducts = [
  {
    id: 13,
    name: 'Raw Banana Powder',
    image: '/raw_banana_powder.jpg',
    tagline: 'Rich in Resistant Starch',
    description: 'A natural superfood that supports gut health and digestion'
  },
  {
    id: 14,
    name: 'Arrow Root Powder',
    image: '/arrowroot_powder.jpg',
    tagline: 'Gentle & Gluten-Free',
    description: 'Easily digestible and traditionally used for baby food'
  },
  {
    id: 7,
    name: 'Virgin Coconut Oil',
    image: '/virgin_coconut_oil.jpg',
    tagline: 'Pure & Hot Processed',
    description: 'Stable, high-quality oil suitable for regular cooking'
  },
  {
    id: 6,
    name: 'Coconut Oil',
    image: '/coconut_oil.jpg',
    tagline: 'Versatile & Pure',
    description: 'Perfect for cooking, wellness, and everyday use'
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

  const handleBuyNow = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    const message = `Hi, I want to buy:\n\nProduct: ${productName}`;
    const whatsappUrl = `https://wa.me/917012426181?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#f2ecdc] via-[#faf8f0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#004606]/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-[#004606] text-sm font-semibold uppercase tracking-wide">
              Featured Products
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-6">
            Our Premium Products
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4">
            Manufactured & Sold by Roots & Rope Nutriment, Kerala
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            100% Natural • Preservative Free • WhatsApp Ordering
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative h-72 overflow-hidden bg-[#f2ecdc] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-[#004606]/5 text-[#004606] text-xs font-semibold px-3 py-1 rounded-full">
                    {product.tagline}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#004606] mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>
                <button
                  onClick={(e) => handleBuyNow(e, product.name)}
                  className="w-full bg-[#004606] hover:bg-[#006609] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917012426181?text=Hi,%20I%20want%20to%20buy%20products%20from%20Roots%20%26%20Rope%20Nutriment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#20BA5A] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Order on WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-[#004606] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#006609] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              View all Products
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

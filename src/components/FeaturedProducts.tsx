import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const featuredProducts = [
  {
    id: 13,
    name: 'Raw Banana Powder',
    image: '/raw_banana_powder.jpg',
    tagline: 'Rich in Resistant Starch',
    description: 'A natural superfood perfect for gut health and digestion'
  },
  {
    id: 14,
    name: 'Arrow Root Powder',
    image: '/arrowroot_powder.jpg',
    tagline: 'Gluten-Free Goodness',
    description: 'Easily digestible and ideal for all ages'
  },
  {
    id: 7,
    name: 'Virgin Coconut Oil',
    image: '/virgin_coconut_oil.jpg',
    tagline: 'Cold Pressed Purity',
    description: 'Premium quality oil extracted naturally'
  },
  {
    id: 6,
    name: 'Coconut Oil',
    image: '/coconut_oil.jpg',
    tagline: 'Versatile & Pure',
    description: 'Perfect for cooking and wellness'
  },
  {
    id: 5,
    name: 'Honey',
    image: '/honey.jpg',
    tagline: 'Raw & Unprocessed',
    description: 'Pure natural sweetness from nature'
  },
  {
    id: 3,
    name: 'Almond Gum',
    image: '/almond_gum.jpg',
    tagline: 'Natural Energy Booster',
    description: 'Traditional remedy for strength and vitality'
  }
];

export function FeaturedProducts() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-[#f2ecdc] via-[#faf8f0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#004606]/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-[#004606] text-sm font-semibold uppercase tracking-wide">
              Featured Collection
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-6">
            Our Premium Products
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            100% Natural • Preservative Free • Traditionally Sourced
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full bg-white text-[#004606] font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-[#f2ecdc] transition-colors">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#products"
            className="inline-flex items-center gap-2 bg-[#004606] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#006609] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Explore All Products
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { products, categories } from '../data/products';

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = selectedCategory === 'All Products'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 12);
  const hasMoreProducts = filteredProducts.length > 12;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  return (
    <section id="products" className="py-20 bg-[#f2ecdc]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our range of premium natural products, carefully sourced and processed for your family
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#004606] text-white shadow-lg scale-105'
                  : 'bg-white text-[#004606] hover:bg-[#f2ecdc] hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative overflow-hidden bg-[#f2ecdc] h-64 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#004606] mb-2">
                  {product.name}
                </h3>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Available Sizes:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.packSizes.map((size, index) => (
                      <span
                        key={index}
                        className="bg-[#f2ecdc] text-[#004606] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {size}{product.unit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category</p>
          </div>
        )}

        {hasMoreProducts && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-[#004606] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#006609] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Load More Products
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

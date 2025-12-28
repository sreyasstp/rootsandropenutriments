import { TreePine, Sprout, Home } from 'lucide-react';
import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const offset = useParallax(sectionRef, 0.3);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-20">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Organic farming background"
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${offset}px)` }}
        />
        <div className="absolute inset-0 bg-white/85"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Roots & Rope Nutriment, we believe in the power of nature's simplicity. Our journey began with a simple mission: to bring pure, unadulterated natural products from the farm directly to your family's table.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every product we offer is carefully sourced from trusted farms, processed with traditional methods, and packaged with care. We're not just selling products; we're sharing a commitment to health, sustainability, and the timeless wisdom of natural nutrition.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#004606] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#004606] mb-2">Sustainably Sourced</h3>
                  <p className="text-gray-600">From responsible farms that care for the earth</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#004606] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#004606] mb-2">Naturally Processed</h3>
                  <p className="text-gray-600">Traditional methods preserving nutritional value</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#004606] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#004606] mb-2">Family First</h3>
                  <p className="text-gray-600">Products we'd serve to our own families</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden mb-6 group">
                <img
                  src="/farmhouse.jpg"
                  alt="Our farm house in Kerala"
                  className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">Our Farm house in Kerala</h3>
                  <p className="text-white/95 drop-shadow">Where nature meets tradition</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#004606] mb-1">21+</div>
                    <p className="text-xs text-gray-600">Products</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#004606] mb-1">100%</div>
                    <p className="text-xs text-gray-600">Natural</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#004606] mb-1">0</div>
                    <p className="text-xs text-gray-600">Additives</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#004606]/10 rounded-2xl -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

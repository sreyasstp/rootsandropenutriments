import { TreePine, Sprout, Home } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#004606]">
                Our Story
              </h2>
              <img
                src="/women_init.png"
                alt="A Woman Initiative"
                className="h-20 w-auto"
                title="Proudly a Women's Initiative"
              />
            </div>
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
            <div className="bg-[#f2ecdc] rounded-2xl p-8 relative z-10">
              <div className="bg-white rounded-xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-[#004606] mb-2">21+</div>
                  <p className="text-gray-600 font-medium">Premium Products</p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#004606] mb-1">100%</div>
                    <p className="text-sm text-gray-600">Natural</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#004606] mb-1">0</div>
                    <p className="text-sm text-gray-600">Preservatives</p>
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

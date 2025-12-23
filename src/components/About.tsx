import { TreePine, Sprout, Home, Heart, Award, Users } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#004606] to-[#005708] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Bringing nature's purest gifts from the farm to your family
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Roots & Rope Nutriment, we believe in the power of nature's simplicity. Our journey began with a simple mission: to bring pure, unadulterated natural products from the farm directly to your family's table.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Every product we offer is carefully sourced from trusted farms, processed with traditional methods, and packaged with care. We're not just selling products; we're sharing a commitment to health, sustainability, and the timeless wisdom of natural nutrition.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our products are free from artificial additives, preservatives, and chemicals. We believe that what nature provides is perfect as it is, and our role is simply to bring it to you with care and integrity.
              </p>
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

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-[#f2ecdc]/50 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#004606] mb-3">Sustainably Sourced</h3>
              <p className="text-gray-600">From responsible farms that care for the earth and follow ethical practices</p>
            </div>

            <div className="bg-[#f2ecdc]/50 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#004606] mb-3">Naturally Processed</h3>
              <p className="text-gray-600">Traditional methods preserving nutritional value and natural goodness</p>
            </div>

            <div className="bg-[#f2ecdc]/50 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#004606] mb-3">Family First</h3>
              <p className="text-gray-600">Products we'd serve to our own families with pride and confidence</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#004606] to-[#005708] rounded-2xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Health & Wellness</h3>
                <p className="text-white/80">Your health is our priority in every product we offer</p>
              </div>

              <div className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Excellence</h3>
                <p className="text-white/80">Uncompromising quality standards in sourcing and processing</p>
              </div>

              <div className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Focus</h3>
                <p className="text-white/80">Supporting local farmers and sustainable practices</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Leaf } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Natural farm background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f2ecdc]/95 via-[#f2ecdc]/90 to-[#e8dfc7]/95"></div>
        <div className="absolute inset-0 bg-[#004606]/5"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full mb-6">
              <Leaf className="w-5 h-5 text-[#004606]" />
              <span className="text-[#004606] font-medium text-sm tracking-wide">100% Natural & Pure</span>
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#004606] mb-6 leading-tight">
              Farm to Family
            </h1>

            <p className="text-lg lg:text-xl text-[#004606]/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover nature's finest treasures with Roots & Rope Nutriment. Pure, organic products delivered with care from our farms to your family.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#products"
                className="bg-[#004606] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#005708] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Products
              </a>
              <a
                href="#about"
                className="bg-white text-[#004606] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-[#004606]"
              >
                Our Story
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="/family.png"
                alt="Happy family with Roots & Rope products"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-[#004606]/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -left-4 w-48 h-48 bg-[#004606]/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}

import { Leaf } from 'lucide-react';
import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const offset = useParallax(sectionRef, 0.5);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Natural farm background"
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${offset}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f2ecdc]/75 via-[#f2ecdc]/65 to-[#e8dfc7]/70"></div>
        <div className="absolute inset-0 bg-[#004606]/3"></div>
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

            <p className="text-lg lg:text-xl text-[black]/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We manufacture and sell 100% natural, preservative-free products from Kerala. Buy directly from the source and enjoy authentic quality at the best prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://wa.me/918606441950?text=Hi,%20I%20want%20to%20buy%20products%20from%20Roots%20%26%20Rope%20Nutriment"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#004606] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#005708] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Buy on WhatsApp
              </a>
              <a
                href="#products"
                className="bg-white text-[#004606] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-[#004606]"
              >
                View All Products
              </a>
            </div>

            <div className="mt-6 flex items-center gap-6 justify-center lg:justify-start text-sm text-gray-700">
              {/* <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#004606] rounded-full"></div>
                <span>Direct from Manufacturer</span>
              </div> */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#004606] rounded-full"></div>
                <span>Made in Kerala</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#004606] rounded-full"></div>
                <span>FSSAI Certified</span>
              </div>
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

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t  to-transparent"></div>
    </section>
  );
}

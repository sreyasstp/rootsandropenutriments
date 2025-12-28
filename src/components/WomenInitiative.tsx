import { Heart, Users, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function WomenInitiative() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-[#f2ecdc] to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#004606]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#004606]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <img
            src="/women_init.png"
            alt="A Woman Initiative"
            className="h-48 w-auto mx-auto mb-6"
            title="Proudly a Woman Initiative"
          />
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Empowered by Woman
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Roots & Rope Nutriment is proudly a woman-led initiative, bringing together passion,
            tradition, and dedication to deliver nature's finest products to your family.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className={`glass rounded-3xl p-8 hover-lift border border-white/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="bg-gradient-to-br from-[#004606] to-[#006609] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg animate-glow">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#004606] mb-4 text-center">
              Made with Love
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Every product is crafted with care and attention to detail, reflecting the nurturing spirit
              and dedication of woman entrepreneurs committed to quality and excellence.
            </p>
          </div>

          <div className={`glass rounded-3xl p-8 hover-lift border border-white/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-[#004606] to-[#006609] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg animate-glow">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#004606] mb-4 text-center">
              Community Impact
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Supporting local woman farmers and artisans, we create a sustainable ecosystem that
              empowers communities and preserves traditional knowledge for future generations.
            </p>
          </div>

          <div className={`glass rounded-3xl p-8 hover-lift border border-white/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-br from-[#004606] to-[#006609] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg animate-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#004606] mb-4 text-center">
              Inspiring Change
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Breaking barriers and setting new standards, we demonstrate that woman-led businesses
              can thrive while staying true to values of authenticity, health, and sustainability.
            </p>
          </div>
        </div>

        <div className={`mt-16 glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 hover-lift ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#004606] mb-4">
                Our Commitment
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                As a woman initiative, we're committed to fostering economic independence,
                preserving traditional wisdom, and creating opportunities for woman in every
                step of our supply chain.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From the farmers who grow our ingredients to the team that brings these products
                to your doorstep,  are at the heart of everything we do. Together, we're
                building a future where quality, care, and empowerment go hand in hand.
              </p>
            </div>
            <div className="glass-dark rounded-2xl p-8 backdrop-blur-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group cursor-default">
                  <div className="text-4xl font-bold text-shimmer mb-2 group-hover:scale-110 transition-transform">100%</div>
                  <p className="text-sm text-gray-600 font-medium">Woman-Led</p>
                </div>
                <div className="text-center group cursor-default">
                  <div className="text-4xl font-bold text-shimmer mb-2 group-hover:scale-110 transition-transform" style={{ animationDelay: '0.5s' }}>Local</div>
                  <p className="text-sm text-gray-600 font-medium">Community Focus</p>
                </div>
                <div className="text-center group cursor-default">
                  <div className="text-4xl font-bold text-shimmer mb-2 group-hover:scale-110 transition-transform" style={{ animationDelay: '1s' }}>Pure</div>
                  <p className="text-sm text-gray-600 font-medium">Traditional Methods</p>
                </div>
                <div className="text-center group cursor-default">
                  <div className="text-4xl font-bold text-shimmer mb-2 group-hover:scale-110 transition-transform" style={{ animationDelay: '1.5s' }}>Natural</div>
                  <p className="text-sm text-gray-600 font-medium">Sustainable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

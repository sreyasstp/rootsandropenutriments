import { Heart, Users, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

export function WomenInitiative() {
  const { ref, isVisible } = useScrollAnimation();
  const parallaxRef = useRef<HTMLElement>(null);
  const offset = useParallax(parallaxRef, 0.5);

  return (
    <section ref={(node) => {
      ref.current = node;
      parallaxRef.current = node;
    }} className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Woman empowerment background"
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${offset}px)` }}
        />

        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f2ecdc]/70 via-[#faf8f2]/60 to-white/70"></div>

        {/* Subtle brand tint */}
        <div className="absolute inset-0 bg-[#004606]/3"></div>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#004606]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#004606]/5 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <img
            src="/women_init.png"
            alt="Woman Initiative"
            className="h-48 w-auto mx-auto mb-6"
            title="Proudly a Woman Initiative"
          />
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Empowered by Woman
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A woman-led initiative bringing passion, tradition, and nature&apos;s finest to your family.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Heart,
              title: 'Made with Love',
              text:
                'Every product crafted with care and attention to quality.',
              delay: '0.1s'
            },
            {
              icon: Users,
              title: 'Community Impact',
              text:
                'Supporting local woman farmers and artisans while preserving traditional knowledge.',
              delay: '0.2s'
            },
            {
              icon: Sparkles,
              title: 'Inspiring Change',
              text:
                'Woman-led business thriving with authenticity and sustainability.',
              delay: '0.3s'
            }
          ].map(({ icon: Icon, title, text, delay }) => (
            <div
              key={title}
              className={`glass rounded-3xl p-8 hover-lift border border-white/40 transition-all duration-500 ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: delay }}
            >
              <div className="bg-gradient-to-br from-[#004606] to-[#006609] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg animate-glow">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#004606] mb-4 text-center">
                {title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Commitment section */}
        <div
          className={`mt-16 glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 hover-lift ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.5s' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#004606] mb-4">
                Our Commitment
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We foster economic independence, preserve traditional wisdom, and create opportunities for woman at every step.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From farm to doorstep, woman are at the heart of everything we do.
              </p>
            </div>

            <div className="glass-dark rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-lg">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {[
                  ['100%', 'Woman-Led'],
                  ['Local', 'Community Focus'],
                  ['Pure', 'Traditional Methods'],
                  ['Natural', 'Sustainable']
                ].map(([value, label], i) => (
                  <div key={label} className="text-center group cursor-default">
                    <div
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-shimmer mb-1 sm:mb-2 group-hover:scale-110 transition-transform"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      {value}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

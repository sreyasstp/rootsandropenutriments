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
            Roots & Rope Nutriment is proudly a woman-led initiative, bringing together passion,
            tradition, and dedication to deliver nature&apos;s finest products to your family.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Heart,
              title: 'Made with Love',
              text:
                'Every product is crafted with care and attention to detail, reflecting the nurturing spirit of woman entrepreneurs committed to quality and excellence.',
              delay: '0.1s'
            },
            {
              icon: Users,
              title: 'Community Impact',
              text:
                'Supporting local woman farmers and artisans, we create a sustainable ecosystem that empowers communities and preserves traditional knowledge.',
              delay: '0.2s'
            },
            {
              icon: Sparkles,
              title: 'Inspiring Change',
              text:
                'Breaking barriers and setting new standards, we show that woman-led businesses can thrive while staying true to authenticity and sustainability.',
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
                As a woman-led initiative, we&apos;re committed to fostering economic independence,
                preserving traditional wisdom, and creating opportunities for woman at every step
                of our supply chain.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From farmers who grow our ingredients to the team that delivers them to your
                doorstep, woman are at the heart of everything we do—building a future rooted in
                care, quality, and empowerment.
              </p>
            </div>

            <div className="glass-dark rounded-2xl p-8 backdrop-blur-lg">
              <div className="grid grid-cols-2 gap-6">
                {[
                  ['100%', 'Woman-Led'],
                  ['Local', 'Community Focus'],
                  ['Pure', 'Traditional Methods'],
                  ['Natural', 'Sustainable']
                ].map(([value, label], i) => (
                  <div key={label} className="text-center group cursor-default">
                    <div
                      className="text-4xl font-bold text-shimmer mb-2 group-hover:scale-110 transition-transform"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      {value}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{label}</p>
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

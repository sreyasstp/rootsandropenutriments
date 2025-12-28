import { Sprout, Package, Leaf, Award, Users, Shield } from 'lucide-react';
import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

const features = [
  {
    icon: Sprout,
    title: 'Own Farm & Factory',
    description: 'We manufacture everything at our Kerala facility - complete control over quality'
  },
  {
    icon: Package,
    title: 'Traditional Manufacturing',
    description: 'Authentic Kerala processing methods passed down through generations'
  },
  {
    icon: Leaf,
    title: 'Zero Chemicals',
    description: 'We manufacture without pesticides, preservatives, or artificial additives'
  },
  {
    icon: Award,
    title: 'FSSAI Certified Manufacturer',
    description: 'Licensed and certified manufacturing unit meeting all safety standards'
  },
  {
    icon: Users,
    title: 'Direct Sales - Best Prices',
    description: 'Buy directly from manufacturer without middlemen markup'
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Every batch tested and packaged at our facility - money-back guarantee'
  }
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const offset = useParallax(sectionRef, 0.6);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Natural spices background"
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${offset}px)` }}
        />
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Why Buy from Roots & Rope
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            When you purchase from us, you get authentic Kerala products directly from the manufacturer
          </p>
          <div className="inline-flex items-center gap-2 bg-[#004606]/10 px-6 py-3 rounded-full">
            <span className="text-[#004606] font-bold text-sm">Manufacturer & Direct Seller Since 2020</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-[#f2ecdc]/30 rounded-xl p-8 hover:bg-[#f2ecdc] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="bg-[#004606] w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#004606] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

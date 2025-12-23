import { Sprout, Package, Leaf, Award, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: Sprout,
    title: 'Farm Fresh',
    description: 'Sourced directly from local farms ensuring freshness and quality'
  },
  {
    icon: Package,
    title: 'Traditional Processing',
    description: 'Authentic methods preserving natural flavor and nutritional value'
  },
  {
    icon: Leaf,
    title: 'Chemical Free',
    description: 'Grown without pesticides or synthetic fertilizers for pure natural products'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'FSSAI certified products meeting the highest quality standards'
  },
  {
    icon: Users,
    title: 'Family Safe',
    description: 'Suitable for all ages from babies to elderly family members'
  },
  {
    icon: Shield,
    title: 'No Preservatives',
    description: 'Pure and natural without any artificial additives or chemicals'
  }
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to bringing you the finest natural products with uncompromising quality and care
          </p>
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

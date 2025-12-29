import { TreePine, Sprout, Home } from 'lucide-react';
import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const offset = useParallax(sectionRef, 0.5);

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
              Manufacturers of Premium Natural Products
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <strong>Roots & Rope Nutriment</strong> is a trusted manufacturer and direct seller of 100% natural, preservative-free food products from Kerala, India. We grow, process, and package every product at our own facilities, ensuring complete quality control from farm to your family.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              As manufacturers, we eliminate middlemen and offer you authentic Kerala products at factory-direct prices. Our traditional processing methods preserve the natural goodness while our modern facilities ensure hygiene and safety standards. When you buy from us, you buy directly from the source.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#004606] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#004606] mb-2">Own Manufacturing Unit</h3>
                  <p className="text-gray-600">Complete control over quality from cultivation to packaging</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#004606] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#004606] mb-2">Traditional Manufacturing</h3>
                  <p className="text-gray-600">Time-tested Kerala methods for authentic quality</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#004606] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#004606] mb-2">Direct from Factory</h3>
                  <p className="text-gray-600">No middlemen - buy fresh products at best prices</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
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

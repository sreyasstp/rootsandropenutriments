import { TreePine, Sprout, Home, Award } from 'lucide-react';
import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const offset = useParallax(sectionRef, 0.5);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-20">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Organic farming background"
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${offset}px)` }}
        />
        <div className="absolute inset-0 bg-white/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-6">
              Our Story
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Roots & Rope Nutriment, we believe in the power of nature’s simplicity.
              Our story is rooted in over <strong>75 years of family heritage in agriculture</strong>,
              shaped by generations who worked the land with care, patience, and deep respect for nature.
            </p>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our father, <strong>C. R. Bhavadas</strong>, carried this legacy forward through his
              lifelong dedication to agriculture and sustainable farming practices.
              His exceptional contribution was recognized by the Kerala State Government
              with the prestigious <strong>Kerakesari Award</strong>, honoring him as one of the
              best coconut farmers in the state.
            </p>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Inspired by this proud legacy, Roots & Rope Nutriment was born with a simple yet
              powerful mission: to bring pure, unadulterated natural products from the farm
              directly to your family’s table.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Roots & Rope, we don’t just create natural products — we carry forward a
              legacy of agricultural excellence built over generations.
            </p>

            {/* VALUES */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#004606] w-12 h-12 rounded-lg flex items-center justify-center">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#004606] mb-1">
                    Sustainably Sourced
                  </h3>
                  <p className="text-gray-600">
                    From responsible farms that respect nature
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#004606] w-12 h-12 rounded-lg flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#004606] mb-1">
                    Naturally Processed
                  </h3>
                  <p className="text-gray-600">
                    Traditional methods that preserve nutrition
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#004606] w-12 h-12 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#004606] mb-1">
                    Family First
                  </h3>
                  <p className="text-gray-600">
                    Products we trust for our own families
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white rounded-2xl p-10 shadow-2xl">
                <div className="grid grid-cols-3 gap-8 text-center mb-8">
                  <div>
                    <div className="text-4xl font-bold text-[#004606] mb-1">75+</div>
                    <p className="text-sm text-gray-600">Years of Legacy</p>
                  </div>

                  <div>
                    <div className="text-4xl font-bold text-[#004606] mb-1">21+</div>
                    <p className="text-sm text-gray-600">Natural Products</p>
                  </div>

                  <div>
                    <Award className="w-9 h-9 mx-auto text-[#004606] mb-1" />
                    <p className="text-sm text-gray-600">Kerakesari Award</p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="h-px bg-gray-200 mb-8" />

                {/* SECOND ROW */}
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#004606] mb-1">100%</div>
                    <p className="text-sm text-gray-600">Natural</p>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-[#004606] mb-1">0</div>
                    <p className="text-sm text-gray-600">Additives</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK SHAPE */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#004606]/10 rounded-2xl -z-0" />
          </div>

        </div>
      </div>
    </section>
  );
}

import { Heart, Users, Sparkles } from 'lucide-react';

export function WomenInitiative() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#f2ecdc] to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#004606]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#004606]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <img
            src="/women_init.png"
            alt="A Woman Initiative"
            className="h-32 w-auto mx-auto mb-6"
            title="Proudly a Women's Initiative"
          />
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Empowered by Women
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Roots & Rope Nutriment is proudly a women-led initiative, bringing together passion,
            tradition, and dedication to deliver nature's finest products to your family.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#004606] mb-4 text-center">
              Made with Love
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Every product is crafted with care and attention to detail, reflecting the nurturing spirit
              and dedication of women entrepreneurs committed to quality and excellence.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#004606] mb-4 text-center">
              Community Impact
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Supporting local women farmers and artisans, we create a sustainable ecosystem that
              empowers communities and preserves traditional knowledge for future generations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#004606] mb-4 text-center">
              Inspiring Change
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Breaking barriers and setting new standards, we demonstrate that women-led businesses
              can thrive while staying true to values of authenticity, health, and sustainability.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#004606] mb-4">
                Our Commitment
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                As a women's initiative, we're committed to fostering economic independence,
                preserving traditional wisdom, and creating opportunities for women in every
                step of our supply chain.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From the farmers who grow our ingredients to the team that brings these products
                to your doorstep, women are at the heart of everything we do. Together, we're
                building a future where quality, care, and empowerment go hand in hand.
              </p>
            </div>
            <div className="bg-[#f2ecdc] rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#004606] mb-2">100%</div>
                  <p className="text-sm text-gray-600">Women-Led</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#004606] mb-2">Local</div>
                  <p className="text-sm text-gray-600">Community Focus</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#004606] mb-2">Pure</div>
                  <p className="text-sm text-gray-600">Traditional Methods</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#004606] mb-2">Natural</div>
                  <p className="text-sm text-gray-600">Sustainable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

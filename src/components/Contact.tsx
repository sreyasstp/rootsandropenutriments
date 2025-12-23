import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-20 bg-[#f2ecdc]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our products? We'd love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#004606] mb-3">Phone</h3>
            <a href="tel:+918606441950" className="text-gray-600 hover:text-[#004606] transition-colors">
              +91 8606441950
            </a>
          </div>

          <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#004606] mb-3">Email</h3>
            <a href="mailto:info@rootsandrope.com" className="text-gray-600 hover:text-[#004606] transition-colors break-all">
              info@rootsandrope.com
            </a>
          </div>

          <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#004606] mb-3">Location</h3>
            <p className="text-gray-600">
              Vandazhy, Palakkad<br />Kerala, 678706
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

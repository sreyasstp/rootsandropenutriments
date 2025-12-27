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

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#004606] mb-3">Phone</h3>
            <a href="tel:+918606441950" className="text-gray-600 hover:text-[#004606] transition-colors">
              +91 8606441950
            </a>
            <a href="tel:+917012426181" className="text-gray-600 hover:text-[#004606] transition-colors">
              +91 7012426181
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

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.500373035378!2d76.51964316955814!3d10.579055417657077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba809ff1a573399%3A0x5a8c4b26cfe0e06b!2sROOTS%20AND%20ROPE%20NUTRIMENT!5e0!3m2!1sen!2sin!4v1766857982738!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] sm:h-[400px] md:h-[450px]"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=10.579055417657077,76.51964316955814"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#004606] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005708] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

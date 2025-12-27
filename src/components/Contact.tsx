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
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d245.12506308687892!2d76.52015477151062!3d10.5790931782253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDM0JzQ0LjEiTiA3NsKwMzEnMTMuMyJF!5e0!3m2!1sen!2sin!4v1766857598815!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

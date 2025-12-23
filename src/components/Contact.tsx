import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export function Contact() {
  const whatsappNumber = '919961704444';
  const whatsappMessage = 'Hello! I would like to know more about your products.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#004606] to-[#005708] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#004606] mb-3">Phone</h3>
              <a href="tel:+919961704444" className="text-gray-600 hover:text-[#004606] transition-colors text-lg font-medium">
                +91 9961704444
              </a>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#004606] mb-3">Email</h3>
              <a href="mailto:info@rootsandrope.com" className="text-gray-600 hover:text-[#004606] transition-colors break-all">
                info@rootsandrope.com
              </a>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="bg-[#004606] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#004606] mb-3">Location</h3>
              <p className="text-gray-600">
                Vandazhy, Palakkad<br />Kerala, 678706
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl p-8 mb-16 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Chat with us on WhatsApp</h2>
              <p className="text-white/90 text-lg mb-6">
                Get instant responses to your queries. We're here to help!
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#25D366] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Start WhatsApp Chat
              </a>
            </div>
          </div>

          <div className="bg-[#f2ecdc]/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-[#004606] mb-6 text-center">Visit Our Store</h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d434.58678010920846!2d76.52032096033052!3d10.57870446845084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDM0JzQ0LjEiTiA3NsKwMzEnMTMuMyJF!5e0!3m2!1sen!2sin!4v1766463252130!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-lg mb-2">
                <span className="font-semibold text-[#004606]">Address:</span> Vandazhy, Palakkad, Kerala 678706
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-[#004606]">Coordinates:</span> 10°34'44.1"N 76°31'13.3"E
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2ecdc]/30 via-white to-[#f2ecdc]/20 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#004606] mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our products? We'd love to hear from you.
            Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="bg-gradient-to-br from-[#004606] to-[#005708] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#004606] mb-4">Phone</h3>
            <div className="space-y-2">
              <a
                href="tel:+918606441950"
                className="block text-lg text-gray-600 hover:text-[#004606] transition-colors font-medium"
              >
                +91 8606441950
              </a>
              <a
                href="tel:+917012426181"
                className="block text-lg text-gray-600 hover:text-[#004606] transition-colors font-medium"
              >
                +91 7012426181
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="bg-gradient-to-br from-[#004606] to-[#005708] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#004606] mb-4">Email</h3>
            <a
              href="mailto:info@rootsandrope.com"
              className="text-lg text-gray-600 hover:text-[#004606] transition-colors font-medium break-all"
            >
              info@rootsandrope.com
            </a>
          </div>

          <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="bg-gradient-to-br from-[#004606] to-[#005708] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#004606] mb-4">Location</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Vandazhy, Palakkad<br />Kerala, 678706
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
          <div className="mt-6 text-center">
          <a
            href="https://www.google.com/maps/dir//ROOTS+AND+ROPE+NUTRIMENT+8%2F80+Vandazhi,+Kerala+678706/@10.5790541,76.5202869,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba809ff1a573399:0x5a8c4b26cfe0e06b!2m2!1d76.5202869!2d10.5790541!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#004606] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005708] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h3 className="text-3xl font-bold text-[#004606] mb-6 text-center">
            Send Us a Message
          </h3>
          <p className="text-center text-gray-600 mb-8">
            For inquiries, please contact us via phone, email, or WhatsApp
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918606441950"
              className="inline-flex items-center justify-center gap-2 bg-[#004606] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#005708] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
            <a
              href="mailto:info@rootsandrope.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#004606] border-2 border-[#004606] px-8 py-4 rounded-xl font-semibold hover:bg-[#004606] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

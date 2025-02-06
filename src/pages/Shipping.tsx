import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Separator } from '../components/Separator';

export function Shipping() {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1584836717895-04117d6f30d1)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            SHIPPING <span className="text-[#FF4655]">POLICY</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-12">
          <section>
            <Separator />
            <div className="space-y-4 text-white/70">
              <p className="leading-relaxed">
                This Shipping Policy outlines how ATHARV PARAG CHORDIYA handles the delivery of digital products and services.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Digital Delivery</h3>
              <p className="leading-relaxed">
                - All tournament registrations and team verifications are delivered instantly upon successful payment
                - Access to tournament brackets and team management features is granted immediately
                - No physical shipping is involved in our services
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Processing Time</h3>
              <p className="leading-relaxed">
                - Team verification requests are processed within 24 hours
                - Tournament registrations are confirmed immediately
                - Support tickets are addressed within 1 business day
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Service Availability</h3>
              <p className="leading-relaxed">
                - Our platform is available 24/7 for team management
                - Tournament schedules are announced at least 1 week in advance
                - Technical support is available during business hours
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Delivery Issues</h3>
              <p className="leading-relaxed">
                In case of any issues with digital delivery:
                - Contact our support team immediately
                - Provide your transaction ID and account details
                - Issues are typically resolved within 24 hours
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Contact Information</h3>
              <p className="leading-relaxed">
                For shipping and delivery related queries:
                - Email: support@ascendancy.com
                - Discord: Join our support server
                - Response time: Within 24 hours
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/50 text-sm">
            Last updated: Feb 5 2025
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
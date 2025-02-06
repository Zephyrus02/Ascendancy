import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Separator } from '../components/Separator';

export function Privacy() {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1552820728-8b83bb6b773f)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            PRIVACY <span className="text-[#FF4655]">POLICY</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-12">
          <section>
            <Separator />
            <div className="space-y-4 text-white/70">
              <p className="leading-relaxed">
                This Privacy Policy outlines how ATHARV PARAG CHORDIYA ("we", "us", "our") collects, uses, and protects your personal information.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Information We Collect</h3>
              <p className="leading-relaxed">
                We collect information you provide directly to us, including:
                - Name, email address, and contact information
                - Payment information (processed securely through Razorpay)
                - Team and player information for tournament participation
                - Communication preferences
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">How We Use Your Information</h3>
              <p className="leading-relaxed">
                - To provide and maintain our services
                - To process your transactions
                - To communicate with you about tournaments and updates
                - To improve our services and user experience
                - To comply with legal obligations
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Data Security</h3>
              <p className="leading-relaxed">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Third-Party Services</h3>
              <p className="leading-relaxed">
                We use trusted third-party services for:
                - Payment processing (Razorpay)
                - Authentication (Clerk)
                - Analytics
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Your Rights</h3>
              <p className="leading-relaxed">
                You have the right to:
                - Access your personal data
                - Request correction or deletion of your data
                - Object to processing of your data
                - Request data portability
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Contact Us</h3>
              <p className="leading-relaxed">
                For privacy-related inquiries, contact us at privacy@ascendancy.com
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
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Separator } from '../components/Separator';


export function Refund() {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            CANCELLATION & <span className="text-[#FF4655]">REFUND</span> POLICY
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <section className="space-y-4 text-white/70">
            <Separator />
            <p className="leading-relaxed">
              Ascendancy values transparency and fairness in its refund policy for tournament registrations and team verifications. Under this policy:
            </p>
            <p className="leading-relaxed">
              Cancellations will be considered only if the request is made within 24 hours of team registration or verification payment. However, cancellation requests may not be entertained if the tournament scheduling process has already begun.
            </p>
            <p className="leading-relaxed">
              Ascendancy does not accept cancellation requests once the tournament has commenced. However, refunds can be issued if technical issues on our end prevented team participation.
            </p>
            <p className="leading-relaxed">
              In case of payment processing issues or failed transactions, please report them immediately to our Support team. The request will be reviewed and resolved within 24 hours of receiving the complaint.
            </p>
            <p className="leading-relaxed">
              If tournament schedules or formats are significantly modified after registration, teams may request refunds within 24 hours of the announcement. Our Support team will review each case individually.
            </p>
            <p className="leading-relaxed">
              For technical issues during tournaments that result in match disruptions, compensation will be determined by our tournament administrators.
            </p>
            <p className="leading-relaxed">
              All approved refunds will be processed within 1-2 business days and credited back to the original payment method.
            </p>
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
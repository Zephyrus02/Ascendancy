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
              ATHARV PARAG CHORDIYA believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
            </p>
            <p className="leading-relaxed">
              Cancellations will be considered only if the request is made within same day of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants.
            </p>
            <p className="leading-relaxed">
              ATHARV PARAG CHORDIYA does not accept cancellation requests for perishable items. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
            </p>
            <p className="leading-relaxed">
              In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within same day of receipt of the products.
            </p>
            <p className="leading-relaxed">
              In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within same day of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
            </p>
            <p className="leading-relaxed">
              In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
            </p>
            <p className="leading-relaxed">
              In case of any Refunds approved by ATHARV PARAG CHORDIYA, it'll take 1-2 days for the refund to be processed to the end customer.
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
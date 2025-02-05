import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Separator } from '../components/Separator';

export function TNC() {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1538481199705-c710c4e965fc)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            TERMS & <span className="text-[#FF4655]">CONDITIONS</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-12">
          <section>
            <Separator />
            <div className="space-y-4 text-white/70">
              <p className="leading-relaxed">
                For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean ATHARV PARAG CHORDIYA, whose registered/operational office is Kalash,Borse Nagar,Satana Naka,Malegaon Nashik MAHARASHTRA 423203 . "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
              </p>
              <p className="leading-relaxed">
                Your use of the website and/or purchase from us are governed by following Terms and Conditions:
              </p>
              <p className="leading-relaxed">
                The content of the pages of this website is subject to change without notice.
              </p>
              <p className="leading-relaxed">
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
              </p>
              <p className="leading-relaxed">
                Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.
              </p>
              <p className="leading-relaxed">
                Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
              </p>
              <p className="leading-relaxed">
                All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.
              </p>
              <p className="leading-relaxed">
                Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
              </p>
              <p className="leading-relaxed">
                From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.
              </p>
              <p className="leading-relaxed">
                You may not create a link to our website from another website or document without ATHARV PARAG CHORDIYA's prior written consent.
              </p>
              <p className="leading-relaxed">
                Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.
              </p>
              <p className="leading-relaxed">
                We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time
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
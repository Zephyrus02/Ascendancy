import { RulesSection } from '../components/learn/RulesSection';
import { Timeline } from '../components/learn/Timeline';
import { PrizePool } from '../components/learn/PrizePool';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Separator } from '../components/Separator';

export function LearnMore() {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            TOURNAMENT <span className="text-[#FF4655]">DETAILS</span>
          </h1>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
        {/* Rules Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            TOURNAMENT <span className="text-[#FF4655]">RULES</span>
          </h2>
          <Separator />
          <RulesSection />
        </section>

        {/* Timeline Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            EVENT <span className="text-[#FF4655]">SCHEDULE</span>
          </h2>
          <Separator />
          <Timeline />
        </section>

        {/* Prize Pool Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            PRIZE <span className="text-[#FF4655]">POOL</span>
          </h2>
          <Separator />
          <PrizePool />
        </section>
      </div>
        <Footer />
    </div>
  );
}
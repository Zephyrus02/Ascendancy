import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Separator } from '../components/Separator';

export function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            COMING <span className="text-[#FF4655]">SOON</span>
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          SOMETHING EPIC IS <span className="text-[#FF4655]">BREWING</span>
        </h2>
        
        <Separator />
        
        <p className="text-white/70 text-lg leading-relaxed mb-12">
          We're working hard to bring you something amazing. This section will be available soon. 
          Stay tuned for updates and get ready for an incredible experience!
        </p>

        <a 
          href="/"
          className="relative px-12 py-4 bg-[#FF4655] transform skew-x-[-20deg] 
                    overflow-hidden transition-all duration-300 
                    hover:bg-[#ff5e6b] hover:scale-105 inline-block"
        >
          <span className="relative z-20 block text-white font-medium text-lg 
                          tracking-wider transform skew-x-[20deg]">
            RETURN HOME
          </span>
        </a>
      </div>

      <Footer />
    </div>
  );
}
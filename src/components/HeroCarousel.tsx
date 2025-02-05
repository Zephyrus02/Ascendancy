import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
    title: 'REPEL THE INVADERS!'
  },
  {
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
    title: 'JOIN THE BATTLE!'
  },
  {
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
    title: 'LEVEL UP YOUR GAME!'
  }
];

export function HeroCarousel() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePlayClick = () => {
    if (isSignedIn) {
      navigate('/profile');
    }
  };

  return (
    <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 gap-8">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-wider text-center">
                {slide.title}
              </h1>
              <div className="flex items-center gap-4">
                {isSignedIn ? (
                  <button 
                    onClick={handlePlayClick}
                    className="relative px-12 py-4 bg-[#FF4655] transform skew-x-[-20deg] 
                             overflow-hidden transition-all duration-300 
                             hover:bg-[#ff5e6b] hover:scale-105"
                  >
                    <span 
                      className="relative z-20 block text-white font-medium text-lg 
                               tracking-wider transform skew-x-[20deg]"
                    >
                      PLAY NOW
                    </span>
                    
                    {/* Shine effect */}
                    <div 
                      className="absolute inset-0 z-10 w-full h-full 
                               bg-gradient-to-r from-transparent via-white/20 to-transparent
                               skew-x-[-20deg] animate-shine"
                    />
                    
                    {/* Hover gradient */}
                    <div 
                      className="absolute inset-0 z-0 w-full h-full opacity-0
                               bg-gradient-to-r from-[#ff5e6b] via-[#ff8b94] to-[#ff5e6b]
                               group-hover:opacity-100 -translate-x-full 
                               group-hover:translate-x-0 transition-all duration-500"
                    />
                  </button>
                ) : (
                  <SignInButton mode="modal">
                    <button 
                      className="relative px-12 py-4 bg-[#FF4655] transform skew-x-[-20deg] 
                               overflow-hidden transition-all duration-300 
                               hover:bg-[#ff5e6b] hover:scale-105"
                    >
                      <span 
                        className="relative z-20 block text-white font-medium text-lg 
                                 tracking-wider transform skew-x-[20deg]"
                      >
                        PLAY NOW
                      </span>
                      
                      {/* Shine effect */}
                      <div 
                        className="absolute inset-0 z-10 w-full h-full 
                                 bg-gradient-to-r from-transparent via-white/20 to-transparent
                                 skew-x-[-20deg] animate-shine"
                      />
                      
                      {/* Hover gradient */}
                      <div 
                        className="absolute inset-0 z-0 w-full h-full opacity-0
                                 bg-gradient-to-r from-[#ff5e6b] via-[#ff8b94] to-[#ff5e6b]
                                 group-hover:opacity-100 -translate-x-full 
                                 group-hover:translate-x-0 transition-all duration-500"
                      />
                    </button>
                  </SignInButton>
                )}

                <a 
                  href="/learn-more"
                  className="relative px-12 py-4 bg-transparent border-2 border-white transform skew-x-[-20deg] 
                            overflow-hidden transition-all duration-300 
                            hover:border-[#FF4655] hover:scale-105"
                >
                  <span className="relative z-20 block text-white font-medium text-lg 
                                  tracking-wider transform skew-x-[20deg]">
                    LEARN MORE
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transform transition-all duration-300 ease-out
              ${currentSlide === index 
                ? 'w-8 bg-[#FF4655] shadow-[0_0_10px_rgba(255,70,85,0.5)]' 
                : 'w-4 bg-white/30 hover:bg-white/50 hover:w-6'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

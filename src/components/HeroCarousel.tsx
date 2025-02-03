import { useState, useEffect } from 'react';

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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
              <div className="relative group">
                <button className="relative px-12 py-4 bg-red-600 transform skew-x-[-20deg] overflow-hidden transition-all duration-300">
                  <span className="relative z-10 block text-white font-medium text-lg tracking-wider transform skew-x-[20deg]">
                    PLAY NOW
                  </span>
                  <div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 via-gray-100 to-red-500 opacity-0 
                    group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 transition-all duration-500"
                  />
                </button>
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
            className={`h-1 transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-red-500' : 'w-4 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        scroll: 'scroll 25s linear infinite',
        shimmer: 'shimmer 2s infinite'
      }
    },
  },
  plugins: [],
};



const clientLogos = [
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-1.png', alt: 'Client 1' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-2.png', alt: 'Client 2' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-3.png', alt: 'Client 3' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-4.png', alt: 'Client 4' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-5.png', alt: 'Client 5' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-6.png', alt: 'Client 6' }
];

export function IconsBar() {
  return (
    <div className="bg-[#1a1a1a] py-4 sm:py-6 md:py-8">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
        {/* Scrollable container for mobile */}
        <div className="relative">
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center
                        overflow-x-auto scrollbar-hide pb-4 md:pb-0">
            {clientLogos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="shrink-0 w-[150px] sm:w-[180px] md:w-auto 
                         transition-all duration-300 hover:scale-110"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain 
                           filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          
          {/* Gradient fade for scroll indication */}
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#1a1a1a] md:hidden" />
        </div>
      </div>
    </div>
  );
}
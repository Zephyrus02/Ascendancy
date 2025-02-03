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
    <div className="bg-[#1a1a1a] py-6 md:py-8">
      <div className="max-w-[90rem] mx-auto px-8 md:px-16">
        <div className="flex justify-between items-center">
          {clientLogos.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="shrink-0 transition-all duration-300 hover:scale-110"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 md:h-24 w-auto object-contain filter grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
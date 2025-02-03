const announcements = [
  {
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    category: "TOURNAMENT",
    date: "MARCH 15, 2024",
    title: "Spring Championship Series Announced",
    description: "Register now for the biggest Valorant tournament of the season with a prize pool of $10,000."
  },
  {
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    category: "UPDATE",
    date: "MARCH 12, 2024",
    title: "New Map Preview: Nebula",
    description: "Get ready for an all-new battleground featuring dynamic elements and vertical gameplay."
  },
  {
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc",
    category: "COMMUNITY",
    date: "MARCH 10, 2024",
    title: "Pro Player Workshop Series",
    description: "Learn from the best in our exclusive workshop series featuring top professional players."
  }
];

export function Announcements() {
  return (
    <div className="w-full bg-[#111]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {announcements.map((item, index) => (
          <article 
            key={index} 
            className="relative h-[400px] group overflow-hidden 
                       transition-transform duration-500 ease-out
                       hover:z-10 hover:scale-105"
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover
                         transition-transform duration-700 ease-out
                         group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent
                          transition-all duration-500 ease-in-out
                          group-hover:from-black/95 group-hover:via-black/90 group-hover:to-black/80
                          group-hover:shadow-[inset_0_0_30px_rgba(255,70,85,0.3)]">
              <div className="absolute inset-0 p-8 flex flex-col justify-end
                            transform transition-all duration-500
                            group-hover:translate-y-0 group-hover:justify-center">
                <div className="space-y-4">
                  <span className="inline-block px-4 py-1 bg-[#FF4655] text-white text-sm font-semibold
                                 transform transition-all duration-300 ease-out
                                 opacity-90 group-hover:opacity-100 
                                 group-hover:translate-x-2">
                    {item.category}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white
                                transform transition-all duration-500 delay-75
                                group-hover:translate-x-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm
                               transform transition-all duration-500 delay-100
                               group-hover:translate-x-2">
                    {item.date}
                  </p>
                  
                  <p className="text-white/80 mt-4 
                               opacity-0 transform translate-y-8 
                               transition-all duration-500 delay-150
                               group-hover:opacity-100 group-hover:translate-y-0">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
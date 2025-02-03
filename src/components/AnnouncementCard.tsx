import { Announcement } from '../types/Announcement';

interface Props {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: Props) {
  return (
    <article 
      className="relative h-[400px] group overflow-hidden 
                 transition-transform duration-500 ease-out
                 hover:z-10 hover:scale-105"
    >
      <img 
        src={announcement.image} 
        alt={announcement.title}
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
              {announcement.category}
            </span>
            
            <h3 className="text-2xl font-bold text-white
                          transform transition-all duration-500 delay-75
                          group-hover:translate-x-2">
              {announcement.title}
            </h3>
            
            <p className="text-white/60 text-sm
                         transform transition-all duration-500 delay-100
                         group-hover:translate-x-2">
              {announcement.date}
            </p>
            
            <p className="text-white/80 mt-4 
                         opacity-0 transform translate-y-8 
                         transition-all duration-500 delay-150
                         group-hover:opacity-100 group-hover:translate-y-0">
              {announcement.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
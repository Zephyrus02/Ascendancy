import { AnnouncementCard } from './AnnouncementCard';
import { announcements } from '../data/Announcement';

export function Announcements() {
  return (
    <div className="w-full bg-[#111]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {announcements.map((announcement, index) => (
          <AnnouncementCard 
            key={index} 
            announcement={announcement}
          />
        ))}
      </div>
    </div>
  );
}
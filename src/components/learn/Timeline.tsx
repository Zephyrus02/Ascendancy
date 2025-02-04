export function Timeline() {
  const events = [
    {
      date: "FEBRUARY 15",
      title: "REGISTRATION OPENS",
      description: "Team registration begins. Limited slots available."
    },
    {
      date: "APRIL 5",
      title: "QUALIFIERS",
      description: "Online qualifiers begin. Top 16 teams advance."
    },
    {
      date: "APRIL 15",
      title: "GROUP STAGE",
      description: "Teams divided into 4 groups. Top 2 from each advance."
    },
    {
      date: "APRIL 25",
      title: "PLAYOFFS",
      description: "Single elimination bracket. Best of 5 matches."
    },
    {
      date: "MAY 1",
      title: "GRAND FINALS",
      description: "Live event. Best of 5 championship match."
    }
  ];

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#FF4655]/20" />
      
      <div className="space-y-12">
        {events.map((event, index) => (
          <div key={index} className="relative pl-12">
            <div className="absolute left-0 w-8 h-8 bg-[#1a1a1a] border-2 border-[#FF4655] rounded-full
                          flex items-center justify-center transform -translate-x-1/2" />
            
            <div className="bg-[#1a1a1a] p-6 transform transition-all duration-300
                          hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]">
              <span className="text-[#FF4655] text-sm font-medium">{event.date}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{event.title}</h3>
              <p className="text-white/70">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
interface TeamHeroProps {
  teamName?: string;
}

export function TeamHero({ teamName }: TeamHeroProps) {
  return (
    <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
         style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {teamName ? (
            <>TEAM <span className="text-[#FF4655]">{teamName}</span></>
          ) : (
            <>VALORANT <span className="text-[#FF4655]">TEAM PROFILE</span></>
          )}
        </h1>
      </div>
    </div>
  );
}
import { useState } from 'react';

type MatchStatus = 'upcoming' | 'live' | 'completed';
type TabType = 'all' | 'upcoming' | 'results';

interface Team {
  name: string;
  logo: string;
  score?: number;
}

interface Match {
  id: number;
  status: MatchStatus;
  team1: Team;
  team2: Team;
  tournament: string;
  time: string;
  date: string;
}

const matches: Match[] = [
  {
    id: 1,
    status: 'live',
    team1: {
      name: 'SENTINELS',
      logo: 'https://liquipedia.net/commons/images/3/37/Sentinels_full_lightmode.png',
      score: 7
    },
    team2: {
      name: 'CLOUD9',
      logo: 'https://liquipedia.net/commons/images/8/8f/Cloud9_full_lightmode.png',
      score: 5
    },
    tournament: 'VCT Americas',
    time: 'LIVE',
    date: 'Map 2'
  },
  {
    id: 2,
    status: 'upcoming',
    team1: {
      name: 'FNATIC',
      logo: 'https://liquipedia.net/commons/images/f/fd/Fnatic_full_lightmode.png'
    },
    team2: {
      name: 'LOUD',
      logo: 'https://liquipedia.net/commons/images/f/f1/LOUD_full_lightmode.png'
    },
    tournament: 'VCT LOCK//IN',
    time: '18:00',
    date: 'March 20'
  },
  {
    id: 3,
    status: 'completed',
    team1: {
      name: '100 THIEVES',
      logo: 'https://liquipedia.net/commons/images/1/10/100_Thieves_full_lightmode.png',
      score: 13
    },
    team2: {
      name: 'NRG',
      logo: 'https://liquipedia.net/commons/images/0/00/NRG_full_lightmode.png',
      score: 11
    },
    tournament: 'VCT Americas',
    time: 'FINAL',
    date: 'Map 3'
  }
];

export function Trending() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredMatches = matches.filter(match => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return match.status === 'upcoming';
    if (activeTab === 'results') return match.status === 'completed';
    return true;
  });

  return (
    <div className="bg-[#111] py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            TRENDING <span className="text-[#FF4655]">MATCHES</span>
          </h2>
          
          {/* Custom Separator */}
          <div className="flex justify-center mb-8">
            <svg 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg" 
              width="124.985px" 
              height="3.411px" 
              viewBox="0 0 124.985 3.411"
              className="w-32"
            >
              <polygon 
                fill="#FFFFFF" 
                points="0,0 124.985,0 124.985,1.121 96.484,1.121 86.944,3.411 38.67,3.411 29.162,1.121 0,1.121"
              />
            </svg>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-12">
            {(['all', 'upcoming', 'results'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3 transform skew-x-[-20deg] overflow-hidden transition-all duration-300
                  ${activeTab === tab ? 'bg-red-600' : 'bg-[#1a1a1a]'}`}
              >
                <span className="relative z-10 text-white font-medium transform skew-x-[20deg] block uppercase">
                  {tab}
                </span>
                <div 
                  className={`absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 via-gray-100 to-red-500 
                  ${activeTab === tab ? 'opacity-0' : 'opacity-0 hover:opacity-100'} 
                  -translate-x-full hover:translate-x-0 transition-all duration-500`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid gap-6">
          {filteredMatches.map((match) => (
            <div 
              key={match.id}
              className="relative group bg-[#1a1a1a] p-6 transform transition-all duration-300 hover:scale-[1.02]
                         hover:shadow-[0_0_20px_rgba(255,70,85,0.15)] cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8 flex-1">
                  {/* Team 1 */}
                  <div className="flex items-center space-x-4 flex-1">
                    <img src={match.team1.logo} alt={match.team1.name} className="w-12 h-12 object-contain" />
                    <span className="text-white font-medium">{match.team1.name}</span>
                    {match.team1.score !== undefined && (
                      <span className="text-2xl font-bold text-white">{match.team1.score}</span>
                    )}
                  </div>

                  {/* VS */}
                  <div className="text-red-500 font-bold">VS</div>

                  {/* Team 2 */}
                  <div className="flex items-center space-x-4 flex-1 justify-end">
                    {match.team2.score !== undefined && (
                      <span className="text-2xl font-bold text-white">{match.team2.score}</span>
                    )}
                    <span className="text-white font-medium">{match.team2.name}</span>
                    <img src={match.team2.logo} alt={match.team2.name} className="w-12 h-12 object-contain" />
                  </div>
                </div>
              </div>

              {/* Match Info */}
              <div className="absolute top-0 right-0 transform translate-y-[-50%] px-4 py-2 bg-red-600">
                <div className="text-sm font-medium text-white">{match.tournament}</div>
              </div>

              {/* Time/Status */}
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-white/60">
                {match.status === 'live' && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 font-medium">LIVE</span>
                  </div>
                )}
                <span>{match.time}</span>
                <span>•</span>
                <span>{match.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
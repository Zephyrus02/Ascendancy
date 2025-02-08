import { useState, useEffect } from 'react';
import { Separator } from './Separator';
import { ClipLoader } from 'react-spinners';

interface Team {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

interface Match {
  _id: string;
  status: 'yet to start' | 'ongoing' | 'completed';
  team1: Team;
  team2: Team;
  tournament: string;
  time: string;
  date: string;
  round: number;
}

export function Trending() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/matches`);
      const data = await response.json();
      setMatches(data); // Store original status values
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMatches = matches.filter(match => {
    if (activeTab === 'upcoming') return match.status === 'yet to start';
    return match.status === 'completed';
  });

  return (
    <div className="bg-[#111] py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            TRENDING <span className="text-[#FF4655]">MATCHES</span>
          </h2>
          
          <Separator />

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-12">
            {(['upcoming', 'results'] as const).map((tab) => (
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
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <ClipLoader color="#FF4655" size={40} />
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60">No matches available</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredMatches.map((match) => (
              <div 
                key={match._id}
                className="relative group bg-[#1a1a1a] p-6 transform transition-all duration-300 
                         hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8 flex-1">
                    {/* Team 1 */}
                    <div className="flex items-center space-x-4 flex-1">
                      <img 
                        src={match.team1.logo} 
                        alt={match.team1.name} 
                        className="w-20 h-20 object-contain" // Increased from w-12 h-12
                      />
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
                      <img 
                        src={match.team2.logo} 
                        alt={match.team2.name} 
                        className="w-20 h-20 object-contain" // Increased from w-12 h-12
                      />
                    </div>
                  </div>
                </div>

                {/* Match Info */}
                <div className="absolute top-0 right-0 transform translate-y-[-50%] px-4 py-2 bg-red-600">
                  <div className="text-sm font-medium text-white">
                    Round {match.round}
                  </div>
                </div>

                {/* Time/Status */}
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-white/60">
                  {match.status === 'ongoing' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-500 font-medium">LIVE</span>
                    </div>
                  )}
                  <span>{match.time}</span>
                  <span>•</span>
                  <span>{match.date}</span>
                  {match.status === 'completed' && (
                    <>
                      <span>•</span>
                      <span className="text-green-500">Completed</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
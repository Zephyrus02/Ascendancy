import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BracketRound } from '../components/brackets/BracketRound';
import { getMatches } from '../services/api';
import { ClipLoader } from 'react-spinners';
import { Separator } from '../components/Separator';

interface Match {
  _id: string;
  round: number;
  status: 'yet to start' | 'ongoing' | 'completed';
  team1: {
    id: string;
    name: string;
    logo: string;
    score?: number;
  };
  team2: {
    id: string;
    name: string;
    logo: string;
    score?: number;
  };
  date: string;
  time: string;
}

export function Brackets() {
  const [view, setView] = useState<'schedule' | 'bracket'>('schedule');
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      const data = await getMatches();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Organize matches by round for bracket view
  const getRoundMatches = (roundNumber: number) => {
    return matches
      .filter(match => match.round === roundNumber)
      .map(match => ({
        team1: match.team1.name,
        team2: match.team2.name,
        score1: match.team1.score,
        score2: match.team2.score
      }));
  };

  const round1 = getRoundMatches(1);
  const round2 = getRoundMatches(2);
  const finals = getRoundMatches(3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        <ClipLoader color="#FF4655" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            TOURNAMENT <span className="text-[#FF4655]">BRACKETS</span>
          </h1>
        </div>
      </div>

      {/* View Toggle */}
      <div className="max-w-6xl mx-auto px-4 pt-16">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setView('schedule')}
            className={`relative px-12 py-4 transform skew-x-[-20deg] overflow-hidden 
                transition-all duration-300 ${
                  view === 'schedule' 
                  ? 'bg-[#FF4655] hover:bg-[#ff5e6b] hover:scale-105' 
                  : 'bg-transparent border-2 border-[#FF4655] hover:bg-[#FF4655]/10'
                }`}
          >
            <span className="relative z-20 block text-white font-medium text-lg 
                    tracking-wider transform skew-x-[20deg]">
              MATCH SCHEDULE
            </span>
          </button>

          <button
            onClick={() => setView('bracket')}
            className={`relative px-12 py-4 transform skew-x-[-20deg] overflow-hidden
                transition-all duration-300 ${
                  view === 'bracket'
                  ? 'bg-[#FF4655] hover:bg-[#ff5e6b] hover:scale-105'
                  : 'bg-transparent border-2 border-[#FF4655] hover:bg-[#FF4655]/10'
                }`}
          >
            <span className="relative z-20 block text-white font-medium text-lg
                    tracking-wider transform skew-x-[20deg]">
              BRACKET TREE  
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      {view === 'bracket' ? (
        <div className="max-w-[90rem] mx-auto px-4 py-16 overflow-x-auto">
          <div className="min-w-[800px] flex justify-between gap-8">
            <BracketRound title="ROUND 1" matches={round1} />
            <BracketRound title="ROUND 2" matches={round2} marginTop="mt-20" />
            <BracketRound title="FINALS" matches={finals} marginTop="mt-40" />
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            MATCH <span className="text-[#FF4655]">SCHEDULE</span>
          </h2>
          <Separator />
          
          <div className="grid gap-6">
            {matches.map((match) => (
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
                        className="w-20 h-20 object-contain"
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
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Match Info */}
                <div className="absolute top-0 right-0 transform translate-y-[-50%] px-4 py-2 bg-red-600">
                  <div className="text-sm font-medium text-white">Round {match.round}</div>
                </div>

                {/* Time/Date and Status */}
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-white/60">
                  <span>{match.time}</span>
                  <span>•</span>
                  <span>{match.date}</span>
                  <span>•</span>
                  <span className="capitalize">{match.status.replace(/-/g, ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
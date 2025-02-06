import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BracketRound } from '../components/brackets/BracketRound';
import { useState } from 'react';

interface Match {
  id: string;
  round: number;
  status: string;
  team1: {
    name: string;
    logo: string;
    score?: number;
  };
  team2: {
    name: string;
    logo: string;
    score?: number;
  };
  date: string;
  time: string;
  tournament: string;
}

export function Brackets() {
  const [view, setView] = useState<'schedule' | 'bracket'>('schedule');

  const matches: Match[] = [
    {
      id: '1',
      round: 1,
      status: 'upcoming',
      team1: { 
        name: 'TBD', 
        logo: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-1.png',
        score: 0 
      },
      team2: { 
        name: 'TBD', 
        logo: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-2.png',
        score: 0 
      },
      date: 'TBD',
      time: 'TBD',
      tournament: 'ASCENDANCY TOURNAMENT'
    }
  ];

  const round1 = [
    { team1: 'TBD', team2: 'TBD' },
    { team1: 'TBD', team2: 'TBD' },
    { team1: 'TBD', team2: 'TBD' },
    { team1: 'TBD', team2: 'TBD' }
  ];

  const round2 = [
    { team1: 'TBD', team2: 'TBD' },
    { team1: 'TBD', team2: 'TBD' }
  ];

  const finals = [
    { team1: 'TBD', team2: 'TBD' }
  ];

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
          
          <div className="grid gap-6">
            {matches.map((match) => (
              <div 
                key={match.id}
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

                {/* Time/Date */}
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-white/60">
                  <span>{match.time}</span>
                  <span>•</span>
                  <span>{match.date}</span>
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
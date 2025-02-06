import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Search } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { getMatches } from '../../services/api';
import toast from 'react-hot-toast';

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

export function Schedule() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      const fetchedMatches = await getMatches();
      
      // Sort matches by date and time
      const sortedMatches = fetchedMatches.sort((a: Match, b: Match) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
      
      setMatches(sortedMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      toast.error('Failed to fetch matches', {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #FF4655'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMatches = matches.filter(match => 
    match.team1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.team2.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="#FF4655" size={40} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            MATCH <span className="text-[#FF4655]">SCHEDULE</span>
          </h2>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search matches..."
              className="w-full bg-[#1a1a1a] text-white border border-gray-800 py-3 px-4 pl-12
                       focus:outline-none focus:border-[#FF4655]"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredMatches.map((match) => (
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

              {/* Add after match card content, before the match info div */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {/* TODO: Add create room handler */}}
                  className="relative px-8 py-2 transform skew-x-[-20deg] overflow-hidden
                            bg-[#FF4655] hover:bg-[#ff5e6b] transition-all duration-300"
                >
                  <span className="relative z-20 block text-white font-medium 
                                  transform skew-x-[20deg]">
                    CREATE ROOM
                  </span>
                </button>
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
    </AdminLayout>
  );
}
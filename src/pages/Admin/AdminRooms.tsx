import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Search, Plus } from 'lucide-react';
import { createGameRoom, getPendingMatches, getAllRooms } from '../../services/api';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

interface Match {
  _id: string;  // Change id to _id to match MongoDB's format
  round: number;
  status: 'yet to start' | 'started' | 'completed';
  team1: {
    id: string;
    name: string;
    captain: {
      userId: string;
      username: string;
    };
  };
  team2: {
    id: string;
    name: string;
    captain: {
      userId: string;
      username: string;
    };
  };
  date: string;
  time: string;
}

interface Room {
  roomKey: string;
  matchId: string;
  team1Captain: {
    userId: string;
    teamName: string;
    joined: boolean;
  };
  team2Captain: {
    userId: string;
    teamName: string;
    joined: boolean;
  };
  createdAt: Date;
}

export function AdminRooms() {
  const { user } = useUser();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add state for match selection modal
  const [showMatchSelection, setShowMatchSelection] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [matchSearchQuery, setMatchSearchQuery] = useState('');

  // Add useEffect to fetch matches
  useEffect(() => {
    fetchMatches();
    fetchRooms();
  }, []);

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      const pendingMatches = await getPendingMatches();
      setFilteredMatches(pendingMatches);
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

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const data = await getAllRooms();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to fetch rooms', {
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

  const handleCreateRoom = async (match: Match) => {
    if (!user?.id) {
      toast.error('Please ensure you are logged in');
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const newRoom = await createGameRoom({
        matchId: match._id,
        adminId: user.id,
        team1: {
          id: match.team1.id,
          name: match.team1.name,
          captainId: match.team1.captain.userId
        },
        team2: {
          id: match.team2.id,
          name: match.team2.name,
          captainId: match.team2.captain.userId
        }
      });
  
      setRooms([...rooms, newRoom]);
      setShowMatchSelection(false);
      
      toast.success('Room created successfully!', {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #FF4655'
        }
      });
    } catch (err) {
      console.error('Error creating room:', err);
      toast.error('Failed to create room');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            GAME <span className="text-[#FF4655]">ROOMS</span>
          </h2>
          
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rooms..."
                className="w-full bg-[#1a1a1a] text-white border border-gray-800 py-3 px-4 pl-12
                         focus:outline-none focus:border-[#FF4655]"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
            </div>

            <button
              onClick={() => setShowMatchSelection(true)}
              className="relative px-8 py-3 bg-[#FF4655] transform skew-x-[-20deg]
                       overflow-hidden transition-all duration-300 ml-4
                       hover:bg-[#ff5e6b]"
            >
              <span className="relative z-20 block text-white font-medium
                           transform skew-x-[20deg] flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Room
              </span>
            </button>
          </div>
        </div>

        {/* Match Selection Modal */}
        {showMatchSelection && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-[#1a1a1a] p-8 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Select Match</h3>
                <button 
                  onClick={() => setShowMatchSelection(false)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Match Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={matchSearchQuery}
                  onChange={(e) => setMatchSearchQuery(e.target.value)}
                  placeholder="Search matches..."
                  className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4 pl-12
                           focus:outline-none focus:border-[#FF4655]"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
              </div>

              {/* Matches List */}
              <div className="space-y-4">
                {filteredMatches
                  .filter(match => 
                    match.team1.name.toLowerCase().includes(matchSearchQuery.toLowerCase()) ||
                    match.team2.name.toLowerCase().includes(matchSearchQuery.toLowerCase())
                  )
                  .map((match) => (
                    <button
                      key={match._id}  // Use _id instead of id
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleCreateRoom(match);
                      }}
                      disabled={isLoading}
                      className="w-full p-4 bg-[#111] hover:bg-[#FF4655]/10 transition-colors
                               border-2 border-transparent hover:border-[#FF4655] rounded-lg text-left
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{match.team1.name} vs {match.team2.name}</p>
                          <p className="text-sm text-white/60">
                            Round {match.round} • {match.date} • {match.time}
                          </p>
                        </div>
                        <span className="text-[#FF4655]">Create Room →</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Rooms List */}
        <div className="grid gap-6">
          {rooms.map((room) => (
            <div
              key={room.roomKey}
              className="bg-[#1a1a1a] p-6 rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Room Key: {room.roomKey}</h3>
                <span className="px-3 py-1 bg-[#FF4655] rounded-full text-sm">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-white/70">Team 1: {room.team1Captain.teamName}</p>
                  <p className="text-white/70">
                    Status: {room.team1Captain.joined ? 'Joined' : 'Waiting'}
                  </p>
                </div>

                <div>
                  <p className="text-white/70">Team 2: {room.team2Captain.teamName}</p>
                  <p className="text-white/70">
                    Status: {room.team2Captain.joined ? 'Joined' : 'Waiting'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
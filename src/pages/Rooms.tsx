import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { joinGameRoom, getRoomStatus } from '../services/api';

interface RoomStatus {
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
}

export function Rooms() {
  const { user } = useUser();
  const [roomKey, setRoomKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomStatus, setRoomStatus] = useState<RoomStatus | null>(null);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!user?.id) throw new Error('User not authenticated');
      
      const room = await joinGameRoom(roomKey, user.id);
      setRoomStatus(room);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join room');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (roomStatus && roomKey) {
      const interval = setInterval(async () => {
        try {
          const updatedRoom = await getRoomStatus(roomKey);
          setRoomStatus(updatedRoom);
        } catch (err) {
          console.error('Error fetching room status:', err);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [roomStatus, roomKey]);

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            GAME <span className="text-[#FF4655]">ROOM</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {!roomStatus ? (
          <form onSubmit={handleJoinRoom} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Room Key</label>
              <input
                type="text"
                value={roomKey}
                onChange={(e) => setRoomKey(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-800 px-4 py-3
                         focus:outline-none focus:border-[#FF4655]"
                placeholder="Enter room key"
                required
              />
            </div>

            {error && (
              <p className="text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="relative px-8 py-3 bg-[#FF4655] transform skew-x-[-20deg]
                       overflow-hidden transition-all duration-300
                       hover:bg-[#ff5e6b] disabled:opacity-50"
            >
              <span className="relative z-20 block text-white font-medium
                           transform skew-x-[20deg]">
                {isLoading ? 'Joining...' : 'Join Room'}
              </span>
            </button>
          </form>
        ) : (
          <div className="bg-[#1a1a1a] p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Room Status</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-white/70">Team 1: {roomStatus.team1Captain.teamName}</p>
                <p className="text-white/70">
                  Status: {roomStatus.team1Captain.joined ? 'Joined' : 'Waiting'}
                </p>
              </div>

              <div>
                <p className="text-white/70">Team 2: {roomStatus.team2Captain.teamName}</p>
                <p className="text-white/70">
                  Status: {roomStatus.team2Captain.joined ? 'Joined' : 'Waiting'}
                </p>
              </div>

              <div className="mt-8">
                {roomStatus.team1Captain.joined && roomStatus.team2Captain.joined ? (
                  <p className="text-green-500 font-medium">All players have joined the room!</p>
                ) : (
                  <p className="text-yellow-500 font-medium">Waiting for opponent team's captain...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { joinGameRoom } from '../../services/api';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Separator } from '../../components/Separator';
import { Loader2 } from 'lucide-react';

interface RoomCredentials {
  roomCode: string;
  roomPasskey: string;
}

interface RoomStatus {
  team1: {
    teamName: string;
    joined: boolean;
  };
  team2: {
    teamName: string;
    joined: boolean;
  };
  adminJoined: boolean;  // Add this field
  adminId: string;       // Add this field
}

export function Rooms() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<RoomCredentials>({
    roomCode: '',
    roomPasskey: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [roomStatus, setRoomStatus] = useState<RoomStatus | null>(null);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error('Please log in to join a room');
      return;
    }

    setIsLoading(true);

    try {
      const roomData = await joinGameRoom({
        roomCode: credentials.roomCode,
        roomPasskey: credentials.roomPasskey,
        userId: user.id
      });

      if (roomData.authorized) {
        setRoomStatus(roomData.room);
        const allCaptainsJoined = roomData.room.team1.joined && roomData.room.team2.joined;
        
        if (allCaptainsJoined) {
          toast.success('Room is ready! Both captains have joined.');
          navigate(`/game-room/${roomData.roomCode}`);
        } else {
          toast.success('Successfully joined! Waiting for other captain...');
          // Show waiting message instead of redirecting
        }
      } else {
        toast.error('You are not authorized to join this room');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to join room');
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoomStatusContent = () => {
    const allCaptainsJoined = roomStatus?.team1.joined && roomStatus?.team2.joined;

    return (
      <div className="mt-8 p-6 bg-[#1a1a1a] rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Room Status</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>{roomStatus?.team1.teamName}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              roomStatus?.team1.joined ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
            }`}>
              {roomStatus?.team1.joined ? 'Joined' : 'Waiting'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>{roomStatus?.team2.teamName}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              roomStatus?.team2.joined ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
            }`}>
              {roomStatus?.team2.joined ? 'Joined' : 'Waiting'}
            </span>
          </div>

          <div className="mt-6">
            {allCaptainsJoined ? (
              <button
                onClick={() => navigate(`/game-room/${credentials.roomCode}`)}
                className="w-full px-8 py-3 bg-green-500 transform skew-x-[-20deg]
                         overflow-hidden transition-all duration-300
                         hover:bg-green-600"
              >
                <span className="block transform skew-x-[20deg]">
                  Enter Room
                </span>
              </button>
            ) : (
              <div className="text-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF4655]" />
                <p className="text-gray-400">
                  Waiting for all captains to join...
                </p>
                <p className="text-sm text-gray-500">
                  The room will be ready when both captains have joined
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            GAME <span className="text-[#FF4655]">ROOMS</span>
          </h1>
        </div>
      </div>

      {/* Join Room Form */}
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Form Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Join Game Room</h2>
            <p className="text-gray-400">Enter your room credentials to join the match</p>
          </div>

          <Separator />

          <form onSubmit={handleJoinRoom} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Room Code
              </label>
              <input
                type="text"
                value={credentials.roomCode}
                onChange={(e) => setCredentials({
                  ...credentials,
                  roomCode: e.target.value.toUpperCase()
                })}
                className="w-full bg-[#1a1a1a] border border-gray-800 py-3 px-4
                         focus:outline-none focus:border-[#FF4655]"
                placeholder="Enter room code"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Room Passkey
              </label>
              <input
                type="text"
                value={credentials.roomPasskey}
                onChange={(e) => setCredentials({
                  ...credentials,
                  roomPasskey: e.target.value.toUpperCase()
                })}
                className="w-full bg-[#1a1a1a] border border-gray-800 py-3 px-4
                         focus:outline-none focus:border-[#FF4655]"
                placeholder="Enter room passkey"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-3 bg-[#FF4655] transform skew-x-[-20deg]
                       overflow-hidden transition-all duration-300
                       hover:bg-[#ff5e6b] disabled:opacity-50
                       disabled:cursor-not-allowed"
            >
              <span className="block transform skew-x-[20deg]">
                {isLoading ? 'Joining...' : 'Join Room'}
              </span>
            </button>
          </form>
        </div>
      </div>

      {roomStatus && renderRoomStatusContent()}

      <Footer />
    </div>
  );
}
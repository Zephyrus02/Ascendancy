import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Separator } from '../../components/Separator';
import { Loader2 } from 'lucide-react';
import { getRoomStatus } from '../../services/api';

interface RoomStatus {
  roomCode: string;
  roomPasskey: string;
  adminId: string;
  adminUsername: string;
  adminJoined: boolean;
  team1: {
    teamId: string;
    teamName: string;
    captainId: string;
    captainUsername: string;
    joined: boolean;
  };
  team2: {
    teamId: string;
    teamName: string;
    captainId: string;
    captainUsername: string;
    joined: boolean;
  };
}

export function PickBan() {
  const { roomCode } = useParams();
  const { user } = useUser();
  const [roomStatus, setRoomStatus] = useState<RoomStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoomStatus = async () => {
    if (!roomCode) return;

    try {
      const status = await getRoomStatus(roomCode);
      setRoomStatus(status);
      setError(null);
    } catch (err) {
      console.error('Error fetching room status:', err);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    const initialFetch = async () => {
      setIsLoading(true);
      await fetchRoomStatus();
      setIsLoading(false);
    };
    initialFetch();
  }, [roomCode]);

  // Separate effect for polling that doesn't affect loading state
  useEffect(() => {
    const interval = setInterval(fetchRoomStatus, 5000);
    return () => clearInterval(interval);
  }, [roomCode]);

  const allPlayersJoined = roomStatus?.team1.joined && 
                          roomStatus?.team2.joined && 
                          roomStatus?.adminJoined;

  const getStatusMessage = () => {
    if (allPlayersJoined) {
      return {
        title: "Map Pick/Ban Phase",
        description: "Starting the map selection process..."
      };
    }
    return {
      title: "Map Pick/Ban Phase",
      description: "Waiting for all players to join before starting the map selection"
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF4655]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
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
            ROOM <span className="text-[#FF4655]">{roomCode}</span>
          </h1>
        </div>
      </div>

      {/* Room Status Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{getStatusMessage().title}</h2>
          <p className={`${allPlayersJoined ? 'text-green-400' : 'text-gray-400'}`}>
            {getStatusMessage().description}
          </p>
        </div>

        <Separator />

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Team 1 Status */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg border-2 border-gray-800">
            <h3 className="font-bold mb-4">{roomStatus?.team1.teamName || 'Team 1'}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              roomStatus?.team1.joined ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
            }`}>
              {roomStatus?.team1.joined ? 'Ready' : 'Waiting'}
            </span>
          </div>

          {/* Admin Status */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg border-2 border-gray-800">
            <h3 className="font-bold mb-4">Admin</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              roomStatus?.adminJoined ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
            }`}>
              {roomStatus?.adminJoined ? 'Ready' : 'Waiting'}
            </span>
          </div>

          {/* Team 2 Status */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg border-2 border-gray-800">
            <h3 className="font-bold mb-4">{roomStatus?.team2.teamName || 'Team 2'}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              roomStatus?.team2.joined ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
            }`}>
              {roomStatus?.team2.joined ? 'Ready' : 'Waiting'}
            </span>
          </div>
        </div>

        {/* Waiting Message */}
        {!allPlayersJoined && (
          <div className="text-center mt-12 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF4655]" />
            <p className="text-gray-400">
              Waiting for all players to join...
            </p>
            <p className="text-sm text-gray-500">
              The pick/ban phase will begin once everyone is ready
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
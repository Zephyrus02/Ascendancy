import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Separator } from '../../components/Separator';
import { Loader2 } from 'lucide-react';
import { getRoomStatus } from '../../services/api';
import { MapPool } from '../../components/game/MapPool';
import { valorantMaps } from '../../data/maps';
import { toast } from 'react-hot-toast';

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
  pickBanState: {
    isStarted: boolean;
    currentTurn: string;
    remainingMaps: string[];
    selectedMap?: string;
    mapVetoStarted: boolean; // Add this field
    mapStatuses?: any;
  };
}

export function PickBan() {
  const { roomCode } = useParams();
  const { user } = useUser();
  const [roomStatus, setRoomStatus] = useState<RoomStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [maps, setMaps] = useState(valorantMaps);
  const [showMapPool, setShowMapPool] = useState(false);

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

  // Update room status effect to handle pickBanState changes
  useEffect(() => {
    const fetchAndUpdateStatus = async () => {
      if (!roomCode) return;

      try {
        const status = await getRoomStatus(roomCode);
        setRoomStatus(status);
        
        // Check if map veto has started
        if (status.pickBanState?.mapVetoStarted && !showMapPool) {
          setShowMapPool(true);
          toast.success('Map veto has started!');
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching room status:', err);
      }
    };

    // Initial fetch
    fetchAndUpdateStatus();

    // Poll for updates
    const interval = setInterval(fetchAndUpdateStatus, 3000);
    return () => clearInterval(interval);
  }, [roomCode, showMapPool]); // Add showMapPool to dependencies

  const allPlayersJoined = roomStatus?.team1.joined && 
                          roomStatus?.team2.joined && 
                          roomStatus?.adminJoined;

  const getStatusMessage = () => {
    if (!allPlayersJoined) {
      return {
        title: "Map Pick/Ban Phase",
        description: "Waiting for all players to join before starting the map selection"
      };
    }
    if (!roomStatus?.pickBanState?.isStarted) {
      return {
        title: "Map Pick/Ban Phase",
        description: "Waiting for admin to start the map selection process..."
      };
    }
    return {
      title: "Map Pick/Ban Phase",
      description: "Map selection in progress..."
    };
  };

  const isPickBanInProgress = () => {
    return roomStatus?.pickBanState?.mapVetoStarted && allPlayersJoined;
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

        {/* Map Pool - Only show when pick/ban has started */}
        {isPickBanInProgress() ? (
          <MapPool
            maps={maps}
            disabled={true}
            mapStatuses={roomStatus?.pickBanState?.mapStatuses}
          />
        ) : (
          <div className="text-center mt-12 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF4655]" />
            <p className="text-gray-400">
              {!allPlayersJoined 
                ? "Waiting for all players to join..." 
                : "Waiting for admin to start map veto..."}
            </p>
            <p className="text-sm text-gray-500">
              {!allPlayersJoined
                ? "The pick/ban phase will begin once everyone is ready"
                : "The admin will start the map veto process shortly"}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
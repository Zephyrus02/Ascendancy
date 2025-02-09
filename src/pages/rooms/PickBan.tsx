import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Separator } from '../../components/Separator';
import { Loader2 } from 'lucide-react';
import { getRoomStatus, banMap, selectSide } from '../../services/api';
import { MapPool } from '../../components/game/MapPool';
import { ValorantMap, valorantMaps } from '../../data/maps';
import { toast } from 'react-hot-toast';

interface MapStatus {
  [key: string]: 'available' | 'picked' | 'banned';
}

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
    selectedMap?: ValorantMap;
    mapVetoStarted: boolean;
    mapStatuses: MapStatus;
    firstPickTeam: string;
    selectedSide?: {
      teamId: string;
      side: 'attack' | 'defend';
    };
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
  const [hasShownStartNotification, setHasShownStartNotification] = useState(false);

  useEffect(() => {
    const fetchAndUpdateStatus = async () => {
      try {
        if (!roomCode) return;
        
        const status = await getRoomStatus(roomCode);
        setRoomStatus(status);
        
        // Check if pick/ban has started
        if (status.pickBanState?.isStarted && !showMapPool) {
          setShowMapPool(true);
          setMaps(prevMaps => prevMaps.map(map => ({
            ...map,
            status: status.pickBanState?.mapStatuses?.[map.id] || 'available'
          })));
          
          // Only show toast if we haven't shown it before
          if (!hasShownStartNotification) {
            toast.success('Map veto has started!');
            setHasShownStartNotification(true);
          }
        }
        
        setError(null);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching room status:', err);
        setError('Failed to fetch room status');
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchAndUpdateStatus();
    
    // Poll more frequently (every 2 seconds)
    const interval = setInterval(fetchAndUpdateStatus, 2000);
    return () => clearInterval(interval);
  }, [roomCode, showMapPool, hasShownStartNotification]);

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
    if (roomStatus?.pickBanState?.selectedMap && roomStatus?.pickBanState?.selectedSide) {
      return {
        title: "Match Setup Complete",
        description: "Map has been selected. You may now exit the room."
      };
    }
    return {
      title: "Map Pick/Ban Phase",
      description: "Map selection in progress..."
    };
  };

  const isPickBanInProgress = () => {
    return Boolean(roomStatus?.pickBanState?.isStarted);
  };

  const isUserTurn = () => {
    if (!roomStatus || !user) return false;
    
    const userTeamId = user.id === roomStatus.team1.captainId 
      ? roomStatus.team1.teamId 
      : user.id === roomStatus.team2.captainId 
        ? roomStatus.team2.teamId 
        : null;

    return userTeamId === roomStatus.pickBanState?.currentTurn;
  };

  const getUserTeamId = (): string | undefined => {
    if (!roomStatus || !user) return undefined;
    
    return user.id === roomStatus.team1.captainId 
      ? roomStatus.team1.teamId 
      : user.id === roomStatus.team2.captainId 
        ? roomStatus.team2.teamId 
        : undefined;
  };

  const handleMapSelect = async (mapId: string) => {
    try {
      if (!roomCode || !roomStatus) return;

      const userTeamId = getUserTeamId();
      if (!userTeamId) {
        toast.error('Not authorized to ban maps');
        return;
      }

      // Call the API to ban the map
      await banMap(roomCode, mapId, userTeamId);
      
      // Update will happen automatically through polling
      toast.success('Map banned successfully');
    } catch (error) {
      console.error('Error banning map:', error);
      toast.error('Failed to ban map');
    }
  };

  const handleSideSelect = async (side: 'attack' | 'defend') => {
    try {
      if (!roomCode || !roomStatus) return;

      const userTeamId = getUserTeamId();
      if (!userTeamId) {
        toast.error('Not authorized to select side');
        return;
      }

      await selectSide(roomCode, userTeamId, side);
      toast.success('Side selected successfully');
    } catch (error) {
      console.error('Error selecting side:', error);
      toast.error('Failed to select side');
    }
  };

  const canSelectSide = () => {
    if (!roomStatus || !user) return false;

    const userTeamId = getUserTeamId();
    return userTeamId === roomStatus.pickBanState?.firstPickTeam;
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
        {isLoading ? (
          <div className="text-center mt-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FF4655]" />
          </div>
        ) : isPickBanInProgress() ? (
          <div className="mt-8 animate-fadeIn">
            <h3 className="text-xl font-bold mb-4">Map Veto Phase</h3>
            <MapPool
              maps={maps}
              disabled={!isUserTurn()}
              mapStatuses={roomStatus?.pickBanState?.mapStatuses}
              currentTurn={roomStatus?.pickBanState?.currentTurn}
              userTeamId={getUserTeamId()}
              onMapSelect={handleMapSelect}
            />
          </div>
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

        {roomStatus?.pickBanState?.selectedMap && !roomStatus?.pickBanState?.selectedSide && (
          <div className="mt-8 animate-fadeIn">
            <div className="bg-[#1a1a1a] p-8 rounded-lg border-2 border-[#FF4655]">
              <h3 className="text-2xl font-bold text-center mb-4">
                Side Selection Phase
              </h3>
              {canSelectSide() ? (
                <div className="grid grid-cols-2 gap-8 mt-6">
                  <button
                    onClick={() => handleSideSelect('attack')}
                    className="p-6 border-2 border-[#FF4655] rounded-lg hover:bg-[#FF4655]/10 transition-all"
                  >
                    <h4 className="text-xl font-bold mb-2">ATTACK</h4>
                    <p className="text-gray-400">Start on attacking side</p>
                  </button>
                  <button
                    onClick={() => handleSideSelect('defend')}
                    className="p-6 border-2 border-[#FF4655] rounded-lg hover:bg-[#FF4655]/10 transition-all"
                  >
                    <h4 className="text-xl font-bold mb-2">DEFEND</h4>
                    <p className="text-gray-400">Start on defending side</p>
                  </button>
                </div>
              ) : (
                <p className="text-gray-400 text-center">
                  Waiting for opponent to select side...
                </p>
              )}
            </div>
          </div>
        )}

        {roomStatus?.pickBanState?.selectedMap && roomStatus?.pickBanState?.selectedSide && (
          <div className="mt-8 text-center">
            <div className="bg-green-500/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-500 mb-2">Match Setup Complete!</h3>
              <p className="text-gray-400">
                Map and sides have been selected. You may now exit the room.
              </p>
              <p className="text-gray-400 mt-2">
                Selected Map: {roomStatus.pickBanState.selectedMap.name}
              </p>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Separator } from '../../components/Separator';
import { Loader2 } from 'lucide-react';
import { getRoomStatus } from '../../services/api';
import { MapPool } from '../../components/game/MapPool';
import { valorantMaps } from '../../data/maps';

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

export function AdminPickBan() {
  const { roomCode } = useParams();
  const { user } = useUser();
  const [roomStatus, setRoomStatus] = useState<RoomStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [maps, setMaps] = useState(valorantMaps);
  const [pickBanStarted, setPickBanStarted] = useState(false);

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
        title: "Map VETO",
        description: "Starting the map selection process..."
      };
    }
    return {
      title: "Waiting for Players",
      description: "Wait for all team captains to join before starting the map selection"
    };
  };

  const handleStartPickBan = () => {
    setPickBanStarted(true);
  };

  const handleMapSelect = (mapId: string) => {
    // Add your map selection logic here
    console.log('Selected map:', mapId);
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
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            ROOM <span className="text-[#FF4655]">{roomCode}</span>
          </h2>
          <p className="text-gray-400 mt-2">Admin Control Panel</p>
        </div>

        <Separator />

        {/* Room Status Section */}
        <div className="mt-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">{getStatusMessage().title}</h3>
            <p className={`${allPlayersJoined ? 'text-green-400' : 'text-gray-400'}`}>
              {getStatusMessage().description}
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Team 1 Status */}
            <div className="bg-[#1a1a1a] p-6 rounded-lg border-2 border-gray-800">
              <h3 className="font-bold mb-4">{roomStatus?.team1.teamName || 'Team 1'}</h3>
              <div className="flex flex-col space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  roomStatus?.team1.joined ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {roomStatus?.team1.joined ? 'Ready' : 'Waiting'}
                </span>
                <p className="text-sm text-gray-400">Captain: {roomStatus?.team1.captainUsername}</p>
              </div>
            </div>

            {/* Admin Controls */}
            <div className="bg-[#1a1a1a] p-6 rounded-lg border-2 border-[#FF4655]">
              <h3 className="font-bold mb-4">Admin Controls</h3>
              <div className="space-y-4">
                <button
                  onClick={handleStartPickBan}
                  className="w-full px-4 py-2 bg-[#FF4655] rounded hover:bg-[#ff5e6b] transition-colors disabled:opacity-50"
                  disabled={!allPlayersJoined}
                >
                  Start Pick/Ban
                </button>
                <button
                  className="w-full px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                  Reset Room
                </button>
              </div>
            </div>

            {/* Team 2 Status */}
            <div className="bg-[#1a1a1a] p-6 rounded-lg border-2 border-gray-800">
              <h3 className="font-bold mb-4">{roomStatus?.team2.teamName || 'Team 2'}</h3>
              <div className="flex flex-col space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  roomStatus?.team2.joined ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {roomStatus?.team2.joined ? 'Ready' : 'Waiting'}
                </span>
                <p className="text-sm text-gray-400">Captain: {roomStatus?.team2.captainUsername}</p>
              </div>
            </div>
          </div>

          {/* Map Pool */}
          {pickBanStarted && (
            <MapPool
              maps={maps}
              isAdmin={true}
              onMapSelect={handleMapSelect}
              disabled={!allPlayersJoined}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
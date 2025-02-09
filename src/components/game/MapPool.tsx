import { ValorantMap } from '../../data/maps';
import { Separator } from '../Separator';

interface MapStatus {
  [key: string]: 'available' | 'picked' | 'banned';
}

interface MapPoolProps {
  maps: ValorantMap[];
  isAdmin?: boolean;
  onMapSelect?: (mapId: string) => void;
  disabled?: boolean;
  mapStatuses?: MapStatus;
  currentTurn?: string;
  userTeamId?: string;
  roomStatus?: {
    team1: {
      teamId: string;
      teamName: string;
    };
    team2: {
      teamId: string;
      teamName: string;
    };
    pickBanState?: {
      currentTurn: string;
      selectedMap?: {
        name: string;
      };
    };
  };
}

export function MapPool({ 
  maps, 
  isAdmin, 
  onMapSelect, 
  disabled, 
  mapStatuses,
  currentTurn,
  userTeamId,
  roomStatus
}: MapPoolProps) {
  const isUserTurn = currentTurn === userTeamId;
  const isFinalMapSelected = roomStatus?.pickBanState?.selectedMap !== undefined;
  
  if (isFinalMapSelected) {
    return null;
  }
  
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-center mb-8">
        MAP <span className="text-[#FF4655]">VETO</span>
      </h3>
      <Separator />

      {/* Current Turn and Status */}
      <div className="text-center mb-6">
        {currentTurn && (
          <p className={`text-lg ${isAdmin ? 'text-gray-400' : isUserTurn ? 'text-green-400' : 'text-gray-400'}`}>
            {isAdmin ? (
              `Current Turn: ${roomStatus?.pickBanState?.currentTurn === roomStatus?.team1?.teamId 
                ? roomStatus?.team1?.teamName 
                : roomStatus?.team2?.teamName}`
            ) : (
              isUserTurn ? 'Your turn to ban a map' : 'Waiting for opponent to ban a map'
            )}
          </p>
        )}
        {roomStatus?.pickBanState?.selectedMap && (
          <p className="text-green-400 mt-2">
            Selected map: {roomStatus.pickBanState.selectedMap.name}
          </p>
        )}
      </div>

      <div className="flex h-[600px] gap-1">
        {maps.map((map) => (
          <div
            key={map.id}
            className={`relative flex-1 transition-all duration-500 ease-in-out
                       group hover:flex-[2] overflow-hidden 
                       ${(!isUserTurn || disabled || mapStatuses?.[map.id] !== 'available') 
                         ? 'cursor-not-allowed' 
                         : 'cursor-pointer'}`}
            onClick={() => {
              if (isUserTurn && !disabled && mapStatuses?.[map.id] === 'available') {
                onMapSelect?.(map.id);
              }
            }}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 w-[200%] h-full">
              <img
                src={map.image}
                alt={map.name}
                className="w-full h-full object-cover transform transition-transform duration-[10000ms] ease-linear 
                         group-hover:translate-x-[-50%] group-hover:duration-[10000ms] duration-0"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
            </div>

            {/* Map Status Overlay */}
            {mapStatuses && mapStatuses[map.id] !== 'available' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <span className={`text-lg font-bold ${
                  mapStatuses[map.id] === 'picked' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {mapStatuses[map.id].toUpperCase()}
                </span>
              </div>
            )}

            {/* Map Name */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <div className="transform rotate-180 writing-vertical">
                <h4 className="text-2xl font-bold text-white whitespace-nowrap">
                  {map.name}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
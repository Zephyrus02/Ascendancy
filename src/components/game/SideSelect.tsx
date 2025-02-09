import { Separator } from "../Separator";

interface SideSelectProps {
  isUserTurn: boolean;
  onSideSelect: (side: 'attack' | 'defend') => void;
  disabled?: boolean;
}

export function SideSelect({ isUserTurn, onSideSelect, disabled }: SideSelectProps) {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-center mb-8">
        SIDE <span className="text-[#FF4655]">SELECTION</span>
      </h3>
      <Separator />

      {/* Side Selection Status */}
      <div className="text-center mb-6">
        <p className={`text-lg ${isUserTurn ? 'text-green-400' : 'text-gray-400'}`}>
          {isUserTurn ? 'Your turn to select side' : 'Waiting for opponent to select side'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Attack Option */}
        <button
          onClick={() => onSideSelect('attack')}
          disabled={!isUserTurn || disabled}
          className={`p-8 border-2 rounded-lg transition-all duration-300 
                     ${!isUserTurn || disabled 
                       ? 'border-gray-800 opacity-50 cursor-not-allowed' 
                       : 'border-[#FF4655] hover:bg-[#FF4655]/10'}`}
        >
          <h4 className="text-xl font-bold mb-4">ATTACK</h4>
          <p className="text-gray-400">Start on attacking side</p>
        </button>

        {/* Defend Option */}
        <button
          onClick={() => onSideSelect('defend')}
          disabled={!isUserTurn || disabled}
          className={`p-8 border-2 rounded-lg transition-all duration-300 
                     ${!isUserTurn || disabled 
                       ? 'border-gray-800 opacity-50 cursor-not-allowed' 
                       : 'border-[#FF4655] hover:bg-[#FF4655]/10'}`}
        >
          <h4 className="text-xl font-bold mb-4">DEFEND</h4>
          <p className="text-gray-400">Start on defending side</p>
        </button>
      </div>
    </div>
  );
}
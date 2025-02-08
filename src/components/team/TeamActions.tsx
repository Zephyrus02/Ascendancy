import { Edit2, Shield, ShieldOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface TeamActionsProps {
  teamId: string;
  verified: boolean;
  onUpdate: () => void;
  onEdit: () => void;
}

export function TeamActions({ teamId, verified, onUpdate, onEdit }: TeamActionsProps) {
  const handleVerification = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/teams/${teamId}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verified: !verified })
      });
      
      toast.success(`Team ${verified ? 'unverified' : 'verified'} successfully`);
      onUpdate();
    } catch (error) {
      toast.error('Failed to update team verification status');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        className="p-2 text-white/60 hover:text-[#FF4655] transition-colors"
        title="Edit Team"
      >
        <Edit2 className="w-5 h-5" />
      </button>
      <button
        onClick={handleVerification}
        className={`p-2 transition-colors ${
          verified ? 'text-green-500 hover:text-green-600' : 'text-white/60 hover:text-[#FF4655]'
        }`}
        title={verified ? 'Unverify Team' : 'Verify Team'}
      >
        {verified ? <Shield className="w-5 h-5" /> : <ShieldOff className="w-5 h-5" />}
      </button>
    </div>
  );
}
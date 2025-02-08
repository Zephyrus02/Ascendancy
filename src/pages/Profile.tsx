import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TeamHeader } from '../components/team/TeamHeader';
import { StatCards } from '../components/team/StatCards';
import { TeamMembers } from '../components/team/TeamMembers';
import { X } from 'lucide-react';
import { TeamEditModal } from '../components/team/TeamEditModal';
import { TeamHero } from '../components/team/TeamHero';
import { ClipLoader } from 'react-spinners';
import { createOrder, verifyPayment, deleteTeam } from '../services/api';
import { Edit2, Shield, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Team {
  _id: string;
  teamName: string;
  teamLogo: string;
  members: TeamMember[];
  verified: boolean;
  createdAt: string;
}

interface TeamMember {
  name: string;
  valorantId: string;
  rank: string;
  role: 'Captain' | 'Main' | 'Substitute';
  discordId: string;
}

// Add PaymentModal component
function PaymentModal({ onClose, onSuccess, amount = 250 }: { 
  onClose: () => void;
  onSuccess: () => void;
  amount?: number;
}) {
  const { user } = useUser();

  const handlePayment = async () => {
    try {
      if (!user?.id || !user?.username) return;

      const order = await createOrder(user.id, user.username);
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Ascendancy",
        description: "Team Verification Payment",
        order_id: order.id,
        handler: async function(response: any) {
          await verifyPayment(order.id, response.razorpay_payment_id);
          onSuccess();
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-8 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Team Verification Payment</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#FF4655]">₹{amount}</p>
            <p className="text-white/60 mt-2">Tournament Registration Fee</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handlePayment}
              className="w-full py-3 bg-[#FF4655] hover:bg-[#ff5e6b] transition-colors font-medium"
            >
              Pay with RazorPay
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Profile() {
  const { user } = useUser();
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Move fetchTeam outside useEffect
  const fetchTeam = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/teams/user/${user.id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setTeam(null);
        } else {
          throw new Error('Failed to fetch team data');
        }
        return;
      }
      
      const data = await response.json();
      setTeam(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch team');
    } finally {
      setIsLoading(false);
    }
  };

  // Add handleDeleteTeam function in the Profile component
  const handleDeleteTeam = async () => {
    if (!team) return;
    
    if (!window.confirm('Are you sure you want to delete your team? This action cannot be undone.')) {
      return;
    }
  
    try {
      await deleteTeam(team._id);
      toast.success('Team deleted successfully');
      setTeam(null);
    } catch (error) {
      toast.error('Failed to delete team');
    }
  };

  // Update useEffect to use the new fetchTeam function
  useEffect(() => {
    fetchTeam();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#111] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-white/60">You need to be signed in to view your profile</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      <TeamHero />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        {isLoading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <ClipLoader color="#FF4655" size={40} />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : !team ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-2xl font-bold mb-4">No Team Found</h2>
            <p className="text-white/60 mb-8 text-center max-w-md">
              You haven't created a team yet. Create your team to participate in tournaments.
            </p>
            <a 
              href="/create-team" 
              className="px-8 py-3 bg-[#FF4655] hover:bg-[#ff5e6b] transition-colors rounded"
            >
              Create Your Team
            </a>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <TeamHeader 
                  teamName={team.teamName}
                  teamLogo={team.teamLogo}
                  verified={team.verified}
                />
                {!team.verified && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white/80 
                              hover:text-white transition-colors rounded-lg flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Team
                    </button>
                    <button
                      onClick={handleDeleteTeam}
                      className="px-6 py-2 bg-[#1a1a1a] hover:bg-red-500/20 text-white/80 
                              hover:text-red-500 transition-colors rounded-lg flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Team
                    </button>
                    <button
                      onClick={() => setShowPayment(true)}
                      className="px-6 py-2 bg-[#FF4655] hover:bg-[#ff5e6b] 
                              transition-colors rounded-lg flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Verify Team
                    </button>
                  </div>
                )}
              </div>
              <StatCards 
                members={team.members}
                teamRank={team.members[0]?.rank || 'Unranked'}
              />
              <TeamMembers members={team.members} />
            </div>

            {/* Modals */}
            {isEditing && (
              <TeamEditModal
                team={team}
                onClose={() => setIsEditing(false)}
                onUpdate={() => {
                  fetchTeam(); // Now fetchTeam is accessible here
                  setIsEditing(false);
                }}
              />
            )}

            {showPayment && (
              <PaymentModal
                onClose={() => setShowPayment(false)}
                onSuccess={() => {
                  setShowPayment(false);
                  // Refresh team data to show verified status
                  window.location.reload();
                }}
              />
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
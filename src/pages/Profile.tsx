import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TeamHeader } from '../components/team/TeamHeader';
import { StatCards } from '../components/team/StatCards';
import { TeamMembers } from '../components/team/TeamMembers';
import { Edit2, X } from 'lucide-react';
import { TeamBasicInfo } from '../components/team/TeamBasicInfo';
import { TeamMemberForm } from '../components/team/TeamMemberForm';
import { TeamHero } from '../components/team/TeamHero';
import { ClipLoader } from 'react-spinners';
import { createOrder, verifyPayment, deleteTeam } from '../services/api';

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

interface EditModalProps {
  team: Team;
  onClose: () => void;
  onSave: (updatedTeam: Team) => void;
}

const initialMemberState: TeamMember = {
  name: '',
  valorantId: '',
  rank: '',
  role: 'Substitute',
  discordId: ''
};

function EditModal({ team, onClose, onSave }: EditModalProps) {
  const [editedTeam, setEditedTeam] = useState({
    ...team,
    members: [...team.members, ...Array(7 - team.members.length).fill(initialMemberState)]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const validMembers = editedTeam.members.filter((member, index) => {
        if (index < 5) return true;
        return member.name.trim() !== '';
      });

      const teamPayload = {
        ...editedTeam,
        members: validMembers
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/teams/${team._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update team');
      }

      const updatedTeam = await response.json();
      console.log('Updated team:', updatedTeam); // Debug log
      
      onSave(updatedTeam);
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      alert(error instanceof Error ? error.message : 'Failed to update team');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-8 rounded-lg max-w-4xl w-full mx-4 my-8 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Team</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 overflow-y-auto pr-4 flex-1 custom-scrollbar">
          <TeamBasicInfo 
            teamData={editedTeam}
            setTeamData={setEditedTeam}
          />

          <div className="space-y-6">
            {editedTeam.members.map((member, index) => (
              <TeamMemberForm
                key={index}
                memberIndex={index}
                member={member}
                setTeamData={setEditedTeam}
                isCaptain={index === 0}
                isRequired={index < 5}
              />
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 transition-colors rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#FF4655] hover:bg-[#ff5e6b] transition-colors rounded disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <ClipLoader size={20} color="#ffffff" className="mr-2" />
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
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

  useEffect(() => {
    const fetchTeam = async () => {
      if (!user?.id) return;
      
      try {
        console.log('Fetching team for user:', user.id); // Debug log
        const response = await fetch(`${import.meta.env.VITE_API_URL}/teams/user/${user.id}`);
        
        if (!response.ok) {
          throw new Error("You haven't created a team yet. Create your team to participate in tournaments.");
        }
        
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        console.error('Error:', err); // Debug log
        setError('Failed to fetch team');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedTeam: Team) => {
    setTeam(updatedTeam);
  };

  const handleVerifyTeam = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/teams/${team?._id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to verify team');
      }

      const updatedTeam = await response.json();
      setTeam(updatedTeam);
      setShowPayment(false);
    } catch (error) {
      console.error('Error verifying team:', error);
    }
  };

  const handleDeleteTeam = async () => {
    if (!team?._id) return;
    
    if (window.confirm('Are you sure you want to delete your team? This action cannot be undone.')) {
      try {
        await deleteTeam(team._id);
        setTeam(null);
      } catch (error) {
        alert('Failed to delete team');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111] text-white">
        <Navbar />
        <TeamHero />
        <div className="flex justify-center items-center h-[60vh]">
          <ClipLoader color="#FF4655" size={40} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-[#111] text-white">
        <Navbar />
        <TeamHero />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            No Team Found
          </h2>
          <p className="text-white/60 mb-8 text-center max-w-md">
            Create your team to participate in tournaments and manage your roster.
          </p>
          <a 
            href="/create-team" 
            className="px-8 py-3 bg-[#FF4655] hover:bg-[#ff5e6b] transition-colors"
          >
            Create Team
          </a>
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
        {isLoading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!isLoading && !error && !team && (
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-2xl font-bold mb-4">No Team Found</h2>
            <p className="text-white/60 mb-8 text-center max-w-md">
              You haven't created a team yet. Create your team to participate in tournaments.
            </p>
            <a 
              href="/create-team" 
              className="px-8 py-3 bg-[#FF4655] hover:bg-[#ff5e6b] transition-colors"
            >
              Create Your Team
            </a>
          </div>
        )}
        {!isLoading && !error && team && (
          <>
            <div className="flex justify-between items-start mb-8">
              <TeamHeader 
                teamName={team.teamName}
                teamLogo={team.teamLogo}
                verified={team.verified}
              />
              {!team.verified && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowPayment(true)}
                    className="relative px-8 py-3 bg-[#FF4655] transform skew-x-[-20deg] 
                              overflow-hidden transition-all duration-300 
                              hover:bg-[#ff5e6b] hover:scale-105"
                  >
                    <span className="relative z-20 block text-white font-medium 
                                  tracking-wider transform skew-x-[20deg]">
                      VERIFY TEAM
                    </span>
                  </button>
                  
                  <button
                    onClick={handleEditClick}
                    className="relative px-8 py-3 border-2 border-[#FF4655] transform skew-x-[-20deg]
                              overflow-hidden transition-all duration-300
                              hover:bg-[#FF4655]/10"
                  >
                    <span className="relative z-20 block text-white font-medium 
                                  tracking-wider transform skew-x-[20deg]">
                      EDIT TEAM
                    </span>
                  </button>

                  <button
                    onClick={handleDeleteTeam}
                    className="relative px-8 py-3 border-2 border-red-600 transform skew-x-[-20deg]
                              overflow-hidden transition-all duration-300
                              hover:bg-red-600/10 text-red-600 hover:text-red-500"
                  >
                    <span className="relative z-20 block font-medium 
                                  tracking-wider transform skew-x-[20deg]">
                      DELETE TEAM
                    </span>
                  </button>
                </div>
              )}
            </div>
            <StatCards 
              membersCount={team.members.length} 
              teamRank={team.members[0]?.rank || 'Unranked'} 
            />
            <TeamMembers members={team.members} />

            {isEditing && (
              <EditModal 
                team={team}
                onClose={() => setIsEditing(false)}
                onSave={handleSave}
              />
            )}

            {showPayment && (
              <PaymentModal 
                onClose={() => setShowPayment(false)}
                onSuccess={handleVerifyTeam}
              />
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
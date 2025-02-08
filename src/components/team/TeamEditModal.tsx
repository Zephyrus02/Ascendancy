import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { TeamBasicInfo } from './TeamBasicInfo';
import { TeamMemberForm } from './TeamMemberForm';
import { toast } from 'react-hot-toast';
import { updateTeam } from '../../services/api';

interface TeamMember {
  name: string;
  valorantId: string;
  rank: string;
  role: 'Captain' | 'Main' | 'Substitute';
  discordId: string;
}

interface Team {
  _id: string;
  teamName: string;
  teamLogo: string;
  members: TeamMember[];
  verified: boolean;
  createdAt: string;
}

interface TeamEditModalProps {
  team: Team;
  onClose: () => void;
  onUpdate: (updatedTeam?: Team) => void; // Update this line
}

export function TeamEditModal({ team, onClose, onUpdate }: TeamEditModalProps) {
  const [teamData, setTeamData] = useState(team);
  const [isLoading, setIsLoading] = useState(false);

  const validateTeamData = () => {
    // Validate basic team info
    if (!teamData.teamName || !teamData.teamLogo) {
      toast.error('Team name and logo are required');
      return false;
    }

    // Validate captain and main players (first 5 players)
    const requiredPlayers = teamData.members.slice(0, 5);
    const requiredFieldsValid = requiredPlayers.every(member => 
      member.name && 
      member.valorantId && 
      member.rank && 
      member.discordId
    );

    if (!requiredFieldsValid) {
      toast.error('Please fill in all fields for captain and main players');
      return false;
    }

    // Clean up substitute data
    const substitutes = teamData.members.slice(5);
    substitutes.forEach(sub => {
      if (sub.name || sub.valorantId || sub.rank || sub.discordId) {
        // If any field is filled, require all fields
        if (!sub.name || !sub.valorantId || !sub.rank || !sub.discordId) {
          toast.error('Please fill in all fields for substitute players or leave them empty');
          return false;
        }
      }
    });

    return true;
  };

  useEffect(() => {
    const defaultMember = {
      name: '',
      valorantId: '',
      rank: '',
      discordId: '',
      role: 'Main' as const
    };

    setTeamData(prev => ({
      ...prev,
      members: Array(7).fill(null).map((_, index) => ({
        ...defaultMember,
        ...(prev.members[index] || {}),
        role: index === 0 ? 'Captain' : index < 5 ? 'Main' : 'Substitute'
      }))
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validateTeamData()) {
        setIsLoading(false);
        return;
      }

      // Clean up substitute data (remove empty fields)
      const cleanedMembers = teamData.members.map((member, index) => {
        if (index >= 5) {  // Substitute players
          return member.name ? member : {
            name: '',
            valorantId: '',
            rank: '',
            discordId: '',
            role: 'Substitute' as const
          };
        }
        return member;
      });

      // Update team with cleaned data
      await updateTeam(team._id, {
        ...teamData,
        members: cleanedMembers
      });

      toast.success('Team updated successfully');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update team');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Edit Team</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <TeamBasicInfo teamData={teamData} setTeamData={setTeamData} />
          
          {/* Team Members Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Team Members</h3>
            
            {/* Captain */}
            <div className="bg-[#111]/50 p-4 rounded-lg border-l-4 border-[#FF4655]">
              <TeamMemberForm
                key={0}
                memberIndex={0}
                member={teamData.members[0]}
                setTeamData={setTeamData}
                isCaptain={true}
                isRequired={true}
              />
            </div>

            {/* Main Players */}
            <div className="space-y-4">
              <h4 className="font-bold text-white/60">MAIN PLAYERS</h4>
              {teamData.members.slice(1, 5).map((member, index) => (
                <div key={index + 1} className="bg-[#111]/50 p-4 rounded-lg">
                  <TeamMemberForm
                    memberIndex={index + 1}
                    member={member}
                    setTeamData={setTeamData}
                    isCaptain={false}
                    isRequired={true}
                  />
                </div>
              ))}
            </div>

            {/* Substitutes */}
            <div className="space-y-4">
              <h4 className="font-bold text-white/60">SUBSTITUTES</h4>
              {teamData.members.slice(5, 7).map((member, index) => (
                <div key={index + 5} className="bg-[#111]/50 p-4 rounded-lg">
                  <TeamMemberForm
                    memberIndex={index + 5}
                    member={member}
                    setTeamData={setTeamData}
                    isCaptain={false}
                    isRequired={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 text-white/60 hover:text-white
                       transition-colors rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-[#FF4655] text-white rounded hover:bg-[#FF4655]/90
                       transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
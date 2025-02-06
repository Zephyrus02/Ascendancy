import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { getVerifiedTeams, createMatch } from '../../services/api';
import toast from 'react-hot-toast';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
}

interface Team {
  _id: string;
  teamName: string;
  teamLogo: string;
  members: TeamMember[];
  verified: boolean;
}

interface MatchFormData {
  team1Id: string;
  team2Id: string;
  date: string;
  time: string;
  round: number;
}

export function SetMatches() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam1, setSelectedTeam1] = useState<Team | null>(null);
  const [selectedTeam2, setSelectedTeam2] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<MatchFormData>({
    team1Id: '',
    team2Id: '',
    date: '',
    time: '',
    round: 1
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const fetchedTeams = await getVerifiedTeams();
      setTeams(fetchedTeams);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam1 || !selectedTeam2) {
      setError('Please select both teams');
      return;
    }

    const team1Captain = selectedTeam1.members.find(m => m.role === 'Captain');
    const team2Captain = selectedTeam2.members.find(m => m.role === 'Captain');

    if (!team1Captain || !team2Captain) {
      setError('Captain not found for one or both teams');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createMatch({
        team1: {
          id: selectedTeam1._id,
          name: selectedTeam1.teamName,
          logo: selectedTeam1.teamLogo,  // Add team1 logo
          captain: {
            id: team1Captain._id,
            username: team1Captain.name
          }
        },
        team2: {
          id: selectedTeam2._id,
          name: selectedTeam2.teamName,
          logo: selectedTeam2.teamLogo,  // Add team2 logo
          captain: {
            id: team2Captain._id,
            username: team2Captain.name
          }
        },
        date: formData.date,
        time: formData.time,
        round: formData.round,
        status: 'yet to start'
      });

      // Reset form
      setSelectedTeam1(null);
      setSelectedTeam2(null);
      setFormData({
        team1Id: '',
        team2Id: '',
        date: '',
        time: '',
        round: 1
      });
      
      // Show success toast
      toast.success('Match created successfully!', {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #FF4655'
        },
        iconTheme: {
          primary: '#FF4655',
          secondary: '#fff'
        }
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create match');
      // Show error toast
      toast.error('Failed to create match', {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #FF4655'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            SET <span className="text-[#FF4655]">MATCHES</span>
          </h2>
        </div>

        {/* Match Creation Form */}
        <div className="bg-[#1a1a1a] p-8 rounded-lg w-full mb-8">
          <h3 className="text-2xl font-bold mb-6">Create New Match</h3>
          
          <form onSubmit={handleCreateMatch} className="space-y-6">
            {/* Team Selection */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-white/60 mb-2">Team 1</label>
                <select
                  value={formData.team1Id}
                  onChange={(e) => {
                    setFormData({...formData, team1Id: e.target.value});
                    setSelectedTeam1(teams.find(t => t._id === e.target.value) || null);
                  }}
                  className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4
                           focus:outline-none focus:border-[#FF4655]"
                  required
                >
                  <option value="">Select Team 1</option>
                  {teams.map(team => (
                    <option key={team._id} value={team._id}>{team.teamName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/60 mb-2">Team 2</label>
                <select
                  value={formData.team2Id}
                  onChange={(e) => {
                    setFormData({...formData, team2Id: e.target.value});
                    setSelectedTeam2(teams.find(t => t._id === e.target.value) || null);
                  }}
                  className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4
                           focus:outline-none focus:border-[#FF4655]"
                  required
                >
                  <option value="">Select Team 2</option>
                  {teams.map(team => (
                    <option key={team._id} value={team._id}>{team.teamName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-white/60 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4
                           focus:outline-none focus:border-[#FF4655]"
                  required
                />
              </div>

              <div>
                <label className="block text-white/60 mb-2">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4
                           focus:outline-none focus:border-[#FF4655]"
                  required
                />
              </div>
            </div>

            {/* Round */}
            <div>
              <label className="block text-white/60 mb-2">Round</label>
              <input
                type="number"
                min="1"
                value={formData.round}
                onChange={(e) => setFormData({...formData, round: parseInt(e.target.value)})}
                className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4
                         focus:outline-none focus:border-[#FF4655]"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#FF4655] transform skew-x-[-20deg]
                         overflow-hidden transition-all duration-300
                         hover:bg-[#ff5e6b] disabled:opacity-50"
              >
                <span className="relative z-20 block text-white font-medium
                             transform skew-x-[20deg]">
                  {isSubmitting ? 'Creating...' : 'Create Match'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
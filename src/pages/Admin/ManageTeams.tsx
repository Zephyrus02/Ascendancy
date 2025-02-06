import { useState, useEffect } from 'react';
import { TeamHeader } from '../../components/team/TeamHeader';
import { StatCards } from '../../components/team/StatCards';
import { TeamMembers } from '../../components/team/TeamMembers';
import { ClipLoader } from 'react-spinners';
import { Search } from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';

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

export function ManageTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/teams`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(team => 
    team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="#FF4655" size={40} />
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            MANAGE <span className="text-[#FF4655]">TEAMS</span>
          </h2>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teams..."
              className="w-full bg-[#1a1a1a] text-white border border-gray-800 py-3 px-4 pl-12
                       focus:outline-none focus:border-[#FF4655]"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Teams List */}
          <div className="lg:col-span-1 space-y-4 h-[calc(100vh-12rem)] overflow-y-auto pr-4">
            {filteredTeams.map((team) => (
              <button
                key={team._id}
                onClick={() => setSelectedTeam(team)}
                className={`w-full p-4 text-left bg-[#1a1a1a] rounded-lg transition-all duration-300
                         hover:shadow-[0_0_20px_rgba(255,70,85,0.15)] border-2
                         ${selectedTeam?._id === team._id ? 
                           'border-[#FF4655]' : 
                           'border-transparent hover:border-[#FF4655]/50'}`}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={team.teamLogo} 
                    alt={team.teamName} 
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="font-bold">{team.teamName}</h3>
                    <p className="text-sm text-white/60">
                      {team.members.length} Members • {team.verified ? 'Verified' : 'Unverified'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Team Details */}
          <div className="lg:col-span-2">
            {selectedTeam ? (
              <div className="space-y-8">
                <TeamHeader 
                  teamName={selectedTeam.teamName}
                  teamLogo={selectedTeam.teamLogo}
                  verified={selectedTeam.verified}
                />
                <StatCards 
                  membersCount={selectedTeam.members.length}
                  teamRank={selectedTeam.members[0]?.rank || 'Unranked'}
                />
                <TeamMembers members={selectedTeam.members} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-white/60">
                Select a team to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
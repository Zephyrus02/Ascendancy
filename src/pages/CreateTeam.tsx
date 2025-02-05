import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TeamBasicInfo } from '../components/team/TeamBasicInfo';
import { TeamMemberForm } from '../components/team/TeamMemberForm';
import { Separator } from '../components/Separator';
import { createTeam } from '../services/api';
import { useUser } from '@clerk/clerk-react'; // Add this import
import { ClipLoader } from 'react-spinners'; // Install this package: npm install react-spinners

interface TeamMember {
  name: string;
  valorantId: string;
  rank: string;
  role: 'Captain' | 'Main' | 'Substitute';
  discordId: string;
}

interface TeamData {
  teamName: string;
  teamLogo: string | null;
  members: TeamMember[];
}

const initialMemberState: TeamMember = {
  name: '',
  valorantId: '',
  rank: '',
  role: 'Main',
  discordId: ''
};

export function CreateTeam() {
  const { user } = useUser();
  const [teamData, setTeamData] = useState<TeamData>({
    teamName: '',
    teamLogo: null,
    members: Array(7).fill({ ...initialMemberState })
  });
  const [hasTeam, setHasTeam] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user already has a team
  useEffect(() => {
    const checkExistingTeam = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/teams/user/${user.id}`);
        if (response.ok) {
          setHasTeam(true);
        }
      } catch (err) {
        console.error('Error checking existing team:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingTeam();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111] text-white">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <ClipLoader color="#FF4655" size={40} />
        </div>
        <Footer />
      </div>
    );
  }

  if (hasTeam) {
    return (
      <div className="min-h-screen bg-[#111] text-white">
        <Navbar />
        
        {/* Hero Section */}  
        <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80)' }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              CREATE YOUR <span className="text-[#FF4655]">TEAM</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            You Already Have a Team
          </h2>
          <p className="text-white/60 mb-8 text-center max-w-md">
            You can only create one team. To make changes to your existing team, please visit your profile.
          </p>
          <a 
            href="/profile" 
            className="px-8 py-3 bg-[#FF4655] hover:bg-[#ff5e6b] transition-colors"
          >
            Go to Profile
          </a>
        </div>

        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('You must be logged in to create a team');
      }

      // Validate team name
      if (!teamData.teamName.trim()) {
        throw new Error('Team name is required');
      }

      // Validate captain
      const captain = teamData.members[0];
      if (!captain.name || !captain.valorantId || !captain.rank || !captain.discordId) {
        throw new Error('Captain information is incomplete');
      }

      // Validate main players
      const mainPlayers = teamData.members.slice(1, 5);
      const invalidMainPlayers = mainPlayers.some(player => 
        !player.name || !player.valorantId || !player.rank || !player.discordId
      );

      if (invalidMainPlayers) {
        throw new Error('All main players information is required');
      }

      // Handle substitutes
      const substitutes = teamData.members.slice(5)
        .filter(member => member.name.trim() !== '')
        .map(sub => {
          if (!sub.valorantId || !sub.rank || !sub.discordId) {
            throw new Error('Please complete all fields for substitute players or remove them');
          }
          return { ...sub, role: 'Substitute' };
        });

      const teamPayload = {
        teamName: teamData.teamName,
        teamLogo: teamData.teamLogo,
        members: [
          { ...captain, role: 'Captain' },
          ...mainPlayers.map(player => ({ ...player, role: 'Main' })),
          ...substitutes
        ],
        userId: user.id,
        username: user.username // Add username
      };

      console.log('Sending team payload:', teamPayload);

      const response = await createTeam(teamPayload);
      console.log('Server response:', response);

      if (response.message === 'Team created successfully') {
        setTeamData({
          teamName: '',
          teamLogo: null,
          members: Array(7).fill({ ...initialMemberState })
        });
        alert('Team created successfully!');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error instanceof Error ? error.message : 'Failed to create team');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            CREATE YOUR <span className="text-[#FF4655]">TEAM</span>
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Team Basic Info */}
          <TeamBasicInfo 
            teamData={teamData} 
            setTeamData={setTeamData} 
          />

          {/* Team Members */}
          <div>
            <h2 className="text-3xl font-bold mb-12 text-center">
              TEAM <span className="text-[#FF4655]">MEMBERS</span>
            </h2>
            <Separator />
            
            <div className="space-y-8">
              {teamData.members.map((member, index) => (
                <TeamMemberForm
                  key={index}
                  memberIndex={index}
                  member={member}
                  setTeamData={setTeamData}
                  isCaptain={index === 0}
                  isRequired={index < 5}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="relative px-12 py-4 bg-[#FF4655] transform skew-x-[-20deg] overflow-hidden
                       transition-all duration-300 hover:bg-[#ff5e6b] disabled:opacity-50 min-w-[200px]"
            >
              <span className="relative z-10 block text-white font-medium text-lg tracking-wider transform skew-x-[20deg] flex items-center justify-center">
                {isLoading ? (
                  <>
                    <ClipLoader size={20} color="#ffffff" className="mr-2" />
                    CREATING...
                  </>
                ) : (
                  'CREATE TEAM'
                )}
              </span>
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center mt-4">
              {error}
            </div>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}
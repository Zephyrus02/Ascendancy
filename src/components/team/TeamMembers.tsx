import { Shield, ShieldAlert } from 'lucide-react';

interface TeamMember {
  name: string;
  valorantId: string;
  rank: string;
  role: 'Captain' | 'Main' | 'Substitute';
  discordId: string;
}

interface TeamMembersProps {
  members: TeamMember[];
}

export function TeamMembers({ members }: TeamMembersProps) {
  // Filter out empty substitute entries
  const validMembers = members.filter(member => 
    member.role !== 'Substitute' || 
    (member.name && member.valorantId && member.rank && member.discordId)
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Team Members</h3>
      
      <div className="grid gap-4">
        {validMembers.map((member, index) => (
          <div 
            key={index}
            className="bg-[#1a1a1a] p-4 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#FF4655] text-white w-12 h-12 rounded-lg 
                            flex items-center justify-center font-bold">
                {member.role === 'Captain' ? 'C' : member.role === 'Main' ? 'M' : 'S'}
              </div>
              <div>
                <h4 className="font-bold">{member.name}</h4>
                <p className="text-sm text-white/60">
                  {member.valorantId} • {member.rank}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <span>{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
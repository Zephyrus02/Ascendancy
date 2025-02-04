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
  return (
    <div className="bg-[#1a1a1a] p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Team Members</h2>
      <div className="grid gap-4">
        {members.map((member, index) => (
          <div key={index} className="bg-[#111] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-white/60">{member.valorantId}</p>
              </div>
              <div className="text-right">
                <p className="text-[#FF4655] font-medium">{member.role}</p>
                <p className="text-white/60">{member.rank}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
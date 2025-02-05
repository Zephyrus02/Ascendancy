interface Props {
  memberIndex: number;
  member: any;
  setTeamData: (data: any) => void;
  isCaptain: boolean;
  isRequired: boolean;  // Add this line
}

export function TeamMemberForm({ memberIndex, member, setTeamData, isCaptain, isRequired }: Props) {
  const updateMember = (field: string, value: string) => {
    setTeamData((prev: any) => ({
      ...prev,
      members: prev.members.map((m: any, i: number) =>
        i === memberIndex ? { ...m, [field]: value } : m
      )
    }));
  };

  const ranks = [
    'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum',
    'Diamond', 'Ascendant', 'Immortal', 'Radiant'
  ];

  return (
    <div className="bg-[#1a1a1a] p-8">
      <h3 className="text-xl font-bold mb-6">
        {isCaptain ? 'TEAM CAPTAIN' : memberIndex < 5 ? 'MAIN PLAYER' : 'SUBSTITUTE PLAYER'} #{memberIndex + 1}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Name */}
        <div>
          <label className="block text-white/60 mb-2">NAME</label>
          <input
            type="text"
            value={member.name}
            onChange={(e) => updateMember('name', e.target.value)}
            className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4 focus:outline-none focus:border-[#FF4655]"
            placeholder="Enter player name"
          />
        </div>

        {/* Valorant ID */}
        <div>
          <label className="block text-white/60 mb-2">VALORANT ID</label>
          <input
            type="text"
            value={member.valorantId}
            onChange={(e) => updateMember('valorantId', e.target.value)}
            className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4 focus:outline-none focus:border-[#FF4655]"
            placeholder="Enter Valorant ID"
          />
        </div>

        {/* Rank */}
        <div>
          <label className="block text-white/60 mb-2">RANK</label>
          <select
            value={member.rank}
            onChange={(e) => updateMember('rank', e.target.value)}
            className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4 focus:outline-none focus:border-[#FF4655]"
          >
            <option value="">Select Rank</option>
            {ranks.map((rank) => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
        </div>

        {/* Discord ID */}
        <div>
          <label className="block text-white/60 mb-2">DISCORD ID</label>
          <input
            type="text"
            value={member.discordId}
            onChange={(e) => updateMember('discordId', e.target.value)}
            className="w-full bg-[#111] text-white border border-gray-800 py-3 px-4 focus:outline-none focus:border-[#FF4655]"
            placeholder="Enter Discord ID"
          />
        </div>
      </div>
    </div>
  );
}
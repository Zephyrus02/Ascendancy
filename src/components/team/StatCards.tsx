import { Trophy, Users, Shield, Target } from 'lucide-react';

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-[#FF4655]/10 rounded-lg">
          <Icon className="w-6 h-6 text-[#FF4655]" />
        </div>
        <div>
          <p className="text-white/60">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

interface TeamMember {
  name: string;
  valorantId: string;
  rank: string;
  role: 'Captain' | 'Main' | 'Substitute';
  discordId: string;
}

interface StatCardsProps {
  members: TeamMember[];
  teamRank: string;
}

export function StatCards({ members, teamRank }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard icon={Trophy} label="Matches" value="0" />
      <StatCard icon={Users} label="Members" value={members.length.toString()} />
      <StatCard icon={Shield} label="Team Rank" value={teamRank || 'Unranked'} />
      <StatCard icon={Target} label="Avg Score" value="N/A" />
    </div>
  );
}
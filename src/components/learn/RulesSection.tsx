import { Shield, Trophy, Users, Clock } from 'lucide-react';

export function RulesSection() {
  const rules = [
    {
      icon: <Shield className="w-8 h-8 text-[#FF4655]" />,
      title: "ELIGIBILITY",
      description: "Teams can be of any rank. All players must be at least 16 years old."
    },
    {
      icon: <Users className="w-8 h-8 text-[#FF4655]" />,
      title: "TEAM COMPOSITION",
      description: "5 main players and 2 substitute players allowed per team."
    },
    {
      icon: <Trophy className="w-8 h-8 text-[#FF4655]" />,
      title: "PRIZE POOL",
      description: "$10,000 total prize pool. First place: $5,000, Second: $3,000, Third: $2,000"
    },
    {
      icon: <Clock className="w-8 h-8 text-[#FF4655]" />,
      title: "MATCH FORMAT",
      description: "Best of 3 matches in preliminaries. Best of 5 in finals."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {rules.map((rule, index) => (
        <div 
          key={index}
          className="bg-[#1a1a1a] p-8 transform transition-all duration-300 hover:scale-105
                   hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-[#111] rounded-sm">{rule.icon}</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{rule.title}</h3>
              <p className="text-white/70">{rule.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
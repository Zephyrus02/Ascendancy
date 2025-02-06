interface Props {
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
}

export function BracketMatch({ team1, team2, score1 = 0, score2 = 0 }: Props) {
  return (
    <div className="bg-[#1a1a1a] p-4 w-64 transition-transform hover:scale-105">
      <div className="border-l-4 border-[#FF4655] pl-4">
        <p className="font-medium">{team1}</p>
        <p className="text-white/60">{score1}</p>
      </div>
      <div className="h-px bg-white/10 my-2" />
      <div className="border-l-4 border-[#FF4655] pl-4">
        <p className="font-medium">{team2}</p>
        <p className="text-white/60">{score2}</p>
      </div>
    </div>
  );
}
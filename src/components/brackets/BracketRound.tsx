import { BracketMatch } from './BracketMatch';

interface Props {
  title: string;
  matches: Array<{team1: string; team2: string}>;
  marginTop?: string;
}

export function BracketRound({ title, matches, marginTop }: Props) {
  return (
    <div className={`space-y-8 ${marginTop}`}>
      <h3 className="text-xl font-bold text-center mb-8">{title}</h3>
      {matches.map((match, i) => (
        <BracketMatch 
          key={i}
          team1={match.team1}
          team2={match.team2}
        />
      ))}
    </div>
  );
}
interface TeamHeaderProps {
  teamName: string;
  teamLogo: string;
  verified: boolean;
}

export function TeamHeader({ teamName, teamLogo, verified }: TeamHeaderProps) {
  return (
    <div className="bg-[#1a1a1a] p-8 rounded-lg mb-8">
      <div className="flex items-center space-x-8">
        <img 
          src={teamLogo || '/default-team-logo.png'} 
          alt={teamName}
          className="w-24 h-24 object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{teamName}</h1>
          <div className={`inline-block px-3 py-1 rounded-full text-sm
            ${verified ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
            {verified ? 'Verified' : 'Pending Verification'}
          </div>
        </div>
      </div>
    </div>
  );
}
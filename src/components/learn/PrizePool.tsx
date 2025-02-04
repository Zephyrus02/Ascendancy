export function PrizePool() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-[#1a1a1a] p-8">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4655]/5 rounded-full 
                    transform translate-x-1/2 -translate-y-1/2" />
      
      <h3 className="text-3xl font-bold mb-8 relative z-10">PRIZE POOL DISTRIBUTION</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div className="text-center">
          <div className="text-[#FF4655] text-4xl font-bold mb-2">$5,000</div>
          <div className="text-xl font-medium mb-1">1ST PLACE</div>
          <div className="text-white/60">Champion Title + Trophy</div>
        </div>
        
        <div className="text-center">
          <div className="text-[#FF4655] text-4xl font-bold mb-2">$3,000</div>
          <div className="text-xl font-medium mb-1">2ND PLACE</div>
          <div className="text-white/60">Runner-up Medal</div>
        </div>
        
        <div className="text-center">
          <div className="text-[#FF4655] text-4xl font-bold mb-2">$2,000</div>
          <div className="text-xl font-medium mb-1">3RD PLACE</div>
          <div className="text-white/60">Bronze Medal</div>
        </div>
      </div>
    </div>
  );
}
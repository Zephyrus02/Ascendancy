import { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { Separator } from '../Separator';

interface Props {
  teamData: any;
  setTeamData: (data: any) => void;
}

const logoOptions = [
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-1.png', alt: 'Logo 1' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-2.png', alt: 'Logo 2' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-3.png', alt: 'Logo 3' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-4.png', alt: 'Logo 4' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-5.png', alt: 'Logo 5' },
  { src: 'https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2021/09/h1-client-img-6.png', alt: 'Logo 6' }
];

export function TeamBasicInfo({ teamData, setTeamData }: Props) {
  const [showLogoModal, setShowLogoModal] = useState(false);

  const handleLogoSelect = (logoSrc: string) => {
    setTeamData({ ...teamData, teamLogo: logoSrc });
    setShowLogoModal(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-12 text-center">
        BASIC <span className="text-[#FF4655]">INFORMATION</span>
      </h2>
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Team Name */}
        <div>
          <label className="block text-white/60 mb-2">TEAM NAME</label>
          <input
            type="text"
            value={teamData.teamName}
            onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
            className="w-full bg-[#1a1a1a] text-white border border-gray-800 py-3 px-4
                     focus:outline-none focus:border-[#FF4655] focus:ring-1 focus:ring-[#FF4655]
                     transition-colors"
            placeholder="Enter team name"
            required
          />
        </div>

        {/* Team Logo Selection */}
        <div>
          <label className="block text-white/60 mb-2">TEAM LOGO</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLogoModal(true)}
              className="flex items-center justify-center w-full h-32 bg-[#1a1a1a] border-2 border-dashed
                       border-gray-800 hover:border-[#FF4655] transition-colors cursor-pointer"
            >
              {teamData.teamLogo ? (
                <img 
                  src={teamData.teamLogo} 
                  alt="Selected Logo" 
                  className="h-24 w-auto object-contain"
                />
              ) : (
                <div className="text-center">
                  <UploadCloud className="w-8 h-8 text-white/40 mx-auto mb-2" />
                  <span className="text-white/60">Click to select logo</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Logo Selection Modal */}
      {showLogoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-8 rounded-lg max-w-3xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Select Team Logo</h3>
              <button 
                onClick={() => setShowLogoModal(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {logoOptions.map((logo, index) => (
                <button
                  key={index}
                  onClick={() => handleLogoSelect(logo.src)}
                  className="p-4 bg-[#111] hover:bg-[#FF4655]/10 border-2 border-gray-800 
                           hover:border-[#FF4655] transition-all duration-300 rounded-lg
                           transform hover:scale-105"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-20 w-auto mx-auto object-contain
                             filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
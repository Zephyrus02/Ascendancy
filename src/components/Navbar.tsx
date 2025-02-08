import { useState, useEffect } from 'react';
import { Youtube, Instagram, Menu, X } from 'lucide-react';
import { FaDiscord } from "react-icons/fa6";
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk, useUser } from '@clerk/clerk-react';

export function Navbar() {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Auto-hide notification after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isSignedIn) {
      e.preventDefault();
      openSignIn();
    }
  };

  return (
    <>
      {/* Notification Bar */}
      {showNotification && (
        <div 
          className="bg-gradient-to-r from-[#FF4655] via-[#111] to-[#FF4655] 
                     bg-[length:200%_100%] animate-gradient overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-2">
            <p className="text-center text-white text-sm font-medium">
              ⚠️ Cold start may take 50 seconds or more to load. For the best experience, please use desktop. 
              <button 
                onClick={() => setShowNotification(false)}
                className="ml-4 text-white/80 hover:text-white"
              >
                ✕
              </button>
            </p>
          </div>
        </div>
      )}

      <nav className="relative bg-[#111]/90 border-b border-gray-800">
        {/* Top Row - Hidden on mobile */}
        <div className="border-b border-gray-800 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-12">
              {/* Social Links */}
              <div className="flex items-center space-x-4 lg:space-x-6">
                <span className='text-white/60 font-medium mr-2'>Socials: </span>
                <a href="">
                <Youtube className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
                </a>
                <a href="https://www.instagram.com/_.ascendancy._?igsh=N2Y0NWVocHY3cXFu" target="_blank">
                <Instagram className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
                </a>
                <a href="https://discord.gg/D3bA9bAaHV" target="_blank">
                <FaDiscord className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
                </a>
              </div>

              {/* Catchphrase */}
              <div className="text-sm text-white/60 font-medium tracking-wide animate-pulse">
                <span className='text-white/60 font-medium mr-2'>RISE THROUGH THE RANKS | BECOME THE BEST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Website Title */}
            <div className="text-lg lg:text-xl font-bold text-white">
              <a href="/">
                ASCENDANCY
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between flex-1 pl-16">
              {/* Left Navigation */}
              <div className="flex items-center space-x-8 xl:space-x-12">
                <a href="/" className="text-white font-medium hover:text-red-500 transition-colors">Home</a>
                <a href="/learn-more" className="text-white/80 font-medium hover:text-white transition-colors">Learn More</a>
                <a href="/brackets" className="text-white/80 font-medium hover:text-white transition-colors">Brackets</a>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center">
                <div className="flex items-center space-x-8 xl:space-x-12 mr-8 xl:mr-16">
                  <a 
                    href="/profile" 
                    onClick={handleAuthClick}
                    className="text-white/80 font-medium hover:text-white transition-colors"
                  >
                    Profile
                  </a>
                  <a 
                    href="/create-team" 
                    onClick={handleAuthClick}
                    className="text-white/80 font-medium hover:text-white transition-colors"
                  >
                    Create Team
                  </a>
                  <a href="/rooms" className="text-white/80 font-medium hover:text-white transition-colors">Rooms</a>
                </div>

                {/* Maximize Icon */}
                <div className="border-l border-gray-800 pl-8">
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </div>
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 bg-grey-dark flex items-center justify-center">
                <a href="/">
                  <img src="https://i.postimg.cc/Pf93Hmmx/icon.png" alt="logo" className="object-contain" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="py-4 space-y-4 border-t border-gray-800">
              <a href="/" className="block text-white font-medium hover:text-red-500 transition-colors">Home</a>
              <a href="/brackets" className="block text-white/80 font-medium hover:text-white transition-colors">Brackets</a>
              <a 
                href="/create-team" 
                onClick={handleAuthClick}
                className="block text-white/80 font-medium hover:text-white transition-colors"
              >
                Create Team
              </a>
              <a href="/learn-more" className="block text-white/80 font-medium hover:text-white transition-colors">Learn More</a>
              <a 
                href="/profile"
                onClick={handleAuthClick} 
                className="block text-white/80 font-medium hover:text-white transition-colors"
              >
                Profile
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
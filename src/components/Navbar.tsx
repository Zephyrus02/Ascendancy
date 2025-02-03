import { useState } from 'react';
import { Facebook, Twitter, Youtube, Instagram, Twitch, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative bg-[#111]/90 border-b border-gray-800">
      {/* Top Row - Hidden on mobile */}
      <div className="border-b border-gray-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Social Links */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Facebook className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Twitch className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
            </div>

            {/* Catchphrase */}
            <div className="text-sm text-white/60">
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Website Title */}
          <div className="text-lg lg:text-xl font-bold text-white">
            ASCENDANCY
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
              <a href="#" className="text-white font-medium hover:text-red-500 transition-colors">Home</a>
              <a href="#" className="text-white/80 font-medium hover:text-white transition-colors">Brackets</a>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center">
              <div className="flex items-center space-x-8 xl:space-x-12 mr-8 xl:mr-16">
                <a href="#" className="text-white/80 font-medium hover:text-white transition-colors">Create Team</a>
                <a href="#" className="text-white/80 font-medium hover:text-white transition-colors">Learn More</a>
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

          {/* Center Logo with Extended Background - Hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-36 bg-[#1a1a1a] -z-10"></div>
              <div className="w-24 h-24 bg-grey-dark flex items-center justify-center">
                <img src="src/assets/icon.png" alt="logo" className="w-20 h-20 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="py-4 space-y-4 border-t border-gray-800">
            <a href="#" className="block text-white font-medium hover:text-red-500 transition-colors">Home</a>
            <a href="#" className="block text-white/80 font-medium hover:text-white transition-colors">Brackets</a>
            <a href="#" className="block text-white/80 font-medium hover:text-white transition-colors">Create Team</a>
            <a href="#" className="block text-white/80 font-medium hover:text-white transition-colors">Learn More</a>
            <a href="#" className="block text-white/80 font-medium hover:text-white transition-colors">SignUp</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
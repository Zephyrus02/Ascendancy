import { Youtube, Instagram, ArrowUp } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa6';
import { useClerk, useUser } from '@clerk/clerk-react';

export function Footer() {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const scrollToTop = () => {
    document.getElementById('root')?.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  const handleAuthClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isSignedIn) {
      e.preventDefault();
      openSignIn();
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-white py-8 relative">
      {/* Navigation */}
      <nav className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-8 md:mb-12">
        <a href="/" className="text-center hover:text-gray-300 transition-colors">HOME</a>
        <a href="/learn-more" className="text-center hover:text-gray-300 transition-colors">LEARN MORE</a>
        <a href="/brackets" className="text-center hover:text-gray-300 transition-colors">BRACKETS</a>
        <a href="/contact" className="text-center hover:text-gray-300 transition-colors">CONTACT</a>
        <a 
          href="/profile"
          onClick={handleAuthClick} 
          className="text-center hover:text-gray-300 transition-colors"
        >
          PROFILE
        </a>
        <a 
          href="/create-team"
          onClick={handleAuthClick}
          className="text-center hover:text-gray-300 transition-colors"
        >
          CREATE TEAM
        </a>
        <a href="/room" className="text-center hover:text-gray-300 transition-colors">ROOMS</a>
        <a href="/admin" className="text-center hover:text-gray-300 transition-colors">ADMIN SPACE</a>
      </nav>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mb-8">
        <a href="" className="hover:text-gray-300 transition-colors">
          <Youtube className="w-5 h-5" />
        </a>
        <a href="https://www.instagram.com/_.ascendancy._" target="_blank" className="hover:text-gray-300 transition-colors">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="https://discord.gg/D3bA9bAaHV" target="_blank" className="hover:text-gray-300 transition-colors">
          <FaDiscord className="w-5 h-5" />
        </a>
      </div>

      {/* Legal Links */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            © 2025 Ascendancy. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm text-white/60 text-center md:text-left">
            <a href="/tnc" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="/refund" className="hover:text-white transition-colors">Cancellation & Refund Policy</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute right-4 md:right-8 bottom-4 md:bottom-8 p-2 bg-[#FF4655] rounded-full 
                  hover:bg-[#ff5e6b] transition-colors"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
}
import { Youtube, Instagram, ArrowUp } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa6';
import { useClerk, useUser } from '@clerk/clerk-react';

export function Footer() {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <nav className="flex justify-center gap-8 mb-12">
        <a href="/" className="hover:text-gray-300 transition-colors">HOME</a>
        <a href="/learn-more" className="hover:text-gray-300 transition-colors">LEARN MORE</a>
        <a href="/brackets" className="hover:text-gray-300 transition-colors">BRACKETS</a>
        <a 
          href="/profile" 
          onClick={handleAuthClick}
          className="hover:text-gray-300 transition-colors"
        >
          PROFILE
        </a>
        <a 
          href="/create-team" 
          onClick={handleAuthClick}
          className="hover:text-gray-300 transition-colors"
        >
          CREATE TEAM
        </a>
        <a href="/rooms" className="hover:text-gray-300 transition-colors">ROOMS</a>
        <a href="/admin" className="hover:text-gray-300 transition-colors">ADMIN SPACE</a>
      </nav>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mb-8">
        <a href="#" className="hover:text-gray-300 transition-colors">
          <Youtube size={20} />
        </a>
        <a href="https://www.instagram.com/_.ascendancy._?igsh=N2Y0NWVocHY3cXFu" className="hover:text-gray-300 transition-colors">
          <Instagram size={20} />
        </a>
        <a href="https://discord.gg/D3bA9bAaHV" className="hover:text-gray-300 transition-colors">
          <FaDiscord size={20} />
        </a>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute right-0 top-0 bg-[#ff3333] p-4 hover:bg-[#cc2929] transition-colors"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
}
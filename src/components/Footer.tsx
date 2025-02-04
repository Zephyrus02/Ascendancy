import { Facebook, Twitter, Youtube, Instagram, Twitch, ArrowUp } from 'lucide-react';

export function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-white py-8 relative">
      {/* Navigation */}
      <nav className="flex justify-center gap-8 mb-12">
        <a href="/" className="hover:text-gray-300 transition-colors">HOME</a>
        <a href="/learn-more" className="hover:text-gray-300 transition-colors">LEARN MORE</a>
        <a href="/brackets" className="hover:text-gray-300 transition-colors">BRACKETS</a>
        <a href="/profile" className="hover:text-gray-300 transition-colors">PROFILE</a>
        <a href="/create-team" className="hover:text-gray-300 transition-colors">CREATE TEAM</a>
        <a href="/room" className="hover:text-gray-300 transition-colors">ROOMS</a>
        <a href="/admin" className="hover:text-gray-300 transition-colors">ADMIN SPACE</a>
      </nav>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mb-8">
        <a href="#" className="hover:text-gray-300 transition-colors">
          <Facebook size={20} />
        </a>
        <a href="#" className="hover:text-gray-300 transition-colors">
          <Twitter size={20} />
        </a>
        <a href="#" className="hover:text-gray-300 transition-colors">
          <Youtube size={20} />
        </a>
        <a href="#" className="hover:text-gray-300 transition-colors">
          <Instagram size={20} />
        </a>
        <a href="#" className="hover:text-gray-300 transition-colors">
          <Twitch size={20} />
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
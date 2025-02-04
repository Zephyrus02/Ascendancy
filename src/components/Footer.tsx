import React, { useState } from 'react';
import { Facebook, Twitter, Youtube, Instagram, Twitch, ArrowUp } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-white py-8 relative">
      {/* Navigation */}
      <nav className="flex justify-center gap-8 mb-12">
        <a href="/" className="hover:text-gray-300 transition-colors">HOME</a>
        <a href="/learn-more" className="hover:text-gray-300 transition-colors">LEARN MORE</a>
        <a href="#" className="hover:text-gray-300 transition-colors">BRACKETS</a>
        <a href="#" className="hover:text-gray-300 transition-colors">CREATE TEAM</a>
        <a href="#" className="hover:text-gray-300 transition-colors">ROOMS</a>
        <a href="#" className="hover:text-gray-300 transition-colors">ADMIN SPACE</a>
      </nav>

      {/* Newsletter */}
      <div className="flex justify-center mb-8">
        <form onSubmit={handleSubmit} className="w-full max-w-xl px-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Subscribe to our Newsletter"
              className="w-full bg-transparent border-b border-gray-600 py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <span className="sr-only">Subscribe</span>
              ✉
            </button>
          </div>
        </form>
      </div>

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
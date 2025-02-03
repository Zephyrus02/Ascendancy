import { Navbar } from '../components/Navbar'
import { HeroCarousel } from '../components/HeroCarousel';
import { IconsBar } from '../components/IconsBar';
import { IntroSection } from '../components/IntroSection';
import { Announcements } from '../components/Announcements';
import { Stream } from '../components/Stream';
import { Trending } from '../components/Trending';
import { Contact } from '../components/Contact';

export function Landing() {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      <HeroCarousel />
      <IconsBar />
      <IntroSection />
      <Announcements />
      <Stream />
      <Trending />
      <Contact />
    </div>
  );
}

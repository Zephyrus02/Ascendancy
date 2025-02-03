import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { IconsBar } from './components/IconsBar';
import { IntroSection } from './components/IntroSection';
import { Announcements } from './components/Announcements';


function App() {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      <HeroCarousel />
      <IconsBar />
      <IntroSection />
      <Announcements />
    </div>
  );
}

export default App;
import { useState } from 'react';
import { Youtube, Twitch } from 'lucide-react';
import { Separator } from './Separator';

type Platform = 'youtube' | 'twitch';

interface StreamData {
  platform: Platform;
  thumbnail: string;
  title: string;
  channelName: string;
}

const streams: Record<Platform, StreamData> = {
  youtube: {
    platform: 'youtube',
    thumbnail: 'https://i.ytimg.com/vi/IhhjcB2ZjIM/maxresdefault.jpg',
    title: 'Pro League Season 5',
    channelName: 'Gaming Pro League'
  },
  twitch: {
    platform: 'twitch',
    thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_valorantesports-440x248.jpg',
    title: 'VCT Game Changers',
    channelName: 'VALORANT Esports'
  }
};

export function Stream() {
  const [activePlatform, setActivePlatform] = useState<Platform>('youtube');
  const currentStream = streams[activePlatform];

  return (
    <div className="bg-[#111] py-24">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            WATCH <span className="text-[#FF4655]">LIVE</span> STREAMS
          </h2>
          
          <Separator />

          {/* Platform Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setActivePlatform('youtube')}
              className={`relative px-8 py-3 transform skew-x-[-20deg] overflow-hidden transition-all duration-300
                ${activePlatform === 'youtube' ? 'bg-red-600' : 'bg-[#1a1a1a]'}`}
            >
              <span className="relative z-10 flex items-center space-x-2 text-white font-medium transform skew-x-[20deg]">
                <Youtube className="w-5 h-5" />
                <span>YouTube</span>
              </span>
              <div 
                className={`absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 via-gray-100 to-red-500 
                ${activePlatform === 'youtube' ? 'opacity-0' : 'opacity-0 hover:opacity-100'} 
                -translate-x-full hover:translate-x-0 transition-all duration-500`}
              />
            </button>
            
            <button
              onClick={() => setActivePlatform('twitch')}
              className={`relative px-8 py-3 transform skew-x-[-20deg] overflow-hidden transition-all duration-300
                ${activePlatform === 'twitch' ? 'bg-red-600' : 'bg-[#1a1a1a]'}`}
            >
              <span className="relative z-10 flex items-center space-x-2 text-white font-medium transform skew-x-[20deg]">
                <Twitch className="w-5 h-5" />
                <span>Twitch</span>
              </span>
              <div 
                className={`absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 via-gray-100 to-red-500 
                ${activePlatform === 'twitch' ? 'opacity-0' : 'opacity-0 hover:opacity-100'} 
                -translate-x-full hover:translate-x-0 transition-all duration-500`}
              />
            </button>
          </div>
        </div>

        {/* Featured Stream */}
        <div className="group relative overflow-hidden rounded-lg cursor-pointer max-w-4xl mx-auto">
          {/* Thumbnail */}
          <div className="aspect-video overflow-hidden">
            <img 
              src={currentStream.thumbnail} 
              alt={currentStream.title}
              className="w-full h-full object-cover transform transition-transform duration-500
                       group-hover:scale-110"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent
                        opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 w-full p-8">
              {/* Live Badge */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-2 bg-red-500/20 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-red-500">LIVE</span>
                </div>
              </div>

              {/* Stream Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentStream.title}
              </h3>

              {/* Channel Name */}
              <p className="text-lg text-white/80">
                {currentStream.channelName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { joinGameRoom } from '../../services/api';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Separator } from '../../components/Separator';

export function Rooms() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    roomCode: '',
    roomPasskey: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error('Please log in to join a room');
      return;
    }

    setIsLoading(true);

    try {
      const roomData = await joinGameRoom({
        roomCode: credentials.roomCode,
        roomPasskey: credentials.roomPasskey,
        userId: user.id
      });

      if (roomData.authorized) {
        toast.success('Successfully joined the room!');
        navigate(`/rooms/${credentials.roomCode}`); // Make sure this matches your route path
      } else {
        toast.error('You are not authorized to join this room');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to join room');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            GAME <span className="text-[#FF4655]">ROOMS</span>
          </h1>
        </div>
      </div>

      {/* Join Room Form */}
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Form Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Join Game Room</h2>
            <p className="text-gray-400">Enter your room credentials to join the match</p>
          </div>

          <Separator />

          <form onSubmit={handleJoinRoom} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Room Code
              </label>
              <input
                type="text"
                value={credentials.roomCode}
                onChange={(e) => setCredentials({
                  ...credentials,
                  roomCode: e.target.value.toUpperCase()
                })}
                className="w-full bg-[#1a1a1a] border border-gray-800 py-3 px-4
                         focus:outline-none focus:border-[#FF4655]"
                placeholder="Enter room code"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Room Passkey
              </label>
              <input
                type="text"
                value={credentials.roomPasskey}
                onChange={(e) => setCredentials({
                  ...credentials,
                  roomPasskey: e.target.value.toUpperCase()
                })}
                className="w-full bg-[#1a1a1a] border border-gray-800 py-3 px-4
                         focus:outline-none focus:border-[#FF4655]"
                placeholder="Enter room passkey"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-3 bg-[#FF4655] transform skew-x-[-20deg]
                       overflow-hidden transition-all duration-300
                       hover:bg-[#ff5e6b] disabled:opacity-50
                       disabled:cursor-not-allowed"
            >
              <span className="block transform skew-x-[20deg]">
                {isLoading ? 'Joining...' : 'Join Room'}
              </span>
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
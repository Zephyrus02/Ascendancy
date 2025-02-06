import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { checkAdminStatus } from '../../services/api';
import { Trending } from '../../components/Trending';
import {
  LayoutDashboard,
  Users,
  Calendar,
  GamepadIcon,
  Swords
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';

type MenuItem = {
  key: string;
  icon: JSX.Element;
  label: string;
}

export function Admin() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const isUserAdmin = await checkAdminStatus(user?.id as string);
        if (!isUserAdmin) {
          navigate('/');
          return;
        }
        setIsAdmin(true);
      } catch (error) {
        console.error('Error:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      verifyAdmin();
    }
  }, [user, navigate]);

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
    },
    {
      key: 'teams',
      icon: <Users className="w-5 h-5" />, 
      label: 'Manage Teams',
    },
    {
      key: 'schedule',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Match Schedule', 
    },
    {
      key: 'rooms',
      icon: <GamepadIcon className="w-5 h-5" />,
      label: 'Rooms',
    },
    {
      key: 'matches',
      icon: <Swords className="w-5 h-5" />,
      label: 'Set Matches',
    }
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="relative h-[30vh] bg-cover bg-center flex items-center justify-center mb-8"
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-4">
              ADMIN <span className="text-[#FF4655]">DASHBOARD</span>
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1a1a1a] p-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]">
            <h3 className="text-xl font-bold mb-2">Total Teams</h3>
            <p className="text-4xl font-bold text-[#FF4655]">16</p>
            <p className="text-white/60 mt-2">Participating Teams</p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]">
            <h3 className="text-xl font-bold mb-2">Active Teams</h3>
            <p className="text-4xl font-bold text-[#FF4655]">12</p>
            <p className="text-white/60 mt-2">Still in Tournament</p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]">
            <h3 className="text-xl font-bold mb-2">Eliminated</h3>
            <p className="text-4xl font-bold text-[#FF4655]">4</p>
            <p className="text-white/60 mt-2">Teams Eliminated</p>
          </div>
        </div>

        {/* Tournament Matches */}
        <div className="bg-[#1a1a1a] p-8 rounded-lg mb-8">
          <Trending />
        </div>
      </div>
    </AdminLayout>
  );
}